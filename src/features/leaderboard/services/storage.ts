const PREFIX = "axentra.leaderboard.";

export const readStorage = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const writeStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // Storage may be full or disabled; the page still works for the session.
  }
};

export const clearStorage = (key: string): void => localStorage.removeItem(PREFIX + key);
