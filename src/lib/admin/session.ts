export const ADMIN_SESSION_STORAGE_KEY = "jasace_admin_session";

export function getStoredAdminSession() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
}

export function setStoredAdminSession(token: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, token);
}

export function clearStoredAdminSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
}
