"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import Link from "next/link";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    setIsLoading(true);
    // TODO: Implement actual password reset logic
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <svg
            className="h-8 w-8 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Check your email
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We&apos;ve sent a password reset link to{" "}
            <span className="text-foreground">{email}</span>
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive the email?{" "}
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="text-primary hover:underline font-medium"
          >
            Try again
          </button>
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Reset your password
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your email and we&apos;ll send a reset link.
        </p>
      </div>

      <InputField
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
        autoComplete="email"
      />

      <Button
        type="submit"
        disabled={isLoading}
        className="h-12 w-full rounded-full bg-primary text-base font-semibold text-background hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(249,115,22,0.35)]"
      >
        {isLoading ? "Sending..." : "Send Reset Link"}
      </Button>

      <Link
        href="/login"
        className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
        Back to sign in
      </Link>
    </form>
  );
}
