"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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

function calculateTax(income: number): number {
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

export default function TaxCalculator() {
  const [income, setIncome] = useState(0);
  const [reliefs, setReliefs] = useState(0);
  const [additionalRelief, setAdditionalRelief] = useState(0);

  const chargeableIncome = Math.max(income - reliefs, 0);
  const taxPayable = calculateTax(chargeableIncome);

  const chargeableIncomeWithAdditional = Math.max(
    income - reliefs - additionalRelief,
    0
  );
  const taxPayableWithAdditional = calculateTax(chargeableIncomeWithAdditional);

  const taxSavings = Math.max(taxPayable - taxPayableWithAdditional, 0);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Tax Calculator</CardTitle>
        <CardDescription>
          Calculate your tax savings based on your income and reliefs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="income">Total Income (SGD)</Label>
            <Input
              id="income"
              type="number"
              placeholder="Enter your total income"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reliefs">Current Tax Reliefs (SGD)</Label>
            <Input
              id="reliefs"
              type="number"
              placeholder="Enter your current tax reliefs"
              value={reliefs}
              onChange={(e) => setReliefs(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="additionalRelief">
              Additional Relief (e.g., SRS or CPF Top-up) (SGD)
            </Label>
            <Input
              id="additionalRelief"
              type="number"
              placeholder="Enter additional relief"
              value={additionalRelief}
              onChange={(e) => setAdditionalRelief(Number(e.target.value))}
            />
          </div>
        </form>
        <div className="mt-6 space-y-2">
          <p>Chargeable Income: SGD {chargeableIncome.toFixed(2)}</p>
          <p>Tax Payable: SGD {taxPayable.toFixed(2)}</p>
          <p>
            Tax Payable with Additional Relief: SGD{" "}
            {taxPayableWithAdditional.toFixed(2)}
          </p>
          <p className="font-bold">
            Potential Tax Savings: SGD {taxSavings.toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
