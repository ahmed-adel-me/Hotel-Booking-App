import NextAuth from "next-auth";

// Extend the default Session and User types
declare module "next-auth" {
  interface Session {
    user: {
      guestId?: string;
    } & DefaultSession["user"];  // Extend without overriding default fields
  }
}
