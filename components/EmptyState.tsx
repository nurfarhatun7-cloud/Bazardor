import Link from "next/link";

export default function EmptyState({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center">
      <p className="text-5xl font-bold text-brand">৪০৪</p>
      <h2 className="mt-3 text-xl font-bold">{title}</h2>
      <p className="mt-2 text-gray-600">{message}</p>
      <Link
        href="/"
        className="btn mt-5 border-none bg-brand text-white hover:bg-brand-dark"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
