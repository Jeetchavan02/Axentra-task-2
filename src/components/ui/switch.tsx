import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@src/lib/utils"

// Define variant types
type SwitchVariant = "default" | "primary"

interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  variant?: SwitchVariant
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, variant = "default", ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    className={cn(
  "peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border border-gray-200 transition-colors",

  // ✅ REMOVE ALL browser + tailwind outlines
  "outline-none focus:outline-none focus-visible:outline-none",

  // Optional: keep a soft custom focus ring
  "focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background",

  "disabled:cursor-not-allowed disabled:opacity-50",

  variant === "default" &&
    "data-[state=checked]:bg-black data-[state=unchecked]:bg-gray-100",

  variant === "primary" &&
    "data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-100",

  className
)}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        // The thumb (the circle)
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow border transition-transform",
        // Movement
        "data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0.5",
        // Optional subtle color change for thumb
        "data-[state=checked]:bg-white data-[state=unchecked]:bg-background"
      )}
    />
  </SwitchPrimitives.Root>
))

Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
