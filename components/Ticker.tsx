import { toBn, unitLabel } from "@/lib/format";
import type { Change, Product } from "@/lib/types";

function ChangeText({ change }: { change: Change }) {
  if (change.dir === "up") {
    return <span className="text-red-600">▲ {toBn(change.pct)}%</span>;
  }
  if (change.dir === "down") {
    return (
      <span className="text-green-600">▼ {toBn(Math.abs(change.pct))}%</span>
    );
  }
  return <span className="text-gray-500">— ০.০%</span>;
}

export default function Ticker({ products }: { products: Product[] }) {
  const items = [...products, ...products];

  return (
    <div className="overflow-hidden border-t border-gray-200 bg-white py-2">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap text-sm">
        {items.map((p, index) => (
          <span key={index} className="flex items-center gap-1">
            <span>{p.image}</span>
            <span className="font-medium">{p.nameBn}</span>
            <span className="text-gray-600">
              {toBn(p.today)} টাকা/{unitLabel(p.unit)}
            </span>
            <ChangeText change={p.change} />
          </span>
        ))}
      </div>
    </div>
  );
}
