import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function convertUnicode(input: string) {
  return input.replace(/\\+u([0-9a-fA-F]{4})/g, (a,b) =>
      String.fromCharCode(parseInt(b, 16)));
}
