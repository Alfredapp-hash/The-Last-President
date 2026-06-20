#!/usr/bin/env python3
"""Supervisor quality gate for final formatting workflow."""

from __future__ import annotations

import argparse
import csv
import re
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path("/workspace")
PUB_PREP = ROOT / "production" / "publication-prep"
AGENTS_DIR = ROOT / "production" / "final-formatting-agents"
OUT_DIR = PUB_PREP / "final-formatting"

AUDIT_SUMMARY = PUB_PREP / "audit" / "SUMMARY.md"
METADATA_CSV = PUB_PREP / "metadata" / "retailer-metadata.csv"


@dataclass
class CheckResult:
    name: str
    status: str
    evidence: list[str]
    blockers: list[str]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--strict-metadata",
        action="store_true",
        help="Fail gate when metadata placeholders are present.",
    )
    return parser.parse_args()


def exists_all(paths: list[Path]) -> tuple[list[Path], list[Path]]:
    present = [p for p in paths if p.exists()]
    missing = [p for p in paths if not p.exists()]
    return present, missing


def check_audit_summary() -> CheckResult:
    if not AUDIT_SUMMARY.exists():
        return CheckResult(
            "Gate 0 — Intake",
            "FAIL",
            [],
            [f"Missing audit summary: {AUDIT_SUMMARY}"],
        )

    text = AUDIT_SUMMARY.read_text(encoding="utf-8")
    rows = re.findall(r"^\| ([^|]+) \| \d+ \| \d+ \| \d+ \| \d+ \| ([A-Z]+) \|", text, re.M)
    overall_pass = "Overall: **PASS**" in text
    blockers: list[str] = []

    if not rows:
        blockers.append("Could not parse book rows in audit summary table")
    else:
        for title, status in rows:
            if status.strip() != "PASS":
                blockers.append(f"Audit row is not PASS: {title.strip()} -> {status.strip()}")

    if not overall_pass:
        blockers.append("Audit overall status is not PASS")

    status = "PASS" if not blockers else "FAIL"
    evidence = [
        f"Audit summary file: {AUDIT_SUMMARY}",
        f"Rows parsed: {len(rows)}",
        f"Overall marker present: {overall_pass}",
    ]
    return CheckResult("Gate 0 — Intake", status, evidence, blockers)


def check_packaging_files() -> CheckResult:
    expected = [
        PUB_PREP / "front-matter" / "book-one-front-matter-template.md",
        PUB_PREP / "front-matter" / "book-two-front-matter-template.md",
        PUB_PREP / "front-matter" / "book-three-front-matter-template.md",
        PUB_PREP / "back-matter" / "book-one-back-matter-template.md",
        PUB_PREP / "back-matter" / "book-two-back-matter-template.md",
        PUB_PREP / "back-matter" / "book-three-back-matter-template.md",
        PUB_PREP / "checklists" / "epub-export-checklist.md",
        PUB_PREP / "checklists" / "print-export-checklist.md",
        PUB_PREP / "checklists" / "distribution-submission-checklist.md",
    ]
    present, missing = exists_all(expected)
    blockers = [f"Missing required packaging artifact: {p}" for p in missing]
    status = "PASS" if not blockers else "FAIL"
    evidence = [
        f"Required artifacts present: {len(present)}/{len(expected)}",
    ]
    return CheckResult("Gate 1 — Packaging coherence", status, evidence, blockers)


def check_metadata(strict: bool) -> CheckResult:
    if not METADATA_CSV.exists():
        return CheckResult(
            "Gate 2 — Metadata readiness",
            "FAIL",
            [],
            [f"Missing metadata csv: {METADATA_CSV}"],
        )

    required_cols = {
        "book_slug",
        "series_name",
        "series_number",
        "title",
        "subtitle",
        "author",
        "language",
        "word_count",
        "status",
        "isbn_ebook",
        "isbn_paperback",
        "isbn_hardcover",
        "bisac_1",
        "keywords",
        "short_description",
        "long_description",
        "publication_date",
        "publisher",
        "website",
    }

    rows = []
    with METADATA_CSV.open("r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        rows = list(reader)
        missing_cols = sorted(required_cols - set(reader.fieldnames or []))

    blockers: list[str] = []
    warnings: list[str] = []

    if missing_cols:
        blockers.append(f"Metadata csv missing columns: {', '.join(missing_cols)}")

    placeholder_count = 0
    empty_required = 0
    for idx, row in enumerate(rows, start=2):
        for col in required_cols:
            value = (row.get(col) or "").strip()
            if col in {"isbn_ebook", "isbn_paperback", "isbn_hardcover", "publication_date", "publisher"}:
                if value.upper() == "TBD":
                    placeholder_count += 1
                    continue
            if not value:
                empty_required += 1
                blockers.append(f"Row {idx} has empty required field: {col}")
        if row.get("series_name", "").strip() != "Baren Sump and The Last President":
            blockers.append(f"Row {idx} has unexpected series_name")

    if placeholder_count > 0:
        msg = f"Metadata placeholders detected: {placeholder_count} field(s) still set to TBD"
        if strict:
            blockers.append(msg)
        else:
            warnings.append(msg)

    if blockers:
        status = "FAIL"
    elif warnings:
        status = "PASS WITH CONDITIONS"
    else:
        status = "PASS"

    evidence = [
        f"Metadata rows: {len(rows)}",
        f"Missing required values: {empty_required}",
    ] + warnings
    return CheckResult("Gate 2 — Metadata readiness", status, evidence, blockers)


def check_agent_pack() -> CheckResult:
    expected = [
        AGENTS_DIR / "README.md",
        AGENTS_DIR / "00-supervisor-final-formatting.md",
        AGENTS_DIR / "01-front-matter-agent.md",
        AGENTS_DIR / "02-back-matter-agent.md",
        AGENTS_DIR / "03-metadata-normalization-agent.md",
        AGENTS_DIR / "04-epub-export-agent.md",
        AGENTS_DIR / "05-print-layout-agent.md",
        AGENTS_DIR / "06-quality-gate-agent.md",
        AGENTS_DIR / "supervisor-run-template.md",
    ]
    present, missing = exists_all(expected)
    blockers = [f"Missing final-formatting agent file: {p}" for p in missing]
    status = "PASS" if not blockers else "FAIL"
    evidence = [f"Agent files present: {len(present)}/{len(expected)}"]
    return CheckResult("Gate 3 — Workflow integrity", status, evidence, blockers)


def final_status(results: list[CheckResult]) -> str:
    statuses = {r.status for r in results}
    if "FAIL" in statuses:
        return "FAIL"
    if "PASS WITH CONDITIONS" in statuses:
        return "PASS WITH CONDITIONS"
    return "PASS"


def write_quality_gate(results: list[CheckResult], status: str) -> Path:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    path = OUT_DIR / "QUALITY_GATE_REPORT.md"

    lines = [
        "# Quality Gate Report — Final Formatting Supervisor",
        "",
        f"Generated: {now}",
        "",
        f"## Verdict: **{status}**",
        "",
    ]

    for result in results:
        lines.append(f"### {result.name}")
        lines.append(f"- Status: **{result.status}**")
        if result.evidence:
            lines.append("- Evidence:")
            lines.extend([f"  - {e}" for e in result.evidence])
        if result.blockers:
            lines.append("- Blockers:")
            lines.extend([f"  - {b}" for b in result.blockers])
        else:
            lines.append("- Blockers: none")
        lines.append("")

    all_blockers = [b for r in results for b in r.blockers]
    lines.append("## Consolidated blocker list")
    if all_blockers:
        for i, blocker in enumerate(all_blockers, start=1):
            lines.append(f"{i}. {blocker}")
    else:
        lines.append("No blockers.")
    lines.append("")

    lines.append("## Next actions")
    if status == "PASS":
        lines.append("- Proceed to distributor upload using `distribution-submission-checklist.md`.")
    elif status == "PASS WITH CONDITIONS":
        lines.append("- Resolve conditional items (typically metadata placeholders) before launch.")
    else:
        lines.append("- Resolve blockers and rerun `python3 scripts/final_formatting_supervisor.py`.")
    lines.append("")

    path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return path


def write_supervisor_log(results: list[CheckResult], status: str) -> Path:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    path = OUT_DIR / "SUPERVISOR_RUN_LOG.md"
    lines = [
        "# Supervisor Run Log — Final Formatting",
        "",
        f"Date: {now}",
        "",
        "## Gate results",
    ]
    for result in results:
        lines.append(f"- {result.name}: **{result.status}**")
    lines.extend(
        [
            "",
            "## Final verdict",
            f"- **{status}**",
            "",
            "## Operator notes",
            "- Update this log with agent execution transcripts and file-level changes.",
        ]
    )
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return path


def write_signoff(status: str) -> Path:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    decision = "GO" if status == "PASS" else "NO-GO"
    path = OUT_DIR / "FINAL_FORMATTING_SIGNOFF.md"
    lines = [
        "# Final Formatting Sign-Off",
        "",
        f"Date: {now}",
        f"Decision: **{decision}**",
        f"Quality status: **{status}**",
        "",
        "## Rule",
        "- GO requires all gates to pass with no unresolved blockers.",
        "",
        "## Action",
        "- If NO-GO, clear blockers listed in `QUALITY_GATE_REPORT.md` and rerun supervisor script.",
    ]
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return path


def main() -> None:
    args = parse_args()

    results = [
        check_audit_summary(),
        check_packaging_files(),
        check_metadata(strict=args.strict_metadata),
        check_agent_pack(),
    ]
    status = final_status(results)

    report = write_quality_gate(results, status)
    run_log = write_supervisor_log(results, status)
    signoff = write_signoff(status)

    print(f"Final formatting quality status: {status}")
    print(f"Report: {report}")
    print(f"Run log: {run_log}")
    print(f"Sign-off: {signoff}")


if __name__ == "__main__":
    main()
