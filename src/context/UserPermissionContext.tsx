// context/UserPermissionContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Outlet = {
  id: number;
  outlet_name: string;
  outlet_logo: string;
  web_url: string;
  api_key: string;
  platforms: string;
  outlet_currency: string;
};

type UserPermission = {
  appName: string;
  multipleDomain: Outlet[];
  apiKey: string;
  web_url: string;
  campaign: any[];
  permissionList: any[];
  is_super_user: boolean;
  multi_user_key: string;
  logged_in_user: number;
};

type UserPermissionContextType = {
  userPermission: UserPermission | null;
  setUserPermission: React.Dispatch<React.SetStateAction<UserPermission | null>>;
};

const UserPermissionContext = createContext<UserPermissionContextType | undefined>(undefined);

export const UserPermissionProvider = ({ children }: { children: ReactNode }) => {
  const [userPermission, setUserPermission] = useState<UserPermission | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('userPermission');
    if (data) {
      try {
        setUserPermission(JSON.parse(data));
      } catch (error) {
        console.error('Invalid userPermission format in localStorage', error);
      }
    }
  }, []);

  return (
    <UserPermissionContext.Provider value={{ userPermission, setUserPermission }}>
      {children}
    </UserPermissionContext.Provider>
  );
};

export const useUserPermission = () => {
  const context = useContext(UserPermissionContext);
  if (!context) {
    throw new Error('useUserPermission must be used within a UserPermissionProvider');
  }
  return context;
};
