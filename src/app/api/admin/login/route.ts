import { NextResponse } from "next/server";
import { getAdminSessionToken, isValidAdminPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: string };
    const password = body.password?.trim();

    if (!password) {
      return NextResponse.json({ ok: false, error: "Password is required." }, { status: 400 });
    }

    const valid = await isValidAdminPassword(password);
    if (!valid) {
      return NextResponse.json({ ok: false, error: "Invalid password." }, { status: 401 });
    }

    return NextResponse.json({
      ok: true,
      token: await getAdminSessionToken(),
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request payload." }, { status: 400 });
  }
}
