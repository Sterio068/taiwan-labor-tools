/** 金額格式化（加千分位） */
export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("zh-TW", {
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

/** 金額格式化（含小數） */
export function formatMoneyDecimal(amount: number, digits = 2): string {
  return new Intl.NumberFormat("zh-TW", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount);
}

/** 顯示 NT$ 金額 */
export function formatNTD(amount: number): string {
  return `NT$ ${formatMoney(amount)}`;
}
