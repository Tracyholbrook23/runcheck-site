"use client";

import { useState } from "react";

/* Email signup for Android users. The app is iPhone only for now. */
export function AndroidSignup() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "android" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Something went wrong. Please try again.");
      setState("done");
      if (window.gtag) window.gtag("event", "android_signup", { page_path: window.location.pathname });
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (state === "done") {
    return <p className="rc-android-done">You&apos;re on the list. We&apos;ll email you when RunCheck comes to Android.</p>;
  }

  return (
    <form className="rc-android" onSubmit={submit}>
      <label htmlFor="android-email">
        <strong>On Android?</strong> Get an email when RunCheck comes to Android.
      </label>
      <div className="rc-android-row">
        <input id="android-email" type="email" required placeholder="Your email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit" disabled={state === "sending"}>{state === "sending" ? "Adding..." : "Notify me"}</button>
      </div>
      {state === "error" && <p className="rc-android-error" role="alert">{message}</p>}
    </form>
  );
}
