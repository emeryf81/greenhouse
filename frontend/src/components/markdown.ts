/**
 * Minimal, safe Markdown -> Lit renderer for the handbook.
 *
 * Supports what the chapters use: ##/### headings, paragraphs, bullet and
 * numbered lists, pipe tables, **bold**, *italic* and `code`.  Text is
 * rendered through Lit templates, never innerHTML, so content is escaped.
 */
import { html, nothing, type TemplateResult } from "lit";

export interface MdHeading { level: number; text: string; id: string }

export const slug = (text: string): string =>
  text.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function inline(text: string): (TemplateResult | string)[] {
  const out: (TemplateResult | string)[] = [];
  const re = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[2] !== undefined) out.push(html`<strong>${m[2]}</strong>`);
    else if (m[3] !== undefined) out.push(html`<em>${m[3]}</em>`);
    else out.push(html`<code>${m[4]}</code>`);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function headings(md: string): MdHeading[] {
  return md.split("\n").filter((l) => /^#{2,3} /.test(l)).map((l) => {
    const level = l.startsWith("### ") ? 3 : 2;
    const text = l.replace(/^#+ /, "").trim();
    return { level, text, id: slug(text) };
  });
}

const cells = (row: string): string[] => row.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());

export function renderMarkdown(md: string): TemplateResult {
  const lines = md.replace(/\r/g, "").split("\n");
  const blocks: TemplateResult[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    const h = /^(#{1,4}) (.*)$/.exec(line);
    if (h) {
      const text = h[2].trim();
      const level = Math.min(Math.max(h[1].length, 2), 4);
      blocks.push(level === 2 ? html`<h2 id=${slug(text)}>${inline(text)}</h2>` : level === 3 ? html`<h3 id=${slug(text)}>${inline(text)}</h3>` : html`<h4>${inline(text)}</h4>`);
      i++;
      continue;
    }
    if (line.trim().startsWith("|")) {
      const rows: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) rows.push(lines[i++]);
      const [head, , ...body] = rows;
      const hasSep = rows[1] !== undefined && /^\s*\|?\s*:?-{2,}/.test(rows[1]);
      const bodyRows = hasSep ? body : rows.slice(1);
      blocks.push(html`<div class="table-wrap"><table>
        <thead><tr>${cells(head).map((c) => html`<th>${inline(c)}</th>`)}</tr></thead>
        <tbody>${bodyRows.map((r) => html`<tr>${cells(r).map((c) => html`<td>${inline(c)}</td>`)}</tr>`)}</tbody>
      </table></div>`);
      continue;
    }
    if (/^\s*([-*]|\d+\.) /.test(line)) {
      const ordered = /^\s*\d+\. /.test(line);
      const items: string[] = [];
      while (i < lines.length && /^\s*([-*]|\d+\.) /.test(lines[i])) {
        items.push(lines[i].replace(/^\s*([-*]|\d+\.) /, ""));
        i++;
      }
      const lis = items.map((it) => html`<li>${inline(it)}</li>`);
      blocks.push(ordered ? html`<ol>${lis}</ol>` : html`<ul>${lis}</ul>`);
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,4} |\s*\||\s*([-*]|\d+\.) )/.test(lines[i])) para.push(lines[i++].trim());
    blocks.push(html`<p>${inline(para.join(" "))}</p>`);
  }
  return blocks.length ? html`${blocks}` : html`${nothing}`;
}
