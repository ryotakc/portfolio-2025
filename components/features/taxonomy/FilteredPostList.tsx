import { format } from "date-fns";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { MDXPostMeta } from "@/lib/mdx-utils";

type FilteredPostListProps = {
  posts: MDXPostMeta[];
  filterType: "tag" | "category";
  filterValue: string;
  locale: string;
};

export function FilteredPostList({
  posts,
  filterType,
  filterValue,
  locale,
}: FilteredPostListProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {filterType === "tag" ? "Tag: " : "Category: "}
          <span className="text-primary">{filterValue}</span>
        </h1>
        <Badge variant="outline" className="text-lg px-3 py-1">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </Badge>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground text-lg">No posts found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => {
            return <PostCard key={post.slug.join("-")} post={post} locale={locale} />;
          })}
        </div>
      )}
    </div>
  );
}

function PostCard({ post, locale }: { post: MDXPostMeta; locale: string }) {
  const href = `/${locale}/${post.slug.join("/")}`;

  return (
    <Link href={href} className="block group">
      <Card className="h-full overflow-hidden border-transparent bg-secondary/20 hover:bg-secondary/40 transition-colors">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            {post.frontmatter.date && (
              <time className="text-sm text-muted-foreground">
                {format(new Date(post.frontmatter.date), "MMMM d, yyyy")}
              </time>
            )}
          </div>
          <CardTitle className="group-hover:text-primary transition-colors text-xl">
            {post.frontmatter.title}
          </CardTitle>
          {post.frontmatter.description && (
            <CardDescription className="line-clamp-2">
              {post.frontmatter.description}
            </CardDescription>
          )}
          {/* Tags preview */}
          {Array.isArray(post.frontmatter.tags) && post.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-4">
              {post.frontmatter.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0 h-5">
                  #{tag}
                </Badge>
              ))}
              {post.frontmatter.tags.length > 3 && (
                <span className="text-xs text-muted-foreground self-center">
                  +{post.frontmatter.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </CardHeader>
      </Card>
    </Link>
  );
}
