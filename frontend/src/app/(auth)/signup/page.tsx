import { SignupForm } from "@/components/auth/SignupForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Kuma Station",
  description: "Create your Kuma Station account",
};

export default function SignupPage() {
  return <SignupForm />;
}
