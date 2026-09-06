import type { Metadata } from "next";
import { verifyPassword } from "./actions";

export const metadata: Metadata = {
  title: "Private",
  robots: { index: false, follow: false },
};

const ERROR_COPY: Record<string, string> = {
  wrong: "Wrong password - try again.",
  "not-configured":
    "Password isn't set up yet. Add SPIN_WHEEL_PASSWORD and SPIN_WHEEL_COOKIE_SECRET in your Vercel project's environment variables, then redeploy.",
};

export default async function SpinWheelLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center px-6">
      <form
        action={verifyPassword}
        className="w-full max-w-sm flex flex-col gap-4 bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-8"
      >
        <h1 className="text-lg font-bold text-center">Private page</h1>
        <p className="text-zinc-500 text-sm text-center">
          Enter the password to view this page.
        </p>
        {error && (
          <p className="text-red-400 text-xs text-center">
            {ERROR_COPY[error] ?? "Something went wrong - try again."}
          </p>
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoFocus
          required
          className="w-full rounded-lg bg-black border border-zinc-800 text-zinc-200 text-sm p-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/40"
        />
        <button
          type="submit"
          className="rounded-full bg-green-500 text-black font-bold text-sm py-3 hover:bg-green-400 transition-colors"
        >
          Enter
        </button>
      </form>
    </div>
  );
}
