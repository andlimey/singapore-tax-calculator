"use client";

import { useMemo } from "react";
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
  AdditionalRelief,
} from "./tax-reliefs";
import {
  calculateCPFRelief,
  calculateEarnedIncomeRelief,
  calculateTax,
} from "@/api/tax-calculator";
import { Switch } from "./ui/switch";
import { useLocalStorage } from "@uidotdev/usehooks";
import { RadioGroup } from "./ui/radiogroup";
import { RadioGroupItem } from "./ui/radiogroup";

const RELIEFS_CAP = 80_000;
const DONATIONS_MULTIPLIER = 2.5;

export default function TaxCalculator() {
  // Income
  const [income, setIncome] = useLocalStorage("taxCalcIncome", 0);
  const [bonus, setBonus] = useLocalStorage("taxCalcBonus", 0);
  const [businessExpenses, setBusinessExpenses] = useLocalStorage(
    "taxCalcBusinessExpenses",
    0
  );
  const [otherIncome, setOtherIncome] = useLocalStorage(
    "taxCalcOtherIncome",
    0
  );
  const [donations, setDonations] = useLocalStorage("taxCalcDonations", 0);
  const employmentIncome = income + bonus;
  const netEmploymentIncome = employmentIncome - businessExpenses;
  const totalIncome = netEmploymentIncome + otherIncome;
  const assessableIncome = totalIncome - donations * DONATIONS_MULTIPLIER;

  // Reliefs
  const [age, setAge] = useLocalStorage("taxCalcAge", 30);
  const [isHandicapped, setIsHandicapped] = useLocalStorage(
    "taxCalcIsHandicapped",
    false
  );
  const [gender, setGender] = useLocalStorage("taxCalcGender", "male");

  const earnedIncomeRelief = calculateEarnedIncomeRelief({
    income: assessableIncome,
    age,
    isHandicapped,
  });
  const cpfRelief = calculateCPFRelief(age, income, bonus);

  const [spouseRelief, setSpouseRelief] = useLocalStorage(
    "taxCalcSpouseRelief",
    0
  );
  const [childRelief, setChildRelief] = useLocalStorage(
    "taxCalcChildRelief",
    0
  );
  const [workingMotherChildRelief, setWorkingMotherChildRelief] =
    useLocalStorage("taxCalcWorkingMotherChildRelief", 0);
  const [parentRelief, setParentRelief] = useLocalStorage(
    "taxCalcParentRelief",
    0
  );
  const [grandparentCaregiverRelief, setGrandparentCaregiverRelief] =
    useLocalStorage("taxCalcGrandparentCaregiverRelief", 0);
  const [handicappedSiblingRelief, setHandicappedSiblingRelief] =
    useLocalStorage("taxCalcHandicappedSiblingRelief", 0);
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
    let currentReliefs =
      earnedIncomeRelief +
      spouseRelief +
      childRelief +
      parentRelief +
      handicappedSiblingRelief +
      cpfRelief +
      lifeInsuranceRelief +
      courseFeeRelief +
      nsmanRelief;

    if (gender === "female") {
      currentReliefs += workingMotherChildRelief;
      currentReliefs += grandparentCaregiverRelief;
    }

    return Math.min(currentReliefs, RELIEFS_CAP);
  }, [
    gender,
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

  const additionalReliefCap = Math.max(RELIEFS_CAP - totalRelief, 0);

  // Tax Calculation
  const chargeableIncome = Math.max(0, assessableIncome - totalRelief);
  const taxPayable = calculateTax(chargeableIncome);

  const totalReliefWithAdditionalReliefs = Math.min(
    totalRelief + additionalRelief,
    RELIEFS_CAP
  );
  const chargeableIncomeWithAdditional = Math.max(
    assessableIncome - totalReliefWithAdditionalReliefs,
    0
  );
  const taxPayableWithAdditional = calculateTax(chargeableIncomeWithAdditional);

  const taxSavings = Math.max(taxPayable - taxPayableWithAdditional, 0);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Income Tax Calculator</CardTitle>
        <CardDescription>
          Calculate your income tax based on your income and applicable reliefs
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Income */}
        <div>
          <h3 className="text-lg font-bold">Income</h3>
          <div className="grid grid-cols-[300px_1fr] gap-4 items-center">
            <Label>Employment Income</Label>
            <Input
              type="number"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
            />

            <Label>Bonus</Label>
            <Input
              type="number"
              value={bonus}
              onChange={(e) => setBonus(Number(e.target.value))}
            />

            <Label className="pl-4">Less: Business Expenses</Label>
            <Input
              type="number"
              value={businessExpenses}
              onChange={(e) => setBusinessExpenses(Number(e.target.value))}
            />

            <Label className="font-bold">Net Employment Income</Label>
            <div>${netEmploymentIncome.toLocaleString()}</div>

            <Label>Other Income</Label>
            <Input
              type="number"
              value={otherIncome}
              onChange={(e) => setOtherIncome(Number(e.target.value))}
            />

            <Label className="font-bold">Total Income</Label>
            <div>${totalIncome.toLocaleString()}</div>

            <Label className="pl-4">Less: Approved Donations</Label>
            <Input
              type="number"
              value={donations}
              onChange={(e) => setDonations(Number(e.target.value))}
            />

            <Label className="font-bold">Assessable Income</Label>
            <div>${assessableIncome.toLocaleString()}</div>
          </div>
        </div>

        <div className="border-b border-gray-200" />

        {/* Reliefs */}
        <div>
          <h3 className="text-lg font-bold">Reliefs</h3>

          <div className="grid grid-cols-[300px_1fr] items-center gap-x-4 gap-y-6">
            <Label>Age</Label>
            <Input
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
            />

            <Label>Gender</Label>
            <RadioGroup onValueChange={(val) => setGender(val)} value={gender}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
                <RadioGroupItem value="female" id="female" className="ml-4" />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>

            <Label>Is Handicapped</Label>
            <Switch
              checked={isHandicapped}
              onCheckedChange={setIsHandicapped}
            />

            <EarnedIncomeRelief value={earnedIncomeRelief} />

            <CPFRelief value={cpfRelief} />

            <SpouseRelief value={spouseRelief} onChange={setSpouseRelief} />

            <ChildRelief value={childRelief} onChange={setChildRelief} />

            {gender === "female" ? (
              <WorkingMotherChildRelief
                value={workingMotherChildRelief}
                onChange={setWorkingMotherChildRelief}
              />
            ) : null}

            <ParentRelief value={parentRelief} onChange={setParentRelief} />

            {gender === "female" ? (
              <GrandparentCaregiverRelief
                value={grandparentCaregiverRelief}
                onChange={setGrandparentCaregiverRelief}
              />
            ) : null}

            <HandicappedSiblingRelief
              value={handicappedSiblingRelief}
              onChange={setHandicappedSiblingRelief}
            />

            <LifeInsuranceRelief
              value={lifeInsuranceRelief}
              onChange={setLifeInsuranceRelief}
            />

            <CourseFeeRelief
              value={courseFeeRelief}
              onChange={setCourseFeeRelief}
            />

            <NSmanRelief value={nsmanRelief} onChange={setNSmanRelief} />

            <AdditionalRelief
              value={additionalRelief}
              onChange={setAdditionalRelief}
              additionalReliefCap={additionalReliefCap}
            />
          </div>
        </div>

        <div className="border-b border-gray-200" />

        {/* Tax Calculation */}
        <div className="flex flex-col gap-4">
          <p>
            Total Relief (Capped at 80,000): ${totalRelief.toLocaleString()}
          </p>
          <p>Chargeable Income: ${chargeableIncome.toLocaleString()}</p>
          <p>
            Tax Payable:&nbsp;
            <span className="font-bold">${taxPayable.toLocaleString()}</span>
          </p>

          {additionalRelief > 0 && (
            <div className="border-t border-gray-200 flex flex-col gap-4 pt-4">
              <p>
                Tax Payable with Additional Relief: $
                {taxPayableWithAdditional.toLocaleString()}
              </p>
              <p>
                Tax Savings:&nbsp;
                <span className="font-bold">
                  ${taxSavings.toLocaleString()}
                </span>
              </p>
              <p>
                You pay&nbsp;
                <span className="font-bold">
                  {((taxSavings / taxPayable) * 100).toFixed(2)}%
                </span>
                &nbsp;less taxes
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
