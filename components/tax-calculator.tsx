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
  NSmanRelief,
} from "./tax-reliefs";
import {
  calculateEarnedIncomeRelief,
  calculateTax,
} from "@/api/tax-calculator";
import { Switch } from "./ui/switch";
import { useLocalStorage } from "@uidotdev/usehooks";

const RELIEFS_CAP = 80000;

export default function TaxCalculator() {
  const [income, setIncome] = useLocalStorage("taxCalcIncome", 0);
  const [age, setAge] = useLocalStorage("taxCalcAge", 30);
  const [isHandicapped, setIsHandicapped] = useState(false);
  const earnedIncomeRelief = calculateEarnedIncomeRelief({
    income,
    age,
    isHandicapped,
  });
  const [spouseRelief, setSpouseRelief] = useLocalStorage(
    "taxCalcSpouseRelief",
    0
  );
  const [childRelief, setChildRelief] = useLocalStorage(
    "taxCalcChildRelief",
    0
  );
  const [childCount, setChildCount] = useLocalStorage("taxCalcChildCount", 0);
  const [workingMotherChildRelief, setWorkingMotherChildRelief] =
    useLocalStorage("taxCalcWorkingMotherChildRelief", 0);
  const [parentRelief, setParentRelief] = useLocalStorage(
    "taxCalcParentRelief",
    0
  );
  const [isParentHandicapped, setIsParentHandicapped] = useState(false);
  const [isParentStayingTogether, setIsParentStayingTogether] = useLocalStorage(
    "taxCalcIsParentStayingTogether",
    false
  );
  const [grandparentCaregiverRelief, setGrandparentCaregiverRelief] =
    useLocalStorage("taxCalcGrandparentCaregiverRelief", 0);
  const [handicappedSiblingRelief, setHandicappedSiblingRelief] =
    useLocalStorage("taxCalcHandicappedSiblingRelief", 0);
  const [handicappedSiblingCount, setHandicappedSiblingCount] = useLocalStorage(
    "taxCalcHandicappedSiblingCount",
    0
  );
  const [cpfRelief, setCPFRelief] = useLocalStorage("taxCalcCPFRelief", 0);
  const [lifeInsuranceRelief, setLifeInsuranceRelief] = useLocalStorage(
    "taxCalcLifeInsuranceRelief",
    0
  );
  const [courseFeeRelief, setCourseFeeRelief] = useLocalStorage(
    "taxCalcCourseFeeRelief",
    0
  );
  const [nsmanRelief, setNSmanRelief] = useLocalStorage(
    "taxCalcNSmanRelief",
    0
  );
  const [additionalRelief, setAdditionalRelief] = useLocalStorage(
    "taxCalcAdditionalRelief",
    0
  );

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
          <div className="flex flex-row gap-4 items-center">
            <div className="flex flex-row items-center gap-2">
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
              <Label htmlFor="handicapped">Is Handicapped</Label>
              <Switch
                id="handicapped"
                checked={isHandicapped}
                onCheckedChange={setIsHandicapped}
              />
            </div>
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

          <SpouseRelief value={spouseRelief} onChange={setSpouseRelief} />

          <ChildRelief value={childRelief} onChange={setChildRelief} />

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

        <div className="mt-6 border-t border-gray-200 pt-4 flex flex-col gap-4">
          <p>
            Total Tax Relief (Capped at 80,000): SGD{" "}
            {(totalRelief + additionalRelief).toFixed(2)}
          </p>
          <p>Chargeable Income: SGD {chargeableIncome.toFixed(2)}</p>
          <p>Tax Payable: SGD {taxPayable.toFixed(2)}</p>
          {additionalRelief ? (
            <div className="border-t border-gray-200 flex flex-col gap-2 pt-4">
              <p>
                Tax Payable with Additional Relief: SGD{" "}
                {taxPayableWithAdditional.toFixed(2)}
              </p>
              <p className="font-bold">
                Potential Tax Savings: SGD {taxSavings.toFixed(2)}
              </p>
              <p>
                You pay {((taxSavings / taxPayable) * 100).toFixed(2)}% less
                taxes
              </p>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
