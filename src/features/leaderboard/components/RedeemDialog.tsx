import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@src/components/ui/alert-dialog";
import { formatNumber } from "../utils/format";
import type { Reward } from "../types";

interface RedeemDialogProps {
  reward: Reward | null;
  balance: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function RedeemDialog({ reward, balance, onConfirm, onCancel }: RedeemDialogProps) {
  return (
    <AlertDialog open={reward !== null} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Redeem {reward?.title}?</AlertDialogTitle>
          <AlertDialogDescription>
            {reward &&
              `This will spend ${formatNumber(reward.cost)} points. You will have ${formatNumber(balance - reward.cost)} points left.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
