"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    // Use Better Auth registration so the created account matches the auth schema.
    const result = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "/",
    });

    setIsSubmitting(false);

    if (result.error) {
      setError(result.error.message || "注册失败，请稍后再试。");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <main className="flex flex-1 items-center justify-center bg-[#f5f7f9] px-4 py-10 text-[#172026]">
      <section className="w-full max-w-sm">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm font-medium text-[#586675] transition hover:text-[#172026]"
          >
            返回首页
          </Link>
          <h1 className="mt-6 text-3xl font-semibold tracking-normal">注册</h1>
          <p className="mt-2 text-sm leading-6 text-[#586675]">
            创建一个邮箱密码账号，注册后会直接进入首页。
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-[#d9e0e7] bg-white p-6 shadow-sm"
        >
          <label className="block text-sm font-medium" htmlFor="name">
            昵称
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="mt-2 w-full rounded-md border border-[#cfd9e3] px-3 py-2 text-sm outline-none transition focus:border-[#0f766e]"
          />

          <label className="mt-5 block text-sm font-medium" htmlFor="email">
            邮箱
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-2 w-full rounded-md border border-[#cfd9e3] px-3 py-2 text-sm outline-none transition focus:border-[#0f766e]"
          />

          <label className="mt-5 block text-sm font-medium" htmlFor="password">
            密码
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            className="mt-2 w-full rounded-md border border-[#cfd9e3] px-3 py-2 text-sm outline-none transition focus:border-[#0f766e]"
          />

          {error ? (
            <p className="mt-4 rounded-md bg-[#fff0ed] px-3 py-2 text-sm text-[#9f2f1f]">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-md bg-[#172026] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2d3740] disabled:cursor-not-allowed disabled:bg-[#7b8794]"
          >
            {isSubmitting ? "注册中..." : "注册"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-[#586675]">
          已有账号？{" "}
          <Link href="/login" className="font-medium text-[#0f766e]">
            去登录
          </Link>
        </p>
      </section>
    </main>
  );
}
