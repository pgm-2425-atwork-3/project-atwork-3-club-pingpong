import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credentials received in authorize:", credentials); // Log credentials

        if (!credentials) return null;

        const { email, password } = credentials;
        try {
          const payload = {
            identifier: email,
            password,
          };
          console.log("Request Payload:", payload);

          const response = await fetch(`${strapiUrl}/api/auth/local`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              identifier: email,
              password,
            }),
          });

          const data = await response.json();
          console.log("Response Data:", data); // Log the full response

          if (!response.ok) {
            console.error("Failed to login. Response status:", response.status);
            console.error("Error message from Strapi:", data.error?.message);
            return null;
          }

          const user = data.user;

          if (user) {
            const roleResponse = await fetch(
              `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${user.id}?populate=role`
            );
            const roleData = await roleResponse.json();

            console.log("Fetched Role Data:", roleData);

            const userRole = roleData.role?.type;
            console.log("Assigned User Role:", userRole);

            return {
              id: user.id,
              name: user.username,
              email: user.email,
              role: userRole,
              accessToken: data.jwt,
            };
          }
        } catch (error) {
          console.error("Error authenticating with Strapi:", error);
          return null;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Ensure the role is correctly set
        token.accessToken = user.accessToken; // Save access token here
        token = { ...token, ...user }; // Merge the user object with the token
      }
      console.log("JWT Callback - Token Role:", token.role); // Log the token role to ensure it's set properly
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.accessToken = token.accessToken;
        session = { ...session, ...token }; // Merge the session object with the token
        return session;
      }
      console.log("Session Callback - Session Role:", session.user.role); // Log session role to verify
      return session;
    },
  },
};

export default NextAuth(authOptions);
