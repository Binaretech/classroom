import { Request } from 'express';

// types.d.ts
declare global {
  interface UserJwtPayload {
    id: string;
  }

  type AuthRequest = Request & { user: UserJwtPayload };
}

export {};
