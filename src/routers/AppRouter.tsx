import NotFound from "@src/pages/NotFound";

import { useLayoutEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "@src/components/layouts/MainLayout";
import { ToastProvider } from "@src/context/ToastContext";

import { UserPermissionProvider } from "@src/context/UserPermissionContext";
import CheckLogin from "@src/auth/CheckLogin";

import { UserLogout } from "@src/auth/UserLogout";
import LoginPage from "@src/pages/LoginPage";
import ReferralSettingsPage from "@src/pages/ReferralSettingsPage";
import ReferralsConversions from "@src/pages/Conversions";
import ReferralsMain from "@src/pages/Referrals";
import AllConversions from "@src/pages/ReferralsConversions"
import { LeaderboardPage } from "@src/features/leaderboard";


const AppRouter: React.FC = () => {
    useLayoutEffect(() => {
        sessionStorage.removeItem('isLoad');
    }, [])

    return (<>
        <ToastProvider>
            <UserPermissionProvider>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<AllConversions />} />
                        <Route path="/referrals/conversions" element={<ReferralsConversions />} />
                        <Route path="/settings" element={<ReferralSettingsPage />} />
                        <Route path="/referrals" element={<ReferralsMain />} />
                        <Route path="/leaderboard" element={<LeaderboardPage />} />
                    </Route>
                     
                    <Route path="/referral-login" element={<LoginPage />} />
                    

                    <Route path="/checkLogin" element={<CheckLogin />} />
                    <Route path="/userLogout" element={<UserLogout />} />
                    <Route path="*" element={<NotFound />} />

                </Routes>

            </UserPermissionProvider>
        </ToastProvider>
    </>);
};

export default AppRouter;