interface TaxBracketRate {
  min: number;
  max: number;
  rate: number;
}

const TAX_BRACKETS: Array<TaxBracketRate> = [
  { min: 0, max: 20000, rate: 0 },
  { min: 20000, max: 30000, rate: 0.02 },
  { min: 30000, max: 40000, rate: 0.035 },
  { min: 40000, max: 80000, rate: 0.07 },
  { min: 80000, max: 120000, rate: 0.115 },
  { min: 120000, max: 160000, rate: 0.15 },
  { min: 160000, max: 200000, rate: 0.18 },
  { min: 200000, max: 240000, rate: 0.19 },
  { min: 240000, max: 280000, rate: 0.195 },
  { min: 280000, max: 320000, rate: 0.2 },
  { min: 320000, max: 500000, rate: 0.22 },
  { min: 500000, max: 1000000, rate: 0.23 },
  { min: 1000000, max: Number.POSITIVE_INFINITY, rate: 0.24 },
];

export function calculateTax(income: number): number {
  let tax = 0;

  for (const bracket of TAX_BRACKETS) {
    if (income <= bracket.min) {
      break;
    }
    const taxableIncome = Math.min(income, bracket.max) - bracket.min;
    tax += taxableIncome * bracket.rate;
  }

  return tax;
}

interface EarnedIncomeReliefParams {
  age: number;
  income: number;
  isHandicapped: boolean;
}

export function calculateEarnedIncomeRelief({
  age,
  income,
  isHandicapped,
}: EarnedIncomeReliefParams): number {
  let maxRelief: number;

  if (isHandicapped) {
    if (age < 55) {
      maxRelief = 4000;
    } else if (age >= 55 && age <= 59) {
      maxRelief = 10000;
    } else {
      maxRelief = 12000;
    }
  } else {
    if (age < 55) {
      maxRelief = 1000;
    } else if (age >= 55 && age <= 59) {
      maxRelief = 6000;
    } else {
      maxRelief = 8000;
    }
  }

  return Math.min(income, maxRelief);
}
