export default function Skeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <div className="skeleton h-28 w-full rounded-2xl" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="skeleton h-28 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
