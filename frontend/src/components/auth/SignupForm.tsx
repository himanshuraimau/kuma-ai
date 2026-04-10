"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    if (!fullName) newErrors.fullName = "Full name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!agreedToTerms) newErrors.terms = "You must agree to the terms";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    // TODO: Implement actual signup logic
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Start thinking deeper with Kuma
        </p>
      </div>

      <div className="space-y-4">
        <InputField
          label="Full Name"
          type="text"
          placeholder="John Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={errors.fullName}
          autoComplete="name"
        />

        <InputField
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
        />

        <div>
          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            showPasswordToggle
            autoComplete="new-password"
          />
          {/* Password strength meter */}
          {password && (
            <div className="mt-2 flex gap-1">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors",
                    passwordStrength >= level
                      ? passwordStrength === 4
                        ? "bg-green-500"
                        : passwordStrength >= 3
                          ? "bg-primary"
                          : passwordStrength >= 2
                            ? "bg-amber-500"
                            : "bg-red-500"
                      : "bg-border",
                  )}
                />
              ))}
            </div>
          )}
        </div>

        <InputField
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          showPasswordToggle
          autoComplete="new-password"
        />
      </div>

      {/* Terms checkbox */}
      <div className="flex items-start gap-3">
        <div className="relative flex h-5 w-5 items-center">
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-border bg-card transition-colors checked:border-primary checked:bg-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <svg
            className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-background opacity-0 peer-checked:opacity-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <label
          htmlFor="terms"
          className="text-sm text-muted-foreground cursor-pointer"
        >
          I agree to the{" "}
          <Link href="#" className="text-primary hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </label>
      </div>
      {errors.terms && (
        <p className="text-xs text-destructive">{errors.terms}</p>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="h-12 w-full rounded-full bg-primary text-base font-semibold text-background hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(249,115,22,0.35)]"
      >
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>

      {/* Sign in link */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary hover:underline font-medium"
        >
          Sign in →
        </Link>
      </p>
    </form>
  );
}
