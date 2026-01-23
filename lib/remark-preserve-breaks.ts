import type { Content, PhrasingContent, Root } from "mdast";
import type { Plugin } from "unified";

const remarkPreserveBreaks: Plugin<[], Root> = () => {
  return (tree) => {
    // Only process the root children (blocks)
    const newChildren: Content[] = [];

    for (let i = 0; i < tree.children.length; i++) {
      const child = tree.children[i];

      if (i > 0) {
        const prev = tree.children[i - 1];
        if (prev.position?.end.line && child.position?.start.line) {
          const diff = child.position.start.line - prev.position.end.line;

          // diff = 2 means 1 empty line (standard paragraph break)
          // diff > 2 means multiple empty lines
          if (diff > 2) {
            const breaks: PhrasingContent[] = [];
            for (let j = 0; j < diff - 2; j++) {
              breaks.push({ type: "break" });
            }
            newChildren.push({
              type: "paragraph",
              children: breaks,
            });
          }
        }
      }
      newChildren.push(child);
    }

    tree.children = newChildren;
  };
};

export default remarkPreserveBreaks;
