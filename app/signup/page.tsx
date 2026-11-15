"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

const inputClass =
  "mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name")).trim();
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));
    const confirm = String(form.get("confirm"));

    if (!name || !email || !password) {
      toast.error("সব ঘর পূরণ করুন");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    if (password !== confirm) {
      toast.error("দুটি পাসওয়ার্ড মেলেনি");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "সাইন আপ করা যায়নি");
      return;
    }
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।");
    router.push("/signin");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-center text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="mt-1 text-center text-sm text-gray-500">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium">
            নাম
            <input name="name" placeholder="যেমন: রহিম উদ্দিন" className={inputClass} />
          </label>
          <label className="block text-sm font-medium">
            ইমেইল
            <input name="email" type="email" placeholder="you@example.com" className={inputClass} />
          </label>
          <label className="block text-sm font-medium">
            পাসওয়ার্ড
            <input name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" className={inputClass} />
          </label>
          <label className="block text-sm font-medium">
            পাসওয়ার্ড নিশ্চিত করুন
            <input name="confirm" type="password" placeholder="আবার লিখুন" className={inputClass} />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="btn w-full border-none bg-brand text-white hover:bg-brand-dark"
          >
            {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <div className="my-4 text-center text-xs text-gray-400">অথবা</div>
        <SocialButtons />

        <p className="mt-4 text-center text-sm text-gray-600">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-medium text-brand">
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <p className="mt-4 text-center text-sm">
        <Link href="/" className="text-gray-500">← হোম পেজে ফিরে যান</Link>
      </p>
    </div>
  );
}
