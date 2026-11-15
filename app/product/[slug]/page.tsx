import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import ChangeBadge from "@/components/ChangeBadge";
import { auth } from "@/lib/auth";
import { getProduct, getProducts } from "@/lib/api";
import { toBn, toBnPrice, unitLabel } from "@/lib/format";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?login=required");

  const products = await getProducts();
  const found = products.find((p) => p.slug === slug);
  if (!found) notFound();

  const product = await getProduct(found.id);

  const rows = product.markets.map((m) => ({ ...m, avg: (m.min + m.max) / 2 }));
  const minPrice = Math.min(...rows.map((m) => m.min));
  const maxPrice = Math.max(...rows.map((m) => m.max));
  const avgPrice = Math.round(
    rows.reduce((sum, m) => sum + m.avg, 0) / rows.length,
  );

  const diff = product.today - product.yesterday;
  const word = diff > 0 ? "বেড়েছে" : diff < 0 ? "কমেছে" : "অপরিবর্তিত আছে";
  const unit = unitLabel(product.unit);

  return (
    <div className="mx-auto max-w-4xl space-y-5 px-4 py-6">
      <nav className="text-sm text-gray-500">
        <Link href="/">হোম</Link> ›{" "}
        <Link href={`/category/${product.category}`}>
          {product.categoryNameBn}
        </Link>{" "}
        › <span className="text-gray-800">{product.nameBn}</span>
      </nav>

      <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 text-4xl">
            {product.image}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{product.nameBn}</h1>
            <p className="text-sm text-gray-500">
              প্রতি {unit} · {product.categoryNameBn}
            </p>
            <p className="mt-1 text-sm text-gray-700">
              গতকালের তুলনায় আজ দাম {word}
              {diff !== 0 && ` · ${toBn(Math.abs(diff))} টাকা`}
            </p>
            <Link
              href={`/category/${product.category}`}
              className="mt-2 inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs"
            >
              <span>{product.categoryIcon}</span>
              <span>{product.categoryNameBn}</span>
            </Link>
          </div>
        </div>

        <div className="rounded-xl bg-gray-100 px-6 py-4 text-center">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-3xl font-bold">{toBn(product.today)}</p>
          <p className="text-xs text-gray-500">টাকা / {unit}</p>
          <div className="mt-1">
            <ChangeBadge change={product.change} />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="mb-3 text-lg font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
            <p className="text-2xl font-bold text-brand">
              {toBn(minPrice)} <span className="text-sm">টাকা</span>
            </p>
            <p className="text-xs text-gray-500">সবচেয়ে কম দামের বাজার</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
            <p className="text-2xl font-bold text-amber-600">
              {toBn(maxPrice)} <span className="text-sm">টাকা</span>
            </p>
            <p className="text-xs text-gray-500">সবচেয়ে বেশি দামের বাজার</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">গড় দাম</p>
            <p className="text-2xl font-bold">
              {toBn(avgPrice)} <span className="text-sm">টাকা</span>
            </p>
            <p className="text-xs text-gray-500">প্রতি {unit}-এর হিসাবে</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="mb-3 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="px-3 py-2 font-medium">বাজার</th>
                <th className="px-3 py-2 font-medium">বিভাগ</th>
                <th className="px-3 py-2 text-right font-medium">সর্বনিম্ন</th>
                <th className="px-3 py-2 text-right font-medium">সর্বাধিক</th>
                <th className="px-3 py-2 text-right font-medium">গড়</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => (
                <tr key={m.market} className="even:bg-gray-50">
                  <td className="px-3 py-2 font-medium">{m.market}</td>
                  <td className="px-3 py-2 text-gray-600">{m.division}</td>
                  <td className="px-3 py-2 text-right">{toBn(m.min)} টাকা</td>
                  <td className="px-3 py-2 text-right">{toBn(m.max)} টাকা</td>
                  <td className="px-3 py-2 text-right font-bold">
                    {toBnPrice(m.avg)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
