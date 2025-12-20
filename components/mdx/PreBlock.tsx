import { CodeBlockClient } from "./CodeBlockClient";
import { codeToHtml, createCssVariablesTheme } from "shiki";
import { isValidElement } from "react";

const cssVariablesTheme = createCssVariablesTheme({});

export async function PreBlock(props: React.HTMLAttributes<HTMLPreElement>) {
  const { children, ...rest } = props;

  // Validate children structure
  // <pre> usually contains a <code> child
  let codeContent = "";
  let language = "text";
  let filename: string | undefined;

  // Debugging
  // console.log("PreBlock children:", children);
  
  let codeProps: { className?: string; children?: React.ReactNode } | undefined;

  if (isValidElement(children)) {
    // Check if children is a code element or a component that behaves like one
    // In MDX, it's often a component function but still has props we expect
    const props = children.props as { className?: string; children?: React.ReactNode };
    if (props && (props.className || typeof props.children === 'string' || Array.isArray(props.children))) {
        codeProps = props;
    }
  }

  if (codeProps) {
    
    // Extract raw code content
    if (typeof codeProps.children === "string") {
      codeContent = codeProps.children;
    } else if (Array.isArray(codeProps.children)) {
        // Flatten array children if needed, though usually it's string or string[]
        codeContent = codeProps.children.join("");
    } else if (isValidElement(codeProps.children)) {
         // Handle edge case where code inner might be another element (unlikely for raw code)
         // But for safety, try getting text content
         // skipping complex recursion for now
    }

    // Parse parsing className for language and filename
    // Format usually: language-js:filename.js or language-js
    const className = codeProps.className || "";
    const match = className.match(/language-([a-zA-Z0-9_\-]+)(?::(.+))?/);
    
    if (match) {
      language = match[1];
      filename = match[2];
    }
    
    // Alias terminal to bash
    if (language === "terminal") {
      language = "bash";
    }
  } else {
      // Fallback if not a standard pre > code structure
      // In MDX, pre usually wraps code.
      // If direct string content in pre (unlikely for standard markdown code blocks)
      // return <pre {...rest}>{children}</pre>;
      // Force content to be children if it's a string
      if (typeof children === 'string') {
          codeContent = children;
      } else {
           return <pre {...rest}>{children}</pre>;
      }
  }

  // Trim the last newline if present (common in markdown code blocks)
  codeContent = codeContent.replace(/\n$/, "");

  const html = await codeToHtml(codeContent, {
    lang: language,
    theme: cssVariablesTheme,
     transformers: [
        {
          pre: (hast) => {
             // We only want the inner code content, not the pre wrapper from Shiki
             // But Shiki returns <pre><code>...</code></pre>
             // We want to strip the pre and code tags to just get the spans/text
             // ACTUALLY, usually we keep the structure but we want to inject it into our custom container.
             // If we use codeToHtml, it gives full HTML string.
             
             // Custom transformer to remove <pre> and <code> wrapper if checking raw strings is flaky
             // But replace on string output is easier for strip
             return hast;
          },
        }
      ]
  });

  // Shiki output is <pre ...><code ...>...</code></pre>
  // We want the inner HTML of the <code> tag or just the lines.
  // Let's strip the wrapper tags.
  const innerHtml = html
    .replace(/^<pre[^>]*><code[^>]*>/, "")
    .replace(/<\/code><\/pre>$/, "");

  return (
    <CodeBlockClient
      html={innerHtml}
      language={language}
      filename={filename}
    />
  );
}
