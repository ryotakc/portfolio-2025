import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TaxonomyItem = {
  label: string;
  count?: number;
  href: string;
};

type TaxonomyListProps = {
  items: TaxonomyItem[];
  type: "tag" | "category";
  className?: string;
  activeItem?: string;
};

export function TaxonomyList({ items, type, className, activeItem }: TaxonomyListProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => {
        const isActive = item.label === activeItem;
        return (
          <Link key={item.label} href={item.href} className="no-underline">
            <Badge
              variant={isActive ? "default" : "secondary"}
              className={cn(
                "text-sm py-1 px-3 transition-all",
                isActive
                  ? "hover:opacity-90"
                  : "hover:opacity-80 opacity-70 hover:opacity-100",
                type === "tag" && !isActive && "bg-secondary/50",
              )}
            >
              {type === "tag" && item.label !== "All" ? "#" : ""}
              {item.label}
              {item.count !== undefined && (
                <span className={cn("ml-2 text-xs", isActive ? "opacity-100" : "opacity-60")}>
                  {item.count}
                </span>
              )}
            </Badge>
          </Link>
        );
      })}
    </div>
  );
}
