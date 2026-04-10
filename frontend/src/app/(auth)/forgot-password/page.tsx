import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | Kuma Station",
  description: "Reset your Kuma Station password",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
