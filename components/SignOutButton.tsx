"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton({
  className,
  onDone,
}: {
  className?: string;
  onDone?: () => void;
}) {
  const router = useRouter();

  async function handleSignOut() {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error(error.message || "সাইন আউট করা যায়নি");
      return;
    }
    onDone?.();
    toast.success("সাইন আউট সফল হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <button type="button" onClick={handleSignOut} className={className}>
      ↩ সাইন আউট
    </button>
  );
}
