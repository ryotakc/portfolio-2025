import { getMdxBySlug, getAllContentPaths, MDXPost } from "./mdx-utils";
import { languages } from "./i18n";
import { notFound } from "next/navigation";

// Returns the post if it exists and is not a draft.
// Returns null otherwise.
export async function getPublicPost(locale: string, slug: string[]) {
  const post = await getMdxBySlug(locale, slug);

  if (!post) {
    return null;
  }

  if (post.frontmatter.draft) {
    return null;
  }

  return post;
}

export async function generateStaticRoutes() {
  const pathsByLocale = await Promise.all(
    languages.map(async (lang) => {
      const slugs = await getAllContentPaths(lang);
      return slugs.map((slug) => ({ locale: lang, slug }));
    }),
  );

  return pathsByLocale.flat();
}
