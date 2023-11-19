import { Request } from 'express';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

// types.d.ts
declare global {
  type AuthRequest = Request & { user: DecodedIdToken };
}

export {};
