import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertTriangle, XCircle, FileWarning, Info } from "lucide-react"

type NoteProps = {
  type?: "info" | "warn" | "alert"
  children: React.ReactNode
}

export default function Note({ type = "info", children }: NoteProps) {
  // Extract title/content from children if possible, or just render children
  // Usually remark-directive puts content as paragraphs.
  // We can try to guess title if specific format, but standard usage is just content.
  // The user image shows "Title\nContent".
  // Let's support an optional title prop if passed, but for now we just wrap children.
  
  // Custom styles based on type
  
  let variant: "default" | "destructive" = "default"
  let Icon = Info
  let className = ""
  let title = ""

  switch (type) {
    case 'info':
      variant = "default"
      Icon = CheckCircle
      className = "border-green-500/50 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/20 [&>svg]:text-green-700 dark:[&>svg]:text-green-400"
      title = "Information"
      break
    case 'warn':
      variant = "default"
      Icon = AlertTriangle
      className = "border-yellow-500/50 text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/20 [&>svg]:text-yellow-700 dark:[&>svg]:text-yellow-400"
      title = "Warning"
      break
    case 'alert':
      variant = "destructive"
      Icon = XCircle
      className = "border-red-500/50 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/20 [&>svg]:text-red-700 dark:[&>svg]:text-red-400"
      title = "Alert"
      break
  }

  return (
    <Alert variant={variant} className={`my-6 ${className}`}>
      <Icon className="h-4 w-4" />
      <AlertTitle className="mb-2">{title}</AlertTitle>
      <AlertDescription className="[&_p]:leading-relaxed">
        {children}
      </AlertDescription>
    </Alert>
  )
}
