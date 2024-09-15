import NextAuth, { DefaultSession } from "next-auth";  // Import DefaultSession to access its default user fields

// Extend the default Session and User types
declare module "next-auth" {
  interface Session {
    user: {
      guestId?: number;  // Add guestId as an optional field
    } & DefaultSession["user"];  // Merge with the default user fields in NextAuth
  }
}
