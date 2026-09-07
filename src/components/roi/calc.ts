export interface RoiCalculation {
  total: number;
  plan: string;
  planPrice: number;
  netRoi: number;
  roiPct: number;
  annualImpact: number;
  revenueBenefit: number;
  costSavings: number;
  timeValue: number;
}

export const plans = [
  { name: "Nova Light", price: 99 },
  { name: "Nova Super", price: 333 },
  { name: "Nova Hyper", price: 1299 },
];

export function calcResults(values: Record<string, number>): RoiCalculation {
  const recoveredMissed = values.missedCalls * (values.closeRate / 100) * values.ticketValue;
  const recoveredHold = values.holdCalls * (values.closeRate / 100) * values.ticketValue;
  const revenueBenefit = recoveredMissed + recoveredHold;
  const costSavings = values.receptionistCost;
  const timeValue = values.hoursSpent * values.hourlyRate;
  const total = revenueBenefit + costSavings + timeValue;

  let plan = plans[2];
  if (total < 500) plan = plans[0];
  else if (total < 2000) plan = plans[1];

  const netRoi = total - plan.price;
  const roiPct = plan.price > 0 ? (netRoi / plan.price) * 100 : 0;
  const annualImpact = netRoi * 12;

  return {
    total,
    plan: plan.name,
    planPrice: plan.price,
    netRoi,
    roiPct,
    annualImpact,
    revenueBenefit,
    costSavings,
    timeValue,
  };
}