"use client";

import { authApi } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SignOutButtonProps {
  className?: string;
}

export function SignOutButton({ className }: SignOutButtonProps) {
  const router = useRouter();

  async function onSignOut() {
    await authApi.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <Button
      type="button"
      onClick={onSignOut}
      variant="outline"
      className={cn(className)}
    >
      Sign out
    </Button>
  );
}
