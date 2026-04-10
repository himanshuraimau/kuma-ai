import { LoginForm } from "@/components/auth/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Kuma Station",
  description: "Sign in to your Kuma Station account",
};

export default function LoginPage() {
  return <LoginForm />;
}
