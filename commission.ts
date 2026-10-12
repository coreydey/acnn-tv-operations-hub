export type CommissionInput = {
  collectedRevenue: number;
  approvedDirectCosts: number;
  ratePercent?: number;
};

export function calculateNetCommission({
  collectedRevenue,
  approvedDirectCosts,
  ratePercent = 10
}: CommissionInput) {
  if (collectedRevenue < 0 || approvedDirectCosts < 0 || ratePercent < 0) {
    throw new Error("Revenue, costs and commission rate cannot be negative.");
  }

  const netProfit = collectedRevenue - approvedDirectCosts;
  const commissionableProfit = Math.max(0, netProfit);
  const commission = Number((commissionableProfit * ratePercent / 100).toFixed(2));

  return {
    collectedRevenue,
    approvedDirectCosts,
    netProfit: Number(netProfit.toFixed(2)),
    commissionableProfit: Number(commissionableProfit.toFixed(2)),
    ratePercent,
    commission
  };
}
