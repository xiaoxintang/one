"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";

type LoginMode = "password" | "otp";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<LoginMode>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    setIsSubmitting(true);

    // Use the selected Better Auth login method and refresh server components after cookies update.
    const result =
      mode === "password"
        ? await authClient.signIn.email({
            email,
            password,
            callbackURL: "/",
          })
        : await authClient.signIn.emailOtp({
            email,
            otp,
          });

    setIsSubmitting(false);

    if (result.error) {
      setError(result.error.message || "登录失败，请检查登录信息。");
      return;
    }

    router.push("/");
    router.refresh();
  }

  async function handleSendOtp() {
    setError("");
    setNotice("");

    if (!email) {
      setError("请先输入邮箱。");
      return;
    }

    setIsSendingOtp(true);

    // Ask Better Auth to generate a sign-in OTP; the development sender logs it on the server.
    const result = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    });

    setIsSendingOtp(false);

    if (result.error) {
      setError(result.error.message || "验证码发送失败，请稍后再试。");
      return;
    }

    setNotice("如果账号存在，验证码已生成；开发环境请在终端日志查看。");
  }

  function handleModeChange(nextMode: LoginMode) {
    setMode(nextMode);
    setError("");
    setNotice("");
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
          <h1 className="mt-6 text-3xl font-semibold tracking-normal">登录</h1>
          <p className="mt-2 text-sm leading-6 text-[#586675]">
            选择密码或邮箱验证码进入你的账号。
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-[#d9e0e7] bg-white p-6 shadow-sm"
        >
          <div className="mb-6 grid grid-cols-2 rounded-md border border-[#cfd9e3] bg-[#eef3f7] p-1">
            <button
              type="button"
              aria-pressed={mode === "password"}
              onClick={() => handleModeChange("password")}
              className={`rounded px-3 py-2 text-sm font-medium transition ${
                mode === "password"
                  ? "bg-white text-[#172026] shadow-sm"
                  : "text-[#586675] hover:text-[#172026]"
              }`}
            >
              密码
            </button>
            <button
              type="button"
              aria-pressed={mode === "otp"}
              onClick={() => handleModeChange("otp")}
              className={`rounded px-3 py-2 text-sm font-medium transition ${
                mode === "otp"
                  ? "bg-white text-[#172026] shadow-sm"
                  : "text-[#586675] hover:text-[#172026]"
              }`}
            >
              验证码
            </button>
          </div>

          <label className="block text-sm font-medium" htmlFor="email">
            邮箱
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="mt-2 w-full rounded-md border border-[#cfd9e3] px-3 py-2 text-sm outline-none transition focus:border-[#0f766e]"
          />

          {mode === "password" ? (
            <>
              <label
                className="mt-5 block text-sm font-medium"
                htmlFor="password"
              >
                密码
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="mt-2 w-full rounded-md border border-[#cfd9e3] px-3 py-2 text-sm outline-none transition focus:border-[#0f766e]"
              />
            </>
          ) : (
            <>
              <div className="mt-5 flex items-end gap-3">
                <div className="min-w-0 flex-1">
                  <label className="block text-sm font-medium" htmlFor="otp">
                    验证码
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)}
                    required
                    className="mt-2 w-full rounded-md border border-[#cfd9e3] px-3 py-2 text-sm outline-none transition focus:border-[#0f766e]"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={isSendingOtp || isSubmitting}
                  className="shrink-0 rounded-md border border-[#cfd9e3] bg-white px-3 py-2 text-sm font-medium text-[#172026] transition hover:border-[#0f766e] hover:text-[#0f766e] disabled:cursor-not-allowed disabled:text-[#7b8794]"
                >
                  {isSendingOtp ? "发送中..." : "发送"}
                </button>
              </div>
            </>
          )}

          {error ? (
            <p className="mt-4 rounded-md bg-[#fff0ed] px-3 py-2 text-sm text-[#9f2f1f]">
              {error}
            </p>
          ) : null}

          {notice ? (
            <p className="mt-4 rounded-md bg-[#eef8f5] px-3 py-2 text-sm text-[#0f766e]">
              {notice}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-md bg-[#172026] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2d3740] disabled:cursor-not-allowed disabled:bg-[#7b8794]"
          >
            {isSubmitting ? "登录中..." : "登录"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-[#586675]">
          还没有账号？{" "}
          <Link href="/register" className="font-medium text-[#0f766e]">
            去注册
          </Link>
        </p>
      </section>
    </main>
  );
}
