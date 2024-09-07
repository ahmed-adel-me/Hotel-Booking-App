import NextAuth from "next-auth";

// Extend the default Session and User types
declare module "next-auth" {
  interface Session {
    user: {
      guestId?: string;
      email: string;
      // Include any other fields you might use
    };
  }
}