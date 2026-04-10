import { createAuthClient } from "better-auth/react";
import type { EmailSignInInput, EmailSignUpInput } from "@/types/auth";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export const authClient = createAuthClient({
  baseURL,
});

export const authApi = {
  signInWithEmail(input: EmailSignInInput) {
    return authClient.signIn.email(input);
  },
  signUpWithEmail(input: EmailSignUpInput) {
    return authClient.signUp.email(input);
  },
  signOut() {
    return authClient.signOut();
  },
  useSession: authClient.useSession,
};
