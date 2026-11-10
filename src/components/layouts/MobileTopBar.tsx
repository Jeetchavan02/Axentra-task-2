import { Menu } from "lucide-react";
import { Button } from "@src/components/ui/button";

interface MobileTopBarProps {
  onMenuClick: () => void;
}

/** Visible below the `lg` breakpoint, where the sidebar becomes a drawer. */
export default function MobileTopBar({ onMenuClick }: MobileTopBarProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-white px-4 lg:hidden">
      <Button variant="ghost" size="icon" aria-label="Open navigation" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </Button>
      <span className="text-lg font-semibold text-gray-800">Referral</span>
    </header>
  );
}
