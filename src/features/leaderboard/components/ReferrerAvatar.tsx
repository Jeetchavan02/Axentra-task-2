import { cn } from "@src/lib/utils";
import { getInitials } from "../utils/format";

const PALETTE = [
  "bg-blue-50 text-blue-600",
  "bg-green-50 text-green-600",
  "bg-purple-50 text-purple-600",
  "bg-orange-50 text-orange-600",
];

interface ReferrerAvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZES = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-16 w-16 text-lg" };

export default function ReferrerAvatar({ name, size = "md", className }: ReferrerAvatarProps) {
  const color = PALETTE[name.length % PALETTE.length];
  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center rounded-full font-semibold", SIZES[size], color, className)}
    >
      {getInitials(name)}
    </span>
  );
}
