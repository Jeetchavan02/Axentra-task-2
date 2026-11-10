import axios from "axios";
import Cookies from "js-cookie";

// Local stand-in: the original auth module was not shipped with the zip.
/** Backend base URL. Set VITE_API_BASE_URL to point at a real API. */
export const baseURL: string = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export const getReq = (path: string, params: unknown, base: string = baseURL) =>
  axios.get(`${base}/${path}`, {
    params,
    headers: { Authorization: `Bearer ${Cookies.get("referral_user_token") ?? ""}` },
  });

export const postReq = (path: string, payload: unknown, base: string = baseURL) =>
  axios.post(`${base}/${path}`, payload, {
    headers: { Authorization: `Bearer ${Cookies.get("referral_user_token") ?? ""}` },
  });
