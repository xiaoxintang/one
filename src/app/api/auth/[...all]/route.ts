import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

// Expose Better Auth endpoints under /api/auth/* for the Next.js app router.
export const { GET, POST, PATCH, PUT, DELETE } = toNextJsHandler(auth);
