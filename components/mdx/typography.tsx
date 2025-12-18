import Link from "next/link";
import type { AnchorHTMLAttributes, FC, HTMLAttributes } from "react";

export const Typography: Record<
  string,
  // biome-ignore lint/suspicious/noExplicitAny: Generic component map
  FC<any /* eslint-disable-line @typescript-eslint/no-explicit-any */>
> = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="scroll-m-20 text-[1.3rem] md:text-[1.5rem] font-medium tracking-tight text-[#0F1420] dark:text-zinc-100 mt-20 mb-8"
      {...props}
    />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-16 mb-6 scroll-m-20 pb-2 text-[1.25rem] font-medium tracking-tight transition-colors text-[#0F1420] dark:text-zinc-100 first:mt-0"
      {...props}
    />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-12 mb-4 scroll-m-20 text-[1.1rem] font-medium tracking-tight text-[#0F1420] dark:text-zinc-100"
      {...props}
    />
  ),
  h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="mt-8 mb-4 scroll-m-20 text-lg font-medium tracking-tight text-[#0F1420] dark:text-zinc-100"
      {...props}
    />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="leading-[1.8] text-[1.03rem] text-[#0F1420] dark:text-zinc-300 [&:not(:first-child)]:mt-8"
      {...props}
    />
  ),
  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mt-10 mb-10 border-l-[3px] border-[#C2C9CD] dark:border-zinc-700 pl-4 py-1 text-[#798185] dark:text-zinc-400"
      {...props}
    />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="my-6 ml-[1.8rem] list-disc [&>li]:mt-3 marker:text-zinc-400 dark:marker:text-zinc-600"
      {...props}
    />
  ),
  ol: (props: HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="my-6 ml-[1.8rem] list-decimal [&>li]:mt-3 marker:text-zinc-500 dark:marker:text-zinc-500"
      {...props}
    />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-[1.7] text-[1.03rem] text-[#0F1420] dark:text-zinc-300" {...props} />
  ),
  table: (props: HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  tr: (props: HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="m-0 border-t p-0 even:bg-muted" {...props} />
  ),
  th: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right text-[#0F1420] dark:text-zinc-100"
      {...props}
    />
  ),
  td: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right text-[#0F1420] dark:text-zinc-300"
      {...props}
    />
  ),
  a: ({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    return (
      <Link
        className="font-normal underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-600 dark:decoration-zinc-600 dark:hover:decoration-zinc-400 text-[#0F1420] dark:text-zinc-100 transition-colors"
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
  strong: (props: HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-[#0F1420] dark:text-white" {...props} />
  ),
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="mt-8 mb-8 rounded-2xl bg-[#F5F9FB] dark:bg-zinc-900 border border-[#EBF2F5] dark:border-zinc-800 p-5 overflow-x-auto"
      {...props}
    />
  ),
  hr: (props: HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-16 border-zinc-200 dark:border-zinc-800" {...props} />
  ),
  Lead: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-muted-foreground text-xl" {...props} />
  ),
  Large: (props: HTMLAttributes<HTMLDivElement>) => (
    <div className="text-lg font-semibold text-[#0F1420] dark:text-zinc-100" {...props} />
  ),
  Small: (props: HTMLAttributes<HTMLElement>) => (
    <small
      className="text-sm leading-none font-medium text-[#0F1420] dark:text-zinc-300"
      {...props}
    />
  ),
  Muted: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-muted-foreground text-sm" {...props} />
  ),
};
