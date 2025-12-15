import { visit } from "unist-util-visit";

export function remarkLinkCard() {
  return (tree) => {
    visit(tree, "paragraph", (node, index, parent) => {
      // Check if paragraph has exactly one child
      if (node.children.length !== 1) return;

      const child = node.children[0];

      // Check if the child is a link
      if (child.type !== "link") return;

      // Check if the link text matches the URL (raw URL)
      // Usually, a raw link in Markdown is parsed as a Link node with a single Text child matching the URL
      // or simply a Text node if not autolinked.
      // But typically remark-gfm autolinks, producing a Link node.
      // We also check if the text visible to the user is the URL itself (no [label](url)).
      if (
        child.children.length !== 1 ||
        child.children[0].type !== "text" ||
        child.children[0].value !== child.url
      ) {
        return;
      }
       
      // Create the MDX JSX Flow Element for LinkCard
      const linkCardNode = {
        type: "mdxJsxFlowElement",
        name: "LinkCard",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "url",
            value: child.url,
          },
        ],
        children: [],
      };

      // Replace the paragraph with the LinkCard node
      parent.children[index] = linkCardNode;
    });
  };
}
