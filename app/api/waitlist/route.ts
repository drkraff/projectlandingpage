import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const email: unknown = body?.email

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
  }

  const { error } = await supabase
    .from("waitlist")
    .insert({ email: email.toLowerCase().trim() })

  if (error) {
    // Unique violation — already signed up
    if (error.code === "23505") {
      return NextResponse.json({ error: "You're already on the list!" }, { status: 409 })
    }
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
