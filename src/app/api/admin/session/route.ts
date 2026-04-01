import { NextResponse } from "next/server";
import { hasValidAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { token?: string };
    const token = body.token?.trim();

    if (!token) {
      return NextResponse.json({ ok: false, error: "Session token is required." }, { status: 401 });
    }

    const valid = await hasValidAdminSession(token);
    if (!valid) {
      return NextResponse.json({ ok: false, error: "Invalid session token." }, { status: 401 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request payload." }, { status: 400 });
  }
}
