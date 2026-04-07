export interface WorkInjuryResult {
  type: string;
  compensations: {
    item: string;
    amount: number;
    note: string;
  }[];
  totalEstimate: number;
}

/**
 * 職災給付概算
 * 勞基法第 59 條 + 勞工職業災害保險及保護法
 */
export function calculateWorkInjury(
  monthlySalary: number,
  insuredSalary: number,
  injuryType: "medical" | "disability" | "death" | "wage-loss",
  lostDays: number = 0,
  disabilityLevel: number = 0
): WorkInjuryResult {
  const compensations: WorkInjuryResult["compensations"] = [];

  switch (injuryType) {
    case "wage-loss": {
      // 不能工作期間的工資補償
      const dailyWage = monthlySalary / 30;
      const wageCompensation = Math.round(dailyWage * lostDays);
      compensations.push({
        item: "原領工資補償",
        amount: wageCompensation,
        note: `月薪 ÷ 30 × ${lostDays} 天（雇主應補償不能工作期間之原領工資）`,
      });
      // 勞保職災傷病給付
      const insuranceBenefit = Math.round((insuredSalary / 30) * 0.7 * lostDays);
      compensations.push({
        item: "勞保職災傷病給付（參考）",
        amount: insuranceBenefit,
        note: `投保薪資日額 × 70% × ${lostDays} 天（前 2 個月，雇主可抵充）`,
      });
      break;
    }
    case "disability": {
      // 失能給付（依等級）
      const monthsMap: Record<number, number> = {
        1: 1800, 2: 1500, 3: 1260, 4: 1110, 5: 960,
        6: 720, 7: 540, 8: 420, 9: 330, 10: 240,
        11: 180, 12: 140, 13: 100, 14: 70, 15: 45,
      };
      const months = monthsMap[disabilityLevel] || 0;
      const disabilityBenefit = Math.round((insuredSalary / 30) * months);
      compensations.push({
        item: `勞保失能給付（${disabilityLevel} 等級）`,
        amount: disabilityBenefit,
        note: `投保薪資日額 × ${months} 日`,
      });
      break;
    }
    case "death": {
      // 死亡給付
      compensations.push({
        item: "喪葬費（雇主）",
        amount: monthlySalary * 5,
        note: "5 個月平均工資",
      });
      compensations.push({
        item: "死亡補償（雇主）",
        amount: monthlySalary * 40,
        note: "40 個月平均工資",
      });
      compensations.push({
        item: "勞保遺屬年金（月領參考）",
        amount: Math.round(insuredSalary * 0.5),
        note: "投保薪資 × 50%（按月發給）",
      });
      break;
    }
    case "medical":
    default: {
      compensations.push({
        item: "醫療費用",
        amount: 0,
        note: "雇主應負擔必要之醫療費用（依實際支出）",
      });
      break;
    }
  }

  const totalEstimate = compensations.reduce((sum, c) => sum + c.amount, 0);

  return {
    type: injuryType,
    compensations,
    totalEstimate,
  };
}
