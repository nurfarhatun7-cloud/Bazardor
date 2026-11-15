import { toBn } from "@/lib/format";
import type { Change } from "@/lib/types";

export default function ChangeBadge({ change }: { change: Change }) {
  const base = "rounded-full px-2 py-0.5 text-xs font-medium";

  if (change.dir === "up") {
    return (
      <span className={`${base} bg-red-50 text-red-600`}>
        ▲ {toBn(Math.abs(change.pct))}%
      </span>
    );
  }
  if (change.dir === "down") {
    return (
      <span className={`${base} bg-green-50 text-green-600`}>
        ▼ {toBn(Math.abs(change.pct))}%
      </span>
    );
  }
  return <span className={`${base} bg-gray-100 text-gray-500`}>— ০.০%</span>;
}
