"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

const inputClass =
  "mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));

    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড লিখুন");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "সাইন ইন করা যায়নি");
      return;
    }
    toast.success("সাইন ইন সফল হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-center text-2xl font-bold">সাইন ইন</h1>
      <p className="mt-1 text-center text-sm text-gray-500">
        আপনার অ্যাকাউন্টে প্রবেশ করুন।
      </p>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium">
            ইমেইল
            <input name="email" type="email" placeholder="you@example.com" className={inputClass} />
          </label>
          <label className="block text-sm font-medium">
            পাসওয়ার্ড
            <input name="password" type="password" placeholder="আপনার পাসওয়ার্ড" className={inputClass} />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="btn w-full border-none bg-brand text-white hover:bg-brand-dark"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>
        </form>

        <div className="my-4 text-center text-xs text-gray-400">অথবা</div>
        <SocialButtons />

        <p className="mt-4 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-medium text-brand">
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <p className="mt-4 text-center text-sm">
        <Link href="/" className="text-gray-500">← হোম পেজে ফিরে যান</Link>
      </p>
    </div>
  );
}
