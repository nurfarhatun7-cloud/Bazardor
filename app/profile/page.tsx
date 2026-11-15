import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?login=required");

  const { user } = session;
  const initial = user.name.trim().charAt(0).toUpperCase() || "U";

  return (
    <div className="mx-auto max-w-xl space-y-4 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand text-2xl font-bold text-white">
            {initial}
          </span>
          <div>
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="break-all text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <SignOutButton className="rounded-lg border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50" />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="mb-3 font-bold">তথ্য</h2>
        <p className="text-sm font-medium">নাম</p>
        <p className="mt-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
          {user.name}
        </p>
        <Link
          href="/profile/update"
          className="btn mt-4 w-full border-none bg-brand text-white hover:bg-brand-dark"
        >
          আপডেট
        </Link>
      </div>
    </div>
  );
}
