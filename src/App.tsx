import AppRouter from "@src/routers/AppRouter";
import Sidebar from "@src/components/layouts/Sidebar";
import { useLocation } from "react-router-dom";


const hiddenSidebarRoutes = ["/referral-login"];

const App: React.FC = () => {
  const location = useLocation();
  const hideSidebar = hiddenSidebarRoutes.includes(location.pathname);

  return (<div className="flex h-screen overflow-hidden bg-gray-50 w-full">
    {!hideSidebar && <Sidebar />}
    {/* Main content */}
    <AppRouter />
  </div>);
};

export default App;