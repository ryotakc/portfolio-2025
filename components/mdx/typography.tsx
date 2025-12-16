import Link from "next/link";
import type { AnchorHTMLAttributes, FC, HTMLAttributes } from "react";

export const Typography: Record<
  string,
  // biome-ignore lint/suspicious/noExplicitAny: Generic component map
  FC<any /* eslint-disable-line @typescript-eslint/no-explicit-any */>
> = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance mb-5"
      {...props}
    />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
      {...props}
    />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight" {...props} />
  ),
  h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight" {...props} />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />
  ),
  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="mt-6 border-l-2 pl-6 italic mb-10" {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
  ),
  ol: (props: HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => <li className="mt-2" {...props} />,
  table: (props: HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full" {...props} />
    </div>
  ),
  tr: (props: HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="even:bg-muted m-0 border-t p-0" {...props} />
  ),
  th: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),
  td: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),
  a: ({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    return (
      <Link
        className="font-medium underline underline-offset-4 decoration-rurikon-300 hover:decoration-rurikon-600 focus:outline-none focus-visible:rounded-xs focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-opacity-50 focus-visible:ring-offset-2"
        href={href || "#"}
        draggable={false}
        {...(href?.startsWith("https://")
          ? {
              target: "_blank",
              rel: "noopener noreferrer",
            }
          : {})}
        {...props}
      />
    );
  },
  strong: (props: HTMLAttributes<HTMLElement>) => <strong className="font-bold" {...props} />,
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <pre className="mt-7 whitespace-pre md:whitespace-pre-wrap" {...props} />
  ),
  hr: (props: HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-14 w-24 border-rurikon-border" {...props} />
  ),
  Lead: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-muted-foreground text-xl" {...props} />
  ),
  Large: (props: HTMLAttributes<HTMLDivElement>) => (
    <div className="text-lg font-semibold" {...props} />
  ),
  Small: (props: HTMLAttributes<HTMLElement>) => (
    <small className="text-sm leading-none font-medium" {...props} />
  ),
  Muted: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-muted-foreground text-sm" {...props} />
  ),
};
