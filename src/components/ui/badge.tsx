import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@src/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-blue-500 text-white hover:bg-blue-600",
        secondary: "border-transparent bg-gray-500 text-white hover:bg-gray-600",
        destructive: "border-transparent bg-red-500 text-white hover:bg-red-600",
        outline: "border border-gray-300 text-gray-800",

        success: "border-transparent bg-green-500 text-white hover:bg-green-600",
        warning: "border-transparent bg-yellow-500 text-black hover:bg-yellow-600",
        info: "border-transparent bg-sky-500 text-white hover:bg-sky-600",
        muted: "border-transparent bg-gray-200 text-gray-800 hover:bg-gray-300",
        pink: "border-transparent bg-pink-500 text-white hover:bg-pink-600",
        purple: "border-transparent bg-purple-500 text-white hover:bg-purple-600",
      },

      // 🧱 NEW: size variants
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base",
      },

      // 🌗 NEW: tone variants (light/dark versions)
      tone: {
        light: "opacity-90 hover:opacity-100",
        dark: "brightness-90 hover:brightness-100",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "sm",
      tone: "light",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, tone, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size, tone }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
