import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-neutral-200 bg-neutral-100 px-3 py-2 text-base dark:text-neutral-200 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-none focus-visible:border-neutral-950 focus-visible:ring-offset-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:bg-neutral-900 dark:ring-offset-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:border-neutral-300",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
