"use client";

import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SocialButtons() {
  async function social(provider: "google" | "github") {
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
    if (error) toast.error(error.message || "লগইন করা যায়নি");
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => social("google")}
        className="btn btn-sm border-gray-300 bg-white"
      >
        Google দিয়ে চালিয়ে যান
      </button>
      <button
        type="button"
        onClick={() => social("github")}
        className="btn btn-sm border-gray-300 bg-white"
      >
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}
