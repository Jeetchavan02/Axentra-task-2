import { useEffect, useState } from "react";
import AppRouter from "@src/routers/AppRouter";
import Sidebar from "@src/components/layouts/Sidebar";
import MobileTopBar from "@src/components/layouts/MobileTopBar";
import { useLocation } from "react-router-dom";


const hiddenSidebarRoutes = ["/referral-login"];

const App: React.FC = () => {
  const location = useLocation();
  const hideSidebar = hiddenSidebarRoutes.includes(location.pathname);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close the drawer with Escape for keyboard users.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (<div className="flex h-screen flex-col overflow-hidden bg-gray-50 w-full lg:flex-row">
    {!hideSidebar && <MobileTopBar onMenuClick={() => setDrawerOpen(true)} />}
    {!hideSidebar && <Sidebar mobileOpen={drawerOpen} onNavigate={() => setDrawerOpen(false)} />}
    {drawerOpen && (
      <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" aria-hidden="true" onClick={() => setDrawerOpen(false)} />
    )}
    {/* Main content */}
    <AppRouter />
  </div>);
};

export default App;
