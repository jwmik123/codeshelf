import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);

  const cookieStore = cookies();

  const { email, password } = await req.json();

  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const response = await supabase.auth.signUp({
    email,
    password,
  });

  if (response.error) {
    return NextResponse.json(
      { error: response.error.message },
      { status: 400 }
    );
  }

  return NextResponse.redirect(url.origin, {
    status: 301,
  });
}
