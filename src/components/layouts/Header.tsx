import { Power, X } from "lucide-react";
import { Button } from "@src/components/ui/button";
import { UserLogout } from "@src/auth/UserLogout";
import { useToast } from "../../context/ToastContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@src/components/ui/alert-dialog";
import { useState } from "react";

interface HeaderProps {
  children?: React.ReactElement | React.ReactElement[]; // typed as element(s)
  toggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const { showToast } = useToast()
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    UserLogout(); // Perform logout
    showToast('Logging Out', "You are being logged out...", 'info');
    // Wait 500ms (adjust as needed), then show toast and reload
    setTimeout(() => {
      // Show toast message
      window.location.reload(); // Reload the page
    }, 500);
  };

  // Small function to close the dialog
  const handleDialogCancel = () => {
    setOpen(false);
  };

  return (
    <header className="bg-white shadow-lg border-b">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
        </div>

        <div className="flex items-center space-x-4">
        {children}


          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" title="Logout">
                <Power className="h-5 w-5 text-gray-500" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader className="mb-4">
                {/* <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle> */}
                <AlertDialogTitle className="flex justify-between items-center mb-4">
                  <span>Are you sure you want to log out?</span>
                  {/* Cross button to close dialog */}
                  <X
                    className="cursor-pointer h-4 w-4 mb-4"
                    onClick={handleDialogCancel}
                  />
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action will end your current session and you will need to log in again to access your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                {/* <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction> */}
                <AlertDialogAction
                  onClick={() => {
                    handleLogout();
                    handleDialogCancel(); // close dialog after logout
                  }}
                >
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

    </header>
  );
}

export default Header;