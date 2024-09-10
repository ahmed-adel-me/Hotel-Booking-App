import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [Google],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        if (!user.email) throw new Error();
        const existingGuest = await getGuest(user.email);
        if (!existingGuest)
          await createGuest({
            email: user.email,
            fullName: user.name as string | undefined,
          });
        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);

      session.user.guestId = guest?.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
