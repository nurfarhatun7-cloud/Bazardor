import Link from "next/link";
import Image from "next/image";
import { getCategories, getProducts } from "@/lib/api";
import { banglaDate } from "@/lib/format";
import CategoryLinks from "./CategoryLinks";
import Ticker from "./Ticker";

export default async function Navbar() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <header className="bg-white shadow-sm">
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
          <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
            সাইন ইন
          </Link>
          <Link
            href="/signup"
            className="btn btn-sm sm:btn-md border-none bg-brand text-white hover:bg-brand-dark"
          >
            সাইন আপ
          </Link>
        </div>
      </div>

      <CategoryLinks categories={categories} />
      <Ticker products={products} />
    </header>
  );
}
