import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";

type TaxonomyItem = {
  label: string;
  count?: number;
  onClick: () => void;
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
          <button key={item.label} onClick={item.onClick} type="button" className="no-underline">
            <Badge
              variant={isActive ? "default" : "secondary"}
              className={cn(
                "text-sm py-1 px-3 transition-all cursor-pointer",
                isActive ? "hover:opacity-90" : "hover:opacity-80 opacity-70 hover:opacity-100",
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
          </button>
        );
      })}
    </div>
  );
}
