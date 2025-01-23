"use client";

import { signup } from "../login/actions";
import { SignUpForm } from "@/components/signup-form";
export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <SignUpForm message={searchParams.message} signup={signup} />
    </div>
  );
}
