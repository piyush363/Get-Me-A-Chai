import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import User from "@/app/models/User";
import connectDb from "@/app/db/connectDb";

// NextAuth v5 destructures methods directly from the initialization block
export const { handlers, auth } = NextAuth({
  trustHost: true,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const allowedProviders = [
        "github",
        "google",
        "facebook",
        "apple",
        "email",
      ];

      if (allowedProviders.includes(account.provider)) {
        await connectDb();

        // 1. Check if user already exists in the database
        const currentUser = await User.findOne({ email: user.email });

        if (!currentUser) {
          // Fix: Extracting the first element [0] ensures a clean string username
          const baseUsername = user.email.split("@")[0];

          const newUser = new User({
            email: user.email,
            username: baseUsername,
            name: user.name || baseUsername,
            image: user.image || "",
          });

          await newUser.save();
        }

        return true;
      }
      return false;
    },

    async session({ session, token }) {
      await connectDb(); // Ensure the database is connected

      if (session?.user?.email) {
        const dbUser = await User.findOne({ email: session.user.email });

        if (dbUser) {
          // Map the database username directly to session.user.username
          session.user.username = dbUser.username;
        }
      }

      return session;
    },
  },
});

// Correct way to export Route Handlers in NextAuth v5
export const { GET, POST } = handlers;
