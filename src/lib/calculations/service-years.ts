/**
 * 計算年資（精確到月）
 * 避免浮點數誤差，使用月份計算
 */
export function calculateServiceYears(startDate: Date, endDate: Date = new Date()): {
  years: number;
  months: number;
  totalMonths: number;
  label: string;
} {
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  if (endDate.getDate() < startDate.getDate()) {
    months--;
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  const totalMonths = years * 12 + months;
  let label: string;
  if (years === 0) {
    label = `${months} 個月`;
  } else if (months === 0) {
    label = `${years} 年`;
  } else {
    label = `${years} 年 ${months} 個月`;
  }
  return { years, months, totalMonths, label };
}
