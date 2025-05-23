import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GithubIcon } from "lucide-react";
import { signInWithGithub } from "@/app/login/actions";

export function LoginForm({
  message,
  login,
  signup,
}: {
  message: string;
  signup: (formData: FormData) => void;
  login: (formData: FormData) => void;
}) {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@doe.com"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" name="password" type="password" />
            </div>
            {message && <p className="text-red-500">{message}</p>}
            <Button type="submit" className="w-full" formAction={login}>
              Login
            </Button>
            <Button type="submit" className="w-full" formAction={signup}>
              Signup
            </Button>
            <Button
              variant="outline"
              className="w-full"
              formAction={signInWithGithub}
            >
              <GithubIcon className="w-4 h-4 mr-2" />
              Login with Github
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up here
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
