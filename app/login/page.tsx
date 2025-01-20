"use client";

import { LoginForm } from "@/components/login-form";
import { login, signup } from "./actions";
export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm login={login} signup={signup} message={searchParams.message} />
    </div>
  );
}
