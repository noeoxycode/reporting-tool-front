import { cn } from "@/lib/utils";

export default function EntityForm({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "",
        className
      )}
      {...props}
    />
  )
}