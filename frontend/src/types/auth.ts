export type AuthErrorMessage = string;

export interface AuthSessionUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSessionData {
  id: string;
  userId: string;
  expiresAt: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export interface ServerSession {
  user: AuthSessionUser;
  session: AuthSessionData;
}

export interface EmailSignInInput {
  email: string;
  password: string;
}

export interface EmailSignUpInput {
  name: string;
  email: string;
  password: string;
}
