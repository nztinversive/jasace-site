export type BlogContentValue = string | string[];

const EMPTY_PARAGRAPHS = new Set(["", "<p></p>", "<p><br></p>"]);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function paragraphsToHtml(paragraphs: string[]) {
  return paragraphs
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replaceAll("\n", "<br />")}</p>`)
    .join("");
}

export function normalizeBlogContent(content: BlogContentValue | null | undefined) {
  if (Array.isArray(content)) {
    return paragraphsToHtml(content);
  }

  return typeof content === "string" ? content : "";
}

export function normalizeEditorHtml(html: string) {
  const trimmed = html.trim();
  return EMPTY_PARAGRAPHS.has(trimmed) ? "" : trimmed;
}
