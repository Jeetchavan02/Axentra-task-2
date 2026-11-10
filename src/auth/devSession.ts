import Cookies from "js-cookie";

/**
 * Local development only: the production app signs in through the main
 * Axentra domain, which is not reachable from localhost. Seed a placeholder
 * token so AppRouter does not redirect away from the dev server.
 * Stripped from production builds because `import.meta.env.DEV` is false there.
 */
export const ensureDevSession = (): void => {
  if (import.meta.env.DEV && !Cookies.get("referral_user_token")) {
    Cookies.set("referral_user_token", "local-dev-token", { sameSite: "lax" });
  }
};
