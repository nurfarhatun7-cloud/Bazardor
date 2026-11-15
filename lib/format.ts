export function toBn(value: number): string {
  return Number(value).toLocaleString("bn-BD");
}

export function toBnPrice(value: number): string {
  if (Number.isInteger(value)) return toBn(value);
  return value.toLocaleString("bn-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function unitLabel(unit: string): string {
  const units: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };
  return units[unit] || unit;
}

export function banglaDate(): string {
  return new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });
}
