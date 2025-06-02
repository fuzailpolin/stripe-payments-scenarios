import { CURRENCY_LOCALE } from "@/lib/config";

export function formatCurrency(
  amount: number,
  currency: "usd" | "eur" | "gbp" = "eur"
) {
  const locale = CURRENCY_LOCALE[currency];

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount); // assuming amount is in cents
}
