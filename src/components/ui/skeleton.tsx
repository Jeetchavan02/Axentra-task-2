// import { cn } from "@src/lib/utils"

// function Skeleton({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLDivElement>) {
//   return (
//     <div
//       className={cn("animate-pulse rounded-md bg-gray-200", className)}
//       {...props}
//     />
//   )
// }

// export { Skeleton }





import { motion } from "framer-motion"
import { cn } from "@src/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-gray-200",
        className
      )}
      {...props}
    >
      <motion.div
        className="absolute inset-y-0 w-6 bg-white/70 blur-sm"
        initial={{ x: -40 }}
        animate={{ x: "300%" }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  )
}

export { Skeleton }