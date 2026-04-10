"use client";

import { cn } from "@/lib/utils";
import { ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { forwardRef, useState, type InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { className, label, error, type, showPasswordToggle, id, ...props },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    const inputType =
      showPasswordToggle && type === "password"
        ? showPassword
          ? "text"
          : "password"
        : type;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            type={inputType}
            ref={ref}
            className={cn(
              "w-full rounded-xl border bg-[#18181b] px-4 py-3 text-foreground placeholder:text-[#52525b] transition-all duration-200",
              "focus:border-primary focus:ring-[3px] focus:ring-primary/15 focus:outline-none",
              error ? "border-destructive" : "border-border",
              showPasswordToggle && "pr-12",
              className,
            )}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
          {showPasswordToggle && type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <HugeiconsIcon
                icon={showPassword ? ViewOffIcon : ViewIcon}
                size={20}
              />
            </button>
          )}
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-xs text-destructive"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

InputField.displayName = "InputField";
