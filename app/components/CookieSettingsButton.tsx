"use client";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("runcheck:cookie-settings"))}
      className="hover:text-white transition-colors"
    >
      Cookie Settings
    </button>
  );
}
