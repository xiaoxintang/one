import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center bg-[#f5f7f9] px-4 py-10 text-[#172026]">
      <section className="w-full max-w-xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-[#0f766e]">Better Auth</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal">
            账号认证示例
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#586675]">
            Header 会根据当前 session 展示用户信息。
          </p>
        </div>

        <div className="rounded-lg border border-[#d9e0e7] bg-white p-6 shadow-sm">
          <p className="text-sm text-[#586675]">
            你可以用密码登录，也可以用邮箱验证码登录已有账号。
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="rounded-md bg-[#172026] px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-[#2d3740]"
            >
              登录
            </Link>
            <Link
              href="/register"
              className="rounded-md border border-[#cfd9e3] bg-white px-4 py-2 text-center text-sm font-medium text-[#172026] transition hover:border-[#0f766e] hover:text-[#0f766e]"
            >
              注册
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
