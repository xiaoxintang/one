"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSignOut() {
    setIsSubmitting(true);

    // Let Better Auth clear the browser session cookie, then refresh the server view.
    await authClient.signOut();
    router.refresh();
    setIsSubmitting(false);
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isSubmitting}
      className="rounded-md border border-[#cfd9e3] bg-white px-4 py-2 text-sm font-medium text-[#172026] transition hover:border-[#0f766e] hover:text-[#0f766e] disabled:cursor-not-allowed disabled:text-[#7b8794]"
    >
      {isSubmitting ? "退出中..." : "退出登录"}
    </button>
  );
}
