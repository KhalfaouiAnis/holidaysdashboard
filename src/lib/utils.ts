import { AxiosError, isAxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (str: string): string => {
  if (typeof str !== "string" || !str.trim()) return "?";

  return (
    str
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "?"
  );
};

export function formatCurrency(
  amount: number,
  opts?: {
    currency?: string;
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    noDecimals?: boolean;
  },
) {
  const { currency = "USD", locale = "en-US", minimumFractionDigits, maximumFractionDigits, noDecimals } = opts ?? {};

  const formatOptions: Intl.NumberFormatOptions = {
    style: "currency",
    currency,
    minimumFractionDigits: noDecimals ? 0 : minimumFractionDigits,
    maximumFractionDigits: noDecimals ? 0 : maximumFractionDigits,
  };

  return new Intl.NumberFormat(locale, formatOptions).format(amount);
}

export function handleClientError(error: unknown) {
  const err = error as Error | AxiosError;
  if (isAxiosError(err)) {
    const message = err?.response?.data?.message ? err?.response?.data?.message : err?.response?.data;
    toast.error(message);
  } else {
    toast.error(err.message);
    console.debug(err);
  }
}

export function handleServerError(error: unknown) {
  if (isAxiosError(error)) {
    const message = error.response?.data?.message || error.message;
    const status = error.response?.status || 500;

    const err = new Error(message);
    (err as any).status = status;
    throw err;
  }
}
