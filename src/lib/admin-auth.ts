const DEFAULT_ADMIN_PASSWORD = "jasace2026";

export const ADMIN_SESSION_COOKIE = "jasace_admin";

function getStoredAdminSecret() {
  return process.env.ADMIN_PASSWORD?.trim() || DEFAULT_ADMIN_PASSWORD;
}

async function sha256(input: string) {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");
}

export async function isValidAdminPassword(password: string) {
  const stored = getStoredAdminSecret();
  if (stored.startsWith("sha256:")) {
    return (await sha256(password)) === stored.replace("sha256:", "");
  }

  return password === stored;
}

export async function getAdminSessionToken() {
  return sha256(`jasace-admin-session:${getStoredAdminSecret()}`);
}

export async function hasValidAdminSession(cookieValue?: string) {
  if (!cookieValue) return false;
  return cookieValue === (await getAdminSessionToken());
}
