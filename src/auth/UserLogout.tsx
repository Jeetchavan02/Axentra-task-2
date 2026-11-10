import { removeToken } from "@src/auth/auth";

export const UserLogout = () => {
  removeToken();
  localStorage.removeItem("userPermission");
  return null;
};
