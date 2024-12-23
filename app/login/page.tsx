"use client";

import { LoginForm } from "@/components/login-form";
import { login, signup } from "./actions";
export default function Login() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm login={login} signup={signup} />
    </div>
  );
}
