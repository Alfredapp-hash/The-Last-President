#!/usr/bin/env python3
"""Comprehensive production-readiness audit across all major categories."""

from __future__ import annotations

import csv
import re
import subprocess
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path("/workspace")
OUT_DIR = ROOT / "production" / "production-readiness-audit"


@dataclass
class CategoryResult:
    slug: str
    title: str
    status: str  # PASS | CONDITIONAL | FAIL
    summary: str
    findings: list[str]
    blockers: list[str]
    evidence: list[str]


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def exists(path: Path) -> bool:
    return path.exists()


def run_cmd(command: list[str], cwd: Path = ROOT) -> tuple[int, str, str]:
    proc = subprocess.run(command, cwd=str(cwd), text=True, capture_output=True)
    return proc.returncode, proc.stdout, proc.stderr


def parse_markdown_checkboxes(text: str) -> tuple[int, int]:
    total = len(re.findall(r"- \[[ x]\]", text))
    checked = len(re.findall(r"- \[x\]", text))
    return checked, total


def category_editorial() -> CategoryResult:
    summary_path = ROOT / "production/publication-prep/audit/SUMMARY.md"
    findings: list[str] = []
    blockers: list[str] = []
    evidence = [f"Summary: {summary_path}"]

    if not summary_path.exists():
        return CategoryResult(
            "01-editorial",
            "Editorial & Manuscript Integrity Agent",
            "FAIL",
            "Publication audit summary missing.",
            findings,
            [f"Missing {summary_path}"],
            evidence,
        )

    text = read(summary_path)
    rows = re.findall(
        r"^\| ([^|]+) \| (\d+) \| (\d+) \| (\d+) \| (\d+) \| ([A-Z ]+) \|",
        text,
        re.M,
    )
    overall_pass = "Overall: **PASS**" in text
    if not rows:
        blockers.append("No book rows parsed from publication summary table.")
    for title, words, heading_gaps, subtitle_gaps, token_flags, status in rows:
        findings.append(
            f"{title.strip()}: {words} words; heading gaps={heading_gaps}; subtitle gaps={subtitle_gaps}; token flags={token_flags}; status={status.strip()}"
        )
        if status.strip() != "PASS":
            blockers.append(f"{title.strip()} audit status is {status.strip()}")
    if not overall_pass:
        blockers.append("Overall publication audit marker is not PASS.")

    status = "PASS" if not blockers else "FAIL"
    summary = (
        "All manuscript QA checks are passing."
        if status == "PASS"
        else "Manuscript QA has blocking issues."
    )
    return CategoryResult("01-editorial", "Editorial & Manuscript Integrity Agent", status, summary, findings, blockers, evidence)


def category_formatting() -> CategoryResult:
    signoff_path = ROOT / "production/publication-prep/final-formatting/FINAL_FORMATTING_SIGNOFF.md"
    findings: list[str] = []
    blockers: list[str] = []
    evidence = [f"Signoff: {signoff_path}"]

    if not signoff_path.exists():
        blockers.append("Final formatting signoff file missing.")
        return CategoryResult(
            "02-formatting",
            "Formatting & Package Assembly Agent",
            "FAIL",
            "Formatting signoff artifact missing.",
            findings,
            blockers,
            evidence,
        )

    text = read(signoff_path)
    decision = re.search(r"Decision:\s+\*\*([A-Z-]+)\*\*", text)
    quality = re.search(r"Quality status:\s+\*\*([A-Z ]+)\*\*", text)
    decision_value = decision.group(1) if decision else "UNKNOWN"
    quality_value = quality.group(1).strip() if quality else "UNKNOWN"
    findings.append(f"Decision: {decision_value}")
    findings.append(f"Quality status: {quality_value}")
    if decision_value != "GO":
        blockers.append(f"Formatting decision is {decision_value}, expected GO.")
    if quality_value != "PASS":
        blockers.append(f"Formatting quality status is {quality_value}, expected PASS.")

    # Front/back template completeness
    required = [
        ROOT / "production/publication-prep/front-matter/book-one-front-matter-template.md",
        ROOT / "production/publication-prep/front-matter/book-two-front-matter-template.md",
        ROOT / "production/publication-prep/front-matter/book-three-front-matter-template.md",
        ROOT / "production/publication-prep/back-matter/book-one-back-matter-template.md",
        ROOT / "production/publication-prep/back-matter/book-two-back-matter-template.md",
        ROOT / "production/publication-prep/back-matter/book-three-back-matter-template.md",
    ]
    present = [p for p in required if p.exists()]
    findings.append(f"Front/back templates present: {len(present)}/{len(required)}")
    for p in required:
        if not p.exists():
            blockers.append(f"Missing formatting template: {p}")

    status = "PASS" if not blockers else "FAIL"
    summary = "Formatting signoff is GO and package templates are complete." if status == "PASS" else "Formatting package has blockers."
    return CategoryResult("02-formatting", "Formatting & Package Assembly Agent", status, summary, findings, blockers, evidence)


def category_metadata() -> CategoryResult:
    csv_path = ROOT / "production/publication-prep/metadata/retailer-metadata.csv"
    findings: list[str] = []
    blockers: list[str] = []
    evidence = [f"Metadata CSV: {csv_path}"]

    if not csv_path.exists():
        return CategoryResult(
            "03-metadata",
            "Metadata & Catalog Integrity Agent",
            "FAIL",
            "Metadata CSV missing.",
            findings,
            [f"Missing {csv_path}"],
            evidence,
        )

    required_cols = [
        "book_slug",
        "series_name",
        "series_number",
        "title",
        "subtitle",
        "author",
        "language",
        "word_count",
        "isbn_ebook",
        "isbn_paperback",
        "isbn_hardcover",
        "publication_date",
        "publisher",
    ]

    with csv_path.open("r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        rows = list(reader)
        header = reader.fieldnames or []
    missing_cols = [c for c in required_cols if c not in header]
    for c in missing_cols:
        blockers.append(f"Missing required metadata column: {c}")

    if len(rows) != 3:
        blockers.append(f"Expected 3 metadata rows, found {len(rows)}")
    findings.append(f"Rows found: {len(rows)}")

    isbn_re = re.compile(r"^\d{13}$")
    date_re = re.compile(r"^\d{4}-\d{2}-\d{2}$")
    for idx, row in enumerate(rows, start=2):
        for c in required_cols:
            if not (row.get(c) or "").strip():
                blockers.append(f"Row {idx} empty value for {c}")
        for c in ["isbn_ebook", "isbn_paperback", "isbn_hardcover"]:
            v = (row.get(c) or "").strip()
            if not isbn_re.match(v):
                blockers.append(f"Row {idx} invalid {c}: {v}")
        date_val = (row.get("publication_date") or "").strip()
        if not date_re.match(date_val):
            blockers.append(f"Row {idx} invalid publication_date: {date_val}")
        if "TBD" in ",".join((row.get(k) or "") for k in row.keys()):
            blockers.append(f"Row {idx} still contains TBD placeholder.")
        findings.append(f"{row.get('book_slug','row')} metadata row checked.")

    status = "PASS" if not blockers else "FAIL"
    summary = "Catalog metadata is complete and normalized." if status == "PASS" else "Metadata contains blocking defects."
    return CategoryResult("03-metadata", "Metadata & Catalog Integrity Agent", status, summary, findings, blockers, evidence)


def category_ebook() -> CategoryResult:
    findings: list[str] = []
    blockers: list[str] = []
    evidence: list[str] = []
    books = [
        ("book-1", "baren-sump-book-1-the-last-president_v1.epub"),
        ("book-2", "baren-sump-book-2-children-of-tomorrow_v1.epub"),
        ("book-3", "baren-sump-book-3-the-black-path_v1.epub"),
    ]
    for slug, name in books:
        epub = ROOT / "production/publication-prep/exports/epub" / name
        report = ROOT / "production/publication-prep/exports/epub" / f"{slug}-epubcheck.txt"
        evidence.append(str(epub))
        evidence.append(str(report))
        if not epub.exists():
            blockers.append(f"Missing EPUB: {epub}")
            continue
        if not report.exists():
            blockers.append(f"Missing EPUBCheck report: {report}")
            continue
        txt = read(report)
        ok = "No errors or warnings detected." in txt
        findings.append(f"{slug}: EPUB exists ({epub.stat().st_size} bytes), epubcheck={'PASS' if ok else 'FAIL'}")
        if not ok:
            blockers.append(f"EPUBCheck did not pass for {slug}")

    status = "PASS" if not blockers else "FAIL"
    summary = "All EPUB artifacts pass EPUBCheck." if status == "PASS" else "EPUB compliance blockers exist."
    return CategoryResult("04-ebook", "EPUB Compliance Agent", status, summary, findings, blockers, evidence)


def category_print() -> CategoryResult:
    findings: list[str] = []
    blockers: list[str] = []
    evidence: list[str] = []
    books = [
        ("book-1", "baren-sump-book-1-interior-print_v1.pdf"),
        ("book-2", "baren-sump-book-2-interior-print_v1.pdf"),
        ("book-3", "baren-sump-book-3-interior-print_v1.pdf"),
    ]
    for slug, name in books:
        pdf = ROOT / "production/publication-prep/exports/pdf" / name
        report = ROOT / "production/publication-prep/exports/pdf" / f"{slug}-pdfinfo.txt"
        evidence.extend([str(pdf), str(report)])
        if not pdf.exists():
            blockers.append(f"Missing print interior PDF: {pdf}")
            continue
        if not report.exists():
            blockers.append(f"Missing pdfinfo report: {report}")
            continue
        txt = read(report)
        pages_match = re.search(r"^Pages:\s+(\d+)$", txt, re.M)
        if not pages_match:
            blockers.append(f"Could not parse page count from {report}")
        else:
            findings.append(f"{slug}: interior PDF pages={pages_match.group(1)}")

    cover_specs = ROOT / "production/publication-prep/exports/covers/COVER_WRAP_SPECS.md"
    evidence.append(str(cover_specs))
    if not cover_specs.exists():
        blockers.append(f"Missing cover wrap specs: {cover_specs}")
    else:
        specs_text = read(cover_specs)
        findings.append("Cover wrap specs file present.")
        profile_match = re.search(r"^- Spine profile:\s+([^\n]+)$", specs_text, re.M)
        formula_match = re.search(r"^- Spine formula:\s+([^\n]+)$", specs_text, re.M)
        if profile_match:
            findings.append(f"Spine profile declared: {profile_match.group(1)}")
        else:
            blockers.append("Cover wrap specs missing explicit spine profile declaration.")
        if formula_match:
            findings.append(f"Spine formula declared: {formula_match.group(1)}")
        else:
            blockers.append("Cover wrap specs missing explicit spine formula declaration.")

    wrap_files = [
        ROOT / "production/publication-prep/exports/covers/the-last-president-cover-wrap_v1.pdf",
        ROOT / "production/publication-prep/exports/covers/children-of-tomorrow-cover-wrap_v1.pdf",
        ROOT / "production/publication-prep/exports/covers/the-black-path-cover-wrap_v1.pdf",
    ]
    for f in wrap_files:
        evidence.append(str(f))
        if not f.exists():
            blockers.append(f"Missing cover wrap PDF: {f}")

    if blockers:
        status = "FAIL"
        summary = "Print package has blocking defects."
    else:
        status = "PASS"
        summary = "Print package artifacts are complete with explicit spine profile documentation."
    return CategoryResult("05-print", "Print Production Agent", status, summary, findings, blockers, evidence)


def category_web() -> CategoryResult:
    findings: list[str] = []
    blockers: list[str] = []
    conditions: list[str] = []
    evidence: list[str] = []

    build_code, build_out, build_err = run_cmd(["npm", "run", "build"])
    findings.append(f"next build exit code: {build_code}")
    if build_code != 0:
        blockers.append("next build failed")
    else:
        findings.append("Next.js production build succeeded.")

    lint_code, lint_out, lint_err = run_cmd(["npm", "run", "lint"])
    findings.append(f"eslint exit code: {lint_code}")
    if lint_code != 0:
        lint_blob = lint_out + lint_err
        dot_next_hits = len(re.findall(r"/\.next/|/site/\.next/", lint_blob))
        if dot_next_hits > 0:
            conditions.append(
                f"Lint failing (exit {lint_code}) with {dot_next_hits} references to generated .next artifacts; lint scope should ignore build output directories."
            )
        else:
            conditions.append(
                f"Lint failing (exit {lint_code}); rule set/scope requires cleanup before enforcing lint as a release gate."
            )
    else:
        findings.append("ESLint passed.")

    evidence.append("Command: npm run build")
    evidence.append("Command: npm run lint")

    if blockers:
        status = "FAIL"
        summary = "Web deploy readiness has blockers."
    elif conditions:
        status = "CONDITIONAL"
        summary = "Web deploy build is healthy, but lint scope/config needs cleanup."
        findings.extend(conditions)
    else:
        status = "PASS"
        summary = "Web deploy build and lint are healthy."
    return CategoryResult("06-web", "Web Deployment Readiness Agent", status, summary, findings, blockers, evidence)


def category_marketing() -> CategoryResult:
    findings: list[str] = []
    blockers: list[str] = []
    evidence: list[str] = []

    required = [
        ROOT / "production/marketing/press-kit.md",
        ROOT / "production/marketing/email-templates.md",
        ROOT / "production/marketing/social-copy.md",
        ROOT / "src/app/press/page.tsx",
    ]
    for p in required:
        evidence.append(str(p))
        if not p.exists():
            blockers.append(f"Missing marketing artifact: {p}")
            continue
        text = read(p)
        if len(text.strip()) < 80:
            blockers.append(f"Artifact appears too small/empty: {p}")
        else:
            findings.append(f"{p.name}: present ({len(text)} chars)")

    status = "PASS" if not blockers else "FAIL"
    summary = "Marketing collateral and press surface are present." if status == "PASS" else "Marketing collateral has gaps."
    return CategoryResult("07-marketing", "Marketing & Launch Collateral Agent", status, summary, findings, blockers, evidence)


def category_ops_governance() -> CategoryResult:
    findings: list[str] = []
    blockers: list[str] = []
    conditions: list[str] = []
    evidence: list[str] = []

    # Script compile gate
    key_scripts = [
        "scripts/publication_prep_audit.py",
        "scripts/final_formatting_supervisor.py",
        "scripts/run_publication_exports.py",
        "scripts/generate_cover_wraps.py",
        "scripts/run_comprehensive_production_audit.py",
    ]
    compile_cmd = ["python3", "-m", "py_compile"] + key_scripts
    code, out, err = run_cmd(compile_cmd)
    findings.append(f"Python compile gate exit code: {code}")
    if code != 0:
        blockers.append("Python compile gate failed for core automation scripts.")
    evidence.append(f"Command: {' '.join(compile_cmd)}")

    checklist_path = ROOT / "production/publication-prep/checklists/distribution-submission-checklist.md"
    evidence.append(str(checklist_path))
    if checklist_path.exists():
        text = read(checklist_path)
        checked, total = parse_markdown_checkboxes(text)
        findings.append(f"Distribution checklist completion: {checked}/{total} items checked")
        if checked < total:
            conditions.append("Operational platform steps remain (submission + store QA + launch confirmation).")
    else:
        blockers.append("Distribution submission checklist missing.")

    if blockers:
        status = "FAIL"
        summary = "Governance/ops controls have blocking gaps."
    elif conditions:
        status = "CONDITIONAL"
        summary = "Automation is healthy; operational tasks remain outside repository."
        findings.extend(conditions)
    else:
        status = "PASS"
        summary = "Automation and governance controls are fully complete."
    return CategoryResult("08-ops", "Automation, Governance & Release Ops Agent", status, summary, findings, blockers, evidence)


def write_category(result: CategoryResult) -> Path:
    path = OUT_DIR / f"{result.slug}.md"
    lines = [
        f"# {result.title}",
        "",
        f"Status: **{result.status}**",
        "",
        f"Summary: {result.summary}",
        "",
        "## Findings",
    ]
    if result.findings:
        lines.extend([f"- {f}" for f in result.findings])
    else:
        lines.append("- None")
    lines.extend(["", "## Blockers"])
    if result.blockers:
        lines.extend([f"- {b}" for b in result.blockers])
    else:
        lines.append("- None")
    lines.extend(["", "## Evidence"])
    lines.extend([f"- {e}" for e in result.evidence])
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return path


def write_master(results: list[CategoryResult]) -> Path:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    path = OUT_DIR / "00-master-scorecard.md"
    fail = sum(1 for r in results if r.status == "FAIL")
    cond = sum(1 for r in results if r.status == "CONDITIONAL")
    if fail:
        overall = "NO-GO"
    elif cond:
        overall = "GO WITH CONDITIONS"
    else:
        overall = "GO"

    lines = [
        "# Comprehensive Production Readiness Scorecard",
        "",
        f"Generated: {now}",
        "",
        f"Overall decision: **{overall}**",
        "",
        "| Category | Status | Summary |",
        "|----------|--------|---------|",
    ]
    for r in results:
        lines.append(f"| {r.title} | {r.status} | {r.summary} |")

    lines.extend(
        [
            "",
            "## Totals",
            f"- PASS: {sum(1 for r in results if r.status == 'PASS')}",
            f"- CONDITIONAL: {cond}",
            f"- FAIL: {fail}",
            "",
            "## Blocking issues (must fix for full GO)",
        ]
    )
    blockers = [(r.title, b) for r in results for b in r.blockers]
    if blockers:
        for title, blocker in blockers:
            lines.append(f"- **{title}:** {blocker}")
    else:
        lines.append("- None")

    lines.extend(
        [
            "",
            "## Conditions (non-blocking but recommended before/at launch)",
        ]
    )
    conditions = [r for r in results if r.status == "CONDITIONAL"]
    if conditions:
        for r in conditions:
            lines.append(f"- **{r.title}:** {r.summary}")
    else:
        lines.append("- None")
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return path


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    results = [
        category_editorial(),
        category_formatting(),
        category_metadata(),
        category_ebook(),
        category_print(),
        category_web(),
        category_marketing(),
        category_ops_governance(),
    ]
    for r in results:
        write_category(r)
    master = write_master(results)
    print(f"Wrote audit reports to: {OUT_DIR}")
    print(f"Master scorecard: {master}")


if __name__ == "__main__":
    main()
