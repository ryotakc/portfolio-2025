import { codeToHtml, createCssVariablesTheme } from "shiki";
import type { HTMLAttributes } from "react";

const cssVariablesTheme = createCssVariablesTheme({});

export async function CodeBlock(
  props: HTMLAttributes<HTMLElement> & { children?: React.ReactNode },
) {
  if (typeof props.children === "string") {
    const code = await codeToHtml(props.children, {
      lang: "jsx", // Default lang
      theme: cssVariablesTheme,
      transformers: [
        {
          pre: (hast) => {
            if (hast.children.length !== 1) {
              throw new Error("<pre>: Expected a single <code> child");
            }
            const child = hast.children[0];
            if (child.type !== "element") {
              throw new Error("<pre>: Expected a <code> child");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return child as any;
          },
          postprocess(html) {
            return html.replace(/^<code>|<\/code>$/g, "");
          },
        },
      ],
    });

    return (
      <code
        className="inline shiki css-variables text-[0.805rem] sm:text-[13.8px] md:text-[0.92rem]"
        dangerouslySetInnerHTML={{ __html: code }}
      />
    );
  }

  return (
    <code
      className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
      {...props}
    />
  );
}
