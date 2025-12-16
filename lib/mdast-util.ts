import type { Link, Paragraph, PhrasingContent } from "mdast";

export function isParagraph(node: unknown): node is Paragraph {
  return (
    typeof node === "object" &&
    node !== null &&
    (node as Record<string, unknown>).type === "paragraph"
  );
}

export function isLink(node: unknown): node is Link {
  return (
    typeof node === "object" && node !== null && (node as Record<string, unknown>).type === "link"
  );
}

export function isText(node: unknown): node is { type: "text"; value: string } {
  return (
    typeof node === "object" && node !== null && (node as Record<string, unknown>).type === "text"
  );
}

export function isSimpleUrlLink(paragraph: Paragraph): boolean {
  if (paragraph.children.length !== 1) {
    return false;
  }

  const child = paragraph.children[0] as Link;

  if (!isLink(child)) {
    return false;
  }

  // Check if the link text matches the URL
  if (
    child.children.length !== 1 ||
    !isText(child.children[0]) ||
    child.children[0].value !== child.url
  ) {
    return false;
  }

  return true;
}
