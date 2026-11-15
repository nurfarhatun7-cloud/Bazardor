import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import UpdateForm from "@/components/UpdateForm";
import { auth } from "@/lib/auth";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?login=required");

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
      <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-6">
        <UpdateForm initialName={session.user.name} />
      </div>
      <p className="mt-4 text-center text-sm">
        <Link href="/profile" className="text-gray-500">
          ← প্রোফাইলে ফিরে যান
        </Link>
      </p>
    </div>
  );
}
