-- Ensure unique identifiers across Pandoc elements for EPUB validity.

local seen = {}

local function dedupe_id(id)
  if id == nil or id == "" then
    return id
  end
  local count = seen[id] or 0
  if count == 0 then
    seen[id] = 1
    return id
  end
  count = count + 1
  seen[id] = count
  return id .. "-" .. tostring(count)
end

local function normalize_attr(attr)
  if attr == nil then
    return attr
  end
  attr.identifier = dedupe_id(attr.identifier)
  return attr
end

function Header(el)
  el.identifier = dedupe_id(el.identifier)
  el.attr = normalize_attr(el.attr)
  return el
end

function Div(el)
  el.identifier = dedupe_id(el.identifier)
  el.attr = normalize_attr(el.attr)
  return el
end

function Span(el)
  el.identifier = dedupe_id(el.identifier)
  el.attr = normalize_attr(el.attr)
  return el
end

function CodeBlock(el)
  el.identifier = dedupe_id(el.identifier)
  el.attr = normalize_attr(el.attr)
  return el
end
