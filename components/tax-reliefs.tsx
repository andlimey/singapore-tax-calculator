import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radiogroup";
import { ExternalLinkIcon } from "lucide-react";
import { ReliefTooltip } from "./ui/relief-tooltip";
import Link from "next/link";
import { ReliefLabel } from "./ui/relief-label";

interface ReliefProps {
  value: number;
  onChange: (value: number) => void;
}

export const EarnedIncomeRelief: React.FC<{ value: number }> = ({ value }) => {
  return (
    <>
      <Label className="flex flex-row items-center gap-2">
        <span>Earned Income Relief</span>
        <ReliefTooltip>
          <p>
            The earned income relief is the lower of your earned income or the
            following values:
          </p>
          <ul>
            <li>$1,000 (if you are below 55)</li>
            <li>$6,000 (55 to 59)</li>
            <li>$8,000 (60 and above)</li>
          </ul>

          <p className="mt-4">
            For handicapped persons, the maximum relief is higher.
          </p>
          <ul>
            <li>$4,000 (if you are below 55)</li>
            <li>$10,000 (55 to 59)</li>
            <li>$12,000 (60 and above)</li>
          </ul>
        </ReliefTooltip>
        <Link
          target="_blank"
          href="https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/tax-reliefs-rebates-and-deductions/tax-reliefs/earned-income-relief"
        >
          <ExternalLinkIcon size={16} />
        </Link>
      </Label>
      <div>${value.toLocaleString()}</div>
    </>
  );
};

export const SpouseRelief: React.FC<ReliefProps> = ({ value, onChange }) => {
  return (
    <>
      <ReliefLabel
        labelHtmlFor="spouseRelief"
        label="Spouse Relief"
        href="https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/tax-reliefs-rebates-and-deductions/tax-reliefs/spouse-relief-spouse-relief-(disability)"
      >
        <p>Spouse/handicapped spouse relief.</p>
        <p>
          Enter $2,000 for spouse relief or $5,500 for handicapped spouse
          relief.
        </p>
        <p>
          You are only eligible for spouse relief if the income of your spouse
          in the previous year is not more than $4,000.
        </p>
      </ReliefLabel>

      <Input
        id="spouseRelief"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
    </>
  );
};

export const ChildRelief: React.FC<ReliefProps> = ({ value, onChange }) => {
  return (
    <>
      <ReliefLabel
        labelHtmlFor="childRelief"
        label="Child Relief"
        href="https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/tax-reliefs-rebates-and-deductions/tax-reliefs/qualifying-child-relief-(qcr)-child-relief-(disability)"
      >
        <p>Relief is $4,000 per child and $7,500 per handicapped child.</p>
      </ReliefLabel>

      <Input
        id="childRelief"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
    </>
  );
};

export const WorkingMotherChildRelief: React.FC<ReliefProps> = ({
  value,
  onChange,
}) => {
  return (
    <>
      <ReliefLabel
        labelHtmlFor="workingMotherChildRelief"
        label="Working Mother's Child Relief"
        href="https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/tax-reliefs-rebates-and-deductions/tax-reliefs/working-mother's-child-relief-(wmcr)"
      >
        <p>Enter the amount:</p>
        <p>1st child - $8,000</p>
        <p>2nd child - $10,000</p>
        <p>3rd child onwards - $12,000</p>
      </ReliefLabel>

      <Input
        id="workingMotherChildRelief"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
    </>
  );
};

export const ParentRelief: React.FC<ReliefProps> = ({ value, onChange }) => {
  return (
    <>
      <ReliefLabel
        labelHtmlFor="parentRelief"
        label="Parent Relief"
        href="https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/tax-reliefs-rebates-and-deductions/tax-reliefs/parent-relief-parent-relief-(disability)"
      >
        <p>
          You can claim parent relief or handicapped parent relief for up to 2
          dependants.
        </p>
        <p>The amount of relief for each dependant is as follows.</p>
        <p>Staying with you: $9,000 or $14,000 (handicapped)</p>
        <p>Not staying with you: $5,500 or $10,000 (handicapped)</p>
      </ReliefLabel>

      <Input
        id="parentRelief"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
    </>
  );
};

export const GrandparentCaregiverRelief: React.FC<ReliefProps> = ({
  value,
  onChange,
}) => (
  <>
    <ReliefLabel
      className="self-start mt-3"
      labelHtmlFor="grandparentCaregiverRelief"
      label="Grandparent Caregiver Relief"
      href="https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/tax-reliefs-rebates-and-deductions/tax-reliefs/grandparent-caregiver-relief"
    >
      <p>
        Grandparent Caregiver Relief (GCR) is given to working mothers who
        engage the help of their:
      </p>
      <ul>
        <li>- Parents</li>
        <li>- Grandparents</li>
        <li>- Parents-in-law</li>
        <li>- Grandparents-in-law (including those of ex-spouses)</li>
      </ul>
      <p>to take care of their children.</p>
      <br />
      <p>Enter $3,000 if you are entitled to this relief.</p>
    </ReliefLabel>

    <div>
      <Input
        id="grandparentCaregiverRelief"
        value={value}
        onChange={(e) => onChange(Math.min(Number(e.target.value) || 0, 3000))}
        max={3000}
      />
      <p className="text-sm text-muted-foreground">Maximum relief: $3,000</p>
    </div>
  </>
);

export const HandicappedSiblingRelief: React.FC<ReliefProps> = ({
  value,
  onChange,
}) => {
  return (
    <>
      <ReliefLabel
        labelHtmlFor="handicappedSiblingRelief"
        label="Handicapped Sibling Relief"
        href="https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/tax-reliefs-rebates-and-deductions/tax-reliefs/sibling-relief-(disability)"
      >
        <p>
          Enter up to $5,500 for each of your or your spouse&apos;s brothers or
          sisters who are handicapped and whom you maintained.
        </p>
      </ReliefLabel>

      <Input
        id="handicappedSiblingRelief"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
    </>
  );
};

export const CPFRelief: React.FC<{ value: number }> = ({ value }) => {
  return (
    <>
      <Label className="self-center flex items-center space-x-2">
        <span>CPF Relief</span>
        <ReliefTooltip>
          <p>
            CPF Relief is capped by the amount of compulsory employee CPF
            contributions made on Ordinary Wages and Additional Wages under the
            CPF Act.
          </p>
        </ReliefTooltip>
        <Link
          target="_blank"
          href="https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/tax-reliefs-rebates-and-deductions/tax-reliefs/central-provident-fund(cpf)-relief-for-employees"
        >
          <ExternalLinkIcon size={16} />
        </Link>
      </Label>
      <div className="self-center">${value.toLocaleString()}</div>
    </>
  );
};

export const LifeInsuranceRelief: React.FC<ReliefProps> = ({
  value,
  onChange,
}) => {
  return (
    <>
      <ReliefLabel
        className="self-start mt-3"
        labelHtmlFor="lifeInsuranceRelief"
        label="Life Insurance Relief"
        href="https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/tax-reliefs-rebates-and-deductions/tax-reliefs/life-insurance-relief"
      >
        <p>Maximum relief is $5,000 less your CPF contribution.</p>
      </ReliefLabel>

      <div>
        <Input
          id="lifeInsuranceRelief"
          value={value}
          onChange={(e) =>
            onChange(Math.min(Number(e.target.value) || 0, 5000))
          }
          max={5000}
        />
        <p className="text-sm text-muted-foreground">Maximum relief: $5,000</p>
      </div>
    </>
  );
};

export const CourseFeeRelief: React.FC<ReliefProps> = ({ value, onChange }) => (
  <>
    <ReliefLabel
      className="self-start mt-3"
      labelHtmlFor="courseFeeRelief"
      label="Course Fee Relief"
      href="https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/tax-reliefs-rebates-and-deductions/tax-reliefs/course-fees-relief"
    >
      <p>Maximum relief is $5,500.</p>
    </ReliefLabel>

    <div>
      <Input
        id="courseFeeRelief"
        value={value}
        onChange={(e) => onChange(Math.min(Number(e.target.value) || 0, 5500))}
        max={5500}
      />
      <p className="text-sm text-muted-foreground">Maximum relief: $5,500</p>
    </div>
  </>
);

export const NSmanRelief: React.FC<ReliefProps> = ({ value, onChange }) => (
  <>
    <ReliefLabel
      className="self-start"
      labelHtmlFor="nsmanRelief"
      label="NSman Relief"
      href="https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/tax-reliefs-rebates-and-deductions/tax-reliefs/nsman-relief-(self-wife-and-parent)"
    >
      <p>Select the appropriate relief amount based on your NSman status.</p>
    </ReliefLabel>

    <RadioGroup
      onValueChange={(val) => onChange(Number(val))}
      value={value.toString()}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="0" id="r6" />
        <Label htmlFor="r5">Not Applicable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="1500" id="r1" />
        <Label htmlFor="r1">$1,500 (Non-key appointment holder, no ICT)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="3000" id="r2" />
        <Label htmlFor="r2">
          $3,000 (Non-key appointment holder, with ICT)
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="3500" id="r3" />
        <Label htmlFor="r3">$3,500 (Key appointment holder, no ICT)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="5000" id="r4" />
        <Label htmlFor="r4">$5,000 (Key appointment holder, with ICT)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="750" id="r5" />
        <Label htmlFor="r5">$750 (Wife/Parent of NSman)</Label>
      </div>
    </RadioGroup>
  </>
);

export const AdditionalRelief: React.FC<
  ReliefProps & { additionalReliefCap: number }
> = ({ value, onChange, additionalReliefCap }) => (
  <>
    <Label className="self-start mt-3" htmlFor="additionalRelief">
      Additional Reliefs (e.g. SRS contribution)
    </Label>
    <div>
      <Input
        id="additionalRelief"
        placeholder="Enter additional relief"
        value={value}
        onChange={(e) =>
          onChange(Math.min(Number(e.target.value) || 0, additionalReliefCap))
        }
        max={additionalReliefCap}
        disabled={additionalReliefCap === 0}
      />
      <p className="text-sm text-muted-foreground">
        {`Maximum relief: $${additionalReliefCap.toLocaleString()}`}
      </p>
    </div>
  </>
);
