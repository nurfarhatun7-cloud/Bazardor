import Link from "next/link";
import ChangeBadge from "./ChangeBadge";
import { toBn, unitLabel } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 text-2xl">
          {product.image}
        </div>
        <div>
          <h3 className="font-semibold leading-tight">{product.nameBn}</h3>
          <p className="text-xs text-gray-500">প্রতি {unitLabel(product.unit)}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-lg font-bold">{toBn(product.today)} টাকা</p>
        </div>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}
