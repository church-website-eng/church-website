"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
    } else {
      window.location.href = "/portal";
    }
  };

  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">
          Members Portal — Goshen Cathedral
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          Sign in to access your member dashboard
        </p>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-md px-4">
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
                  {error}
                </p>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <Button type="submit" variant="accent" size="lg" className="w-full">
                Sign In
              </Button>
            </form>

            {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && (
              <>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-card px-3 text-xs text-muted">or</span>
                  </div>
                </div>
                <Button
                  onClick={() => signIn("google", { callbackUrl: "/portal" })}
                  variant="outline"
                  className="w-full"
                >
                  Sign in with Google
                </Button>
              </>
            )}

            <p className="mt-4 text-center text-sm text-muted">
              Don&apos;t have an account?{" "}
              <Link
                href="/portal/register"
                className="text-accent hover:underline"
              >
                Create one
              </Link>
            </p>
          </Card>
        </div>
      </section>
    </>
  );
}
