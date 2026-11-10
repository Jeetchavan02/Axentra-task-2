import { Home, LogOut, Trophy, Settings, UserCheck, UserCircle, Users, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@src/lib/utils";
import { mainDomain } from "@src/auth/jwtService"
import { UserLogout } from "@src/auth/UserLogout";
import { useState } from "react";
import { Button } from "@src/components/ui/button";
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

export default function Sidebar() {
  const isOpen = true

  const user = JSON.parse(localStorage.getItem("userPermission") || "{}")?.logged_in_user;

  console.log(user)
  const location = useLocation();
  // const { showToast } = useToast()
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    UserLogout(); // Perform logout
    // showToast('Logging Out', "You are being logged out...", 'info');
    // Wait 500ms (adjust as needed), then show toast and reload
    setTimeout(() => {
      // Show toast message
      window.location.reload(); // Reload the page
    }, 500);
  };


  const navItems = [
    { name: "Command Center", path: "home", icon: <Home className="mr-3 h-5 w-5" /> },
    { name: "Conversions - live", path: "/", icon: <Settings className="mr-3 h-5 w-5" /> },
    { name: "Settings -live", path: "/settings", icon: <Users className="mr-3 h-5 w-5" /> },
    { name: "111", path: "/referrals/conversions", icon: <UserCheck className="mr-3 h-5 w-5" /> },
    { name: "Referrals", path: "/referrals", icon: <Home className="mr-3 h-5 w-5" /> },
    { name: "Leaderboard & Rewards", path: "/leaderboard", icon: <Trophy className="mr-3 h-5 w-5" /> },
    // { name: "Templates", path: "/templates", icon: <LayoutTemplate className="mr-3 h-5 w-5" /> },
    // { name: "Analytics", path: "/analytics", icon: <Megaphone className="mr-3 h-5 w-5" /> },
    // { name: "Billing", path: "/billing", icon: <CreditCard className="mr-3 h-5 w-5" /> },
  ];

  // Small function to close the dialog
  const handleDialogCancel = () => {
    setOpen(false);
  };

  return (
    <div
      className={cn(
        " bg-white shadow-md z-10 transition-all duration-300 ease-in-out max-h-screen flex flex-col border-r",
        isOpen ? "w-72 h-screen translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">

          <span className="text-lg font-semibold text-gray-800">Referral</span>
        </div>
      </div>

      <nav className="p-4 flex-grow overflow-y-auto mt-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              {item.path === "home" ? (
                // Custom Link and logic for `/home`
                <Link to={`${mainDomain}/merchant/apps`}>
                  <div className={cn(
                    "flex items-center px-4 py-2 text-sm rounded-md cursor-pointer",
                    location.pathname === item.path
                      ? "bg-primary-50 text-primary-600 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  )}>
                    {item.icon}
                    {isOpen && item.name}
                  </div>
                </Link>
              ) : (
                // Default Link logic
                <Link to={item.path}>
                  <div
                    className={cn(
                      "flex items-center px-4 py-2 text-sm rounded-md cursor-pointer",
                      location.pathname === item.path
                        ? "bg-primary-50 text-primary-600 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    {item.icon}
                    {isOpen && item.name}
                  </div>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {user && (
        <div className="p-2 border-t border-gray-200 ">
          <div className="flex">

            {isOpen && (
              <div>
                <div className="ml-3 mb-1 flex gap-2 items-center">
                  <UserCircle size={18} />
                  <p className="text-sm font-medium ">{user?.user_first_name} {user?.user_last_name}</p>
                </div>
                <div className="ml-5 pl-4">
                  <p className="text-xs text-gray-500">{user?.user_role}</p>
                </div>
              </div>
            )}

            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" title="Logout" className="py-2 px-3 rounded hover:bg-gray-100 isOpen ? ml-auto : mt-2">
                  {/* <Power className="h-5 w-5 text-gray-500" /> */}
                  <LogOut className="h-4 w-4 text-gray-400" />
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
                      handleDialogCancel(); // close after logout
                    }}
                  >
                    Logout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
    </div>
  );

}