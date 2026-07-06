"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function verifyPassword(formData: FormData) {
  const password = formData.get("password");
  const correctPassword = process.env.SPIN_WHEEL_PASSWORD;
  const cookieSecret = process.env.SPIN_WHEEL_COOKIE_SECRET;

  if (!correctPassword || !cookieSecret) {
    redirect("/spin-wheel/login?error=not-configured");
  }

  if (password !== correctPassword) {
    redirect("/spin-wheel/login?error=wrong");
  }

  const cookieStore = await cookies();
  cookieStore.set("spin_wheel_access", cookieSecret, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 180, // 180 days
    path: "/",
  });

  redirect("/spin-wheel");
}
