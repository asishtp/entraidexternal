// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    // Entra ID puts the subject in `sub` (already on JWT), you can add extras if you want:
    oid?: string
    tid?: string
    roles?: string[]
  }
}
