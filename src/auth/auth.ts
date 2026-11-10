import Cookies from "js-cookie";

export const setToken = (token: string, app: string) => {
  Cookies.set("referral_user_token", token);
  localStorage.setItem("app", app);
};

export const removeToken = () => {
  Cookies.remove("referral_user_token");
};
