import type { Paragraph, Link, PhrasingContent } from 'mdast';

export function isParagraph(node: any): node is Paragraph {
  return node.type === 'paragraph';
}

export function isLink(node: any): node is Link {
  return node.type === 'link';
}

export function isText(node: any): node is { type: 'text'; value: string } {
  return node.type === 'text';
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
