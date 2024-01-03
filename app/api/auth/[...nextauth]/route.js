import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = { name: credentials?.name, email: credentials?.email };

        if (user) {
          const token = jwt.sign(user, process.env.NEXTAUTH_SECRET, {
            expiresIn: "1h",
          });

          return Promise.resolve({ ...user, token });
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  session: {
    jwt: true,
  },
});

export { handler as GET, handler as POST };
