"use client";

import { useState } from "react";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

export default function UserMenu({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const [open, setOpen] = useState(false);
  const initial = name.trim().charAt(0).toUpperCase() || "U";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-gray-100"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
          {initial}
        </span>
        <span className="hidden text-sm font-medium sm:inline">{name}</span>
        <span className="text-xs text-gray-500">▾</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-60 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
            <p className="font-semibold">{name}</p>
            <p className="mb-2 break-all text-xs text-gray-500">{email}</p>
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-2 py-2 text-sm hover:bg-gray-100"
            >
              👤 আমার প্রোফাইল
            </Link>
            <SignOutButton
              onDone={() => setOpen(false)}
              className="w-full rounded-lg px-2 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            />
          </div>
        </>
      )}
    </div>
  );
}
