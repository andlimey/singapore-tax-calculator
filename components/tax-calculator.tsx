"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  EarnedIncomeRelief,
  SpouseRelief,
  ChildRelief,
  WorkingMotherChildRelief,
  ParentRelief,
  GrandparentCaregiverRelief,
  HandicappedSiblingRelief,
  CPFRelief,
  LifeInsuranceRelief,
  CourseFeeRelief,
  ForeignDomesticWorkerLevyRelief,
  NSmanRelief,
} from "./tax-reliefs";
import {
  calculateEarnedIncomeRelief,
  calculateTax,
} from "@/api/tax-calculator";
import { Switch } from "./ui/switch";

const RELIEFS_CAP = 80000;

export default function TaxCalculator() {
  const [income, setIncome] = useState(0);

  const [age, setAge] = useState(30);
  const [isHandicapped, setIsHandicapped] = useState(false);
  const earnedIncomeRelief = calculateEarnedIncomeRelief({
    income,
    age,
    isHandicapped,
  });

  const [spouseRelief, setSpouseRelief] = useState(0);
  const [childRelief, setChildRelief] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [handicappedChildCount, setHandicappedChildCount] = useState(0);
  const [workingMotherChildRelief, setWorkingMotherChildRelief] = useState(0);
  const [parentRelief, setParentRelief] = useState(0);
  const [isParentHandicapped, setIsParentHandicapped] = useState(false);
  const [isParentStayingTogether, setIsParentStayingTogether] = useState(false);
  const [grandparentCaregiverRelief, setGrandparentCaregiverRelief] =
    useState(0);
  const [handicappedSiblingRelief, setHandicappedSiblingRelief] = useState(0);
  const [handicappedSiblingCount, setHandicappedSiblingCount] = useState(0);
  const [cpfRelief, setCPFRelief] = useState(0);
  const [lifeInsuranceRelief, setLifeInsuranceRelief] = useState(0);
  const [courseFeeRelief, setCourseFeeRelief] = useState(0);
  const [fdwlRelief, setFDWLRelief] = useState(0);
  const [nsmanRelief, setNSmanRelief] = useState(0);

  const [additionalRelief, setAdditionalRelief] = useState(0);

  const totalRelief = useMemo(() => {
    return (
      earnedIncomeRelief +
      spouseRelief +
      childRelief +
      workingMotherChildRelief +
      parentRelief +
      grandparentCaregiverRelief +
      handicappedSiblingRelief +
      cpfRelief +
      lifeInsuranceRelief +
      courseFeeRelief +
      fdwlRelief +
      nsmanRelief
    );
  }, [
    earnedIncomeRelief,
    spouseRelief,
    childRelief,
    workingMotherChildRelief,
    parentRelief,
    grandparentCaregiverRelief,
    handicappedSiblingRelief,
    cpfRelief,
    lifeInsuranceRelief,
    courseFeeRelief,
    fdwlRelief,
    nsmanRelief,
  ]);

  const chargeableIncome = Math.max(
    income - Math.min(totalRelief, RELIEFS_CAP),
    0
  );

  const taxPayable = calculateTax(chargeableIncome);

  const chargeableIncomeWithAdditional = Math.max(
    income - Math.min(totalRelief + additionalRelief, RELIEFS_CAP),
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
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-row items-center gap-2">
            <Label htmlFor="handicapped" className="ml-2">
              Is Handicapped
            </Label>
            <Switch
              id="handicapped"
              checked={isHandicapped}
              onCheckedChange={setIsHandicapped}
            />
          </div>

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

          <EarnedIncomeRelief value={earnedIncomeRelief} />

          <SpouseRelief
            value={spouseRelief}
            onChange={setSpouseRelief}
            isHandicapped={isHandicapped}
          />

          <ChildRelief
            value={childRelief}
            onChange={setChildRelief}
            childCount={childCount}
            handicappedChildCount={handicappedChildCount}
          />

          <WorkingMotherChildRelief
            value={workingMotherChildRelief}
            onChange={setWorkingMotherChildRelief}
            motherEarnedIncome={income}
            childCount={childCount}
          />

          <ParentRelief
            value={parentRelief}
            onChange={setParentRelief}
            isHandicapped={isParentHandicapped}
            isStayingTogether={isParentStayingTogether}
          />

          <GrandparentCaregiverRelief
            value={grandparentCaregiverRelief}
            onChange={setGrandparentCaregiverRelief}
          />

          <HandicappedSiblingRelief
            value={handicappedSiblingRelief}
            onChange={setHandicappedSiblingRelief}
            siblingCount={handicappedSiblingCount}
          />

          <CPFRelief value={cpfRelief} onChange={setCPFRelief} />

          <LifeInsuranceRelief
            value={lifeInsuranceRelief}
            onChange={setLifeInsuranceRelief}
            cpfContribution={cpfRelief}
          />

          <CourseFeeRelief
            value={courseFeeRelief}
            onChange={setCourseFeeRelief}
          />

          <ForeignDomesticWorkerLevyRelief
            value={fdwlRelief}
            onChange={setFDWLRelief}
          />

          <NSmanRelief value={nsmanRelief} onChange={setNSmanRelief} />

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

        <div className="mt-6 space-y-3">
          <p>
            Total Tax Relief (Capped at 80,000): SGD{" "}
            {(totalRelief + additionalRelief).toFixed(2)}
          </p>
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
