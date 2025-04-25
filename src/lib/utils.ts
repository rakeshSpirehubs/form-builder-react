import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function findField(selectedFields: any, serialNumber: string) {
  const findField = selectedFields.find(
    (item: any) => item.serialNumber === serialNumber
  );
  return findField || {};
}
