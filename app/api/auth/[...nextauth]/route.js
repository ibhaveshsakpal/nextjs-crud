import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = { name: credentials?.name, email: credentials?.email };

        if (user) {
          return Promise.resolve({ ...user });
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 3,
  },
});

export { handler as GET, handler as POST };
