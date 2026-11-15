import EmptyState from "@/components/EmptyState";

export default function NotFound() {
  return (
    <div className="px-4 py-16">
      <EmptyState
        title="পৃষ্ঠাটি খুঁজে পাওয়া যায়নি"
        message="আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি নেই বা সরিয়ে নেওয়া হয়েছে।"
      />
    </div>
  );
}
