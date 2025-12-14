import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Pencil,
  ClipboardList,
  Info,
  CircleCheck,
  Flame,
  Check,
  CircleHelp,
  TriangleAlert,
  X,
  Zap,
  Bug,
  List,
  Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NoteProps = {
  type?: string;
  children: React.ReactNode;
};

export default function Note({ type = "note", children }: NoteProps) {
  let variant: "default" | "destructive" = "default";
  let Icon = Pencil;

  // Base classes with static strings
  let iconColor = "text-blue-500";
  let bgColor = "bg-blue-50 dark:bg-blue-950/20";
  let borderColor = "border-blue-200 dark:border-blue-900";
  let title = "Note";

  switch (type) {
    case "abstract":
      Icon = ClipboardList;
      iconColor = "text-teal-500";
      bgColor = "bg-teal-50 dark:bg-teal-950/20";
      borderColor = "border-teal-200 dark:border-teal-900";
      title = "Abstract";
      break;

    case "info":
      Icon = Info;
      iconColor = "text-sky-500";
      bgColor = "bg-sky-50 dark:bg-sky-950/20";
      borderColor = "border-sky-200 dark:border-sky-900";
      title = "Info";
      break;

    case "todo":
      Icon = CircleCheck;
      iconColor = "text-blue-500";
      bgColor = "bg-blue-50 dark:bg-blue-950/20";
      borderColor = "border-blue-200 dark:border-blue-900";
      title = "Todo";
      break;

    case "tip":
      Icon = Flame;
      iconColor = "text-emerald-500";
      bgColor = "bg-emerald-50 dark:bg-emerald-950/20";
      borderColor = "border-emerald-200 dark:border-emerald-900";
      title = "Tip";
      break;

    case "success":
      Icon = Check;
      iconColor = "text-green-500";
      bgColor = "bg-green-50 dark:bg-green-950/20";
      borderColor = "border-green-200 dark:border-green-900";
      title = "Success";
      break;

    case "question":
      Icon = CircleHelp;
      iconColor = "text-amber-500";
      bgColor = "bg-amber-50 dark:bg-amber-950/20";
      borderColor = "border-amber-200 dark:border-amber-900";
      title = "Question";
      break;

    case "warning":
      Icon = TriangleAlert;
      iconColor = "text-orange-500";
      bgColor = "bg-orange-50 dark:bg-orange-950/20";
      borderColor = "border-orange-200 dark:border-orange-900";
      title = "Warning";
      break;

    case "failure":
      Icon = X;
      iconColor = "text-red-500";
      bgColor = "bg-red-50 dark:bg-red-950/20";
      borderColor = "border-red-200 dark:border-red-900";
      variant = "destructive";
      title = "Failure";
      break;

    case "danger":
      Icon = Zap;
      iconColor = "text-rose-500";
      bgColor = "bg-rose-50 dark:bg-rose-950/20";
      borderColor = "border-rose-200 dark:border-rose-900";
      variant = "destructive";
      title = "Danger";
      break;

    case "bug":
      Icon = Bug;
      iconColor = "text-pink-500";
      bgColor = "bg-pink-50 dark:bg-pink-950/20";
      borderColor = "border-pink-200 dark:border-pink-900";
      variant = "destructive";
      title = "Bug";
      break;

    case "example":
      Icon = List;
      iconColor = "text-purple-500";
      bgColor = "bg-purple-50 dark:bg-purple-950/20";
      borderColor = "border-purple-200 dark:border-purple-900";
      title = "Example";
      break;

    case "quote":
      Icon = Quote;
      iconColor = "text-slate-500";
      bgColor = "bg-slate-50 dark:bg-slate-950/20";
      borderColor = "border-slate-200 dark:border-slate-900";
      title = "Quote";
      break;

    case "note":
    default:
      // Keep default
      break;
  }

  return (
    <div
      className={cn(
        "my-6 w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start",
        bgColor,
        borderColor,
        type === "quote" ? "border-l-4" : "",
      )}
    >
      <Icon className={cn("size-4 translate-y-0.5", iconColor)} />
      <div className="col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight mb-2">
        {title}
      </div>
      <div className="col-start-2 text-muted-foreground grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed">
        {children}
      </div>
    </div>
  );
}
