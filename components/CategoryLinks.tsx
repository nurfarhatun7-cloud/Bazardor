"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

export default function CategoryLinks({
  categories,
}: {
  categories: Category[];
}) {
  const pathname = usePathname();

  return (
    <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-2">
      {categories.map((cat) => {
        const href = `/category/${cat.slug}`;
        const active = pathname === href;

        return (
          <Link
            key={cat.id}
            href={href}
            className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${
              active ? "bg-brand text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.nameBn}</span>
          </Link>
        );
      })}
    </nav>
  );
}
