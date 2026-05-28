"use client";

import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

// Browser-side Better Auth client uses the default /api/auth base path.
export const authClient = createAuthClient({
  plugins: [emailOTPClient()],
});
