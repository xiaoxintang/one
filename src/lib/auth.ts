import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins/email-otp";
import { prisma } from "./prisma";

export const auth = betterAuth({
  // Store Better Auth core data through the shared Prisma client.
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    emailOTP({
      disableSignUp: true,
      // TODO: Replace this development logger with a real email provider.
      async sendVerificationOTP({ email, otp, type }) {
        console.log(`[email-otp:${type}] ${email} -> ${otp}`);
      },
    }),
    nextCookies(),
  ],
});
