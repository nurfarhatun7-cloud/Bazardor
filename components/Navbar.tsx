import { Suspense } from "react";
import { headers } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { getCategories, getProducts } from "@/lib/api";
import { banglaDate } from "@/lib/format";
import CategoryLinks from "./CategoryLinks";
import RedirectToast from "./RedirectToast";
import Ticker from "./Ticker";
import UserMenu from "./UserMenu";

export default async function Navbar() {
  const [categories, products, session] = await Promise.all([
    getCategories(),
    getProducts(),
    auth.api.getSession({ headers: await headers() }),
  ]);

  return (
    <header className="bg-white shadow-sm">
      <Suspense fallback={null}>
        <RedirectToast />
      </Suspense>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-icon.png"
            alt="বাজার দর"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span>
            <span className="block text-lg font-bold leading-tight">
              বাজার দর
            </span>
            <span className="block text-xs text-gray-500">{banglaDate()}</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {session ? (
            <UserMenu name={session.user.name} email={session.user.email} />
          ) : (
            <>
              <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="btn btn-sm sm:btn-md border-none bg-brand text-white hover:bg-brand-dark"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <CategoryLinks categories={categories} />
      <Ticker products={products} />
    </header>
  );
}
