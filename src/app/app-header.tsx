import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { SignOutButton } from "./sign-out-button";

export async function AppHeader() {
  const session = await auth.api.getSession({
    // Pass request headers so Better Auth can read the current session cookie.
    headers: await headers(),
  });

  return (
    <header className="border-b border-[#d9e0e7] bg-white text-[#172026]">
      <div className="mx-auto flex min-h-16 w-full max-w-5xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-base font-semibold">
          all in one
        </Link>

        {session ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {session.user.name || "已登录用户"}
              </p>
              <p className="truncate text-xs text-[#586675]">
                {session.user.email}
              </p>
            </div>
            <SignOutButton />
          </div>
        ) : (
          <nav className="flex items-center gap-3" aria-label="认证导航">
            <Link
              href="/login"
              className="rounded-md border border-[#cfd9e3] bg-white px-4 py-2 text-sm font-medium text-[#172026] transition hover:border-[#0f766e] hover:text-[#0f766e]"
            >
              登录
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-[#172026] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2d3740]"
            >
              注册
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
