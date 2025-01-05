import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { RadioGroup, RadioGroupItem } from "./ui/radiogroup";
import { ExternalLinkIcon } from "lucide-react";
import { ReliefTooltip } from "./ui/relief-tooltip";
import Link from "next/link";

interface ReliefProps {
  value: number;
  onChange: (value: number) => void;
}

export const EarnedIncomeRelief: React.FC<{ value: number }> = ({ value }) => {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex items-center space-x-2">
        <p>Earned Income Relief</p>

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
        <span>:</span>
      </div>

      <span>{`$${value}`}</span>
    </div>
  );
};

export const SpouseRelief: React.FC<
  ReliefProps & { isHandicapped: boolean }
> = ({ value, onChange, isHandicapped }) => {
  const maxRelief = isHandicapped ? 5500 : 2000;

  return (
    <div className="space-y-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Label htmlFor="spouseRelief">Spouse Relief</Label>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Maximum relief is $5,500 for handicapped individuals and $2,000
              for others.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Input
        id="spouseRelief"
        type="number"
        value={value}
        onChange={(e) => onChange(Math.min(Number(e.target.value), maxRelief))}
        max={maxRelief}
      />
      <p className="text-sm text-muted-foreground">
        Maximum relief: ${maxRelief}
      </p>
    </div>
  );
};

export const ChildRelief: React.FC<
  ReliefProps & { childCount: number; handicappedChildCount: number }
> = ({ value, onChange, childCount, handicappedChildCount }) => {
  const maxRelief = childCount * 4000 + handicappedChildCount * 7500;

  return (
    <div className="space-y-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Label htmlFor="childRelief">Child Relief</Label>
          </TooltipTrigger>
          <TooltipContent>
            <p>Relief is $4,000 per child and $7,500 per handicapped child.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Input
        id="childRelief"
        type="number"
        value={value}
        onChange={(e) => onChange(Math.min(Number(e.target.value), maxRelief))}
        max={maxRelief}
      />
      <p className="text-sm text-muted-foreground">
        Maximum relief: ${maxRelief}
      </p>
    </div>
  );
};

export const WorkingMotherChildRelief: React.FC<
  ReliefProps & { motherEarnedIncome: number; childCount: number }
> = ({ value, onChange, motherEarnedIncome, childCount }) => {
  const maxRelief = Math.min(
    motherEarnedIncome,
    motherEarnedIncome *
      (0.15 +
        (childCount > 1 ? 0.2 : 0) +
        (childCount > 2 ? 0.25 * (childCount - 2) : 0))
  );

  return (
    <div className="space-y-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Label htmlFor="workingMotherChildRelief">
              Working Mother's Child Relief
            </Label>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              This relief is calculated based on your earned income and number
              of children.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Input
        id="workingMotherChildRelief"
        type="number"
        value={value}
        onChange={(e) => onChange(Math.min(Number(e.target.value), maxRelief))}
        max={maxRelief}
      />
      <p className="text-sm text-muted-foreground">
        Maximum relief: ${maxRelief.toFixed(2)}
      </p>
    </div>
  );
};

export const ParentRelief: React.FC<
  ReliefProps & { isHandicapped: boolean; isStayingTogether: boolean }
> = ({ value, onChange, isHandicapped, isStayingTogether }) => {
  const maxRelief = isHandicapped
    ? isStayingTogether
      ? 14000
      : 10000
    : isStayingTogether
    ? 9000
    : 5500;

  return (
    <div className="space-y-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Label htmlFor="parentRelief">Parent Relief</Label>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Relief amounts vary based on whether you are handicapped and if
              you are staying together with your spouse.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Input
        id="parentRelief"
        type="number"
        value={value}
        onChange={(e) => onChange(Math.min(Number(e.target.value), maxRelief))}
        max={maxRelief}
      />
      <p className="text-sm text-muted-foreground">
        Maximum relief: ${maxRelief}
      </p>
    </div>
  );
};

export const GrandparentCaregiverRelief: React.FC<ReliefProps> = ({
  value,
  onChange,
}) => (
  <div className="space-y-2">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Label htmlFor="grandparentCaregiverRelief">
            Grandparent Caregiver Relief
          </Label>
        </TooltipTrigger>
        <TooltipContent>
          <p>Maximum relief is $3,000.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <Input
      id="grandparentCaregiverRelief"
      type="number"
      value={value}
      onChange={(e) => onChange(Math.min(Number(e.target.value), 3000))}
      max={3000}
    />
    <p className="text-sm text-muted-foreground">Maximum relief: $3,000</p>
  </div>
);

export const HandicappedSiblingRelief: React.FC<
  ReliefProps & { siblingCount: number }
> = ({ value, onChange, siblingCount }) => {
  const maxRelief = siblingCount * 5500;

  return (
    <div className="space-y-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Label htmlFor="handicappedSiblingRelief">
              Handicapped Sibling Relief
            </Label>
          </TooltipTrigger>
          <TooltipContent>
            <p>Relief is $5,500 per handicapped sibling.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Input
        id="handicappedSiblingRelief"
        type="number"
        value={value}
        onChange={(e) => onChange(Math.min(Number(e.target.value), maxRelief))}
        max={maxRelief}
      />
      <p className="text-sm text-muted-foreground">
        Maximum relief: ${maxRelief}
      </p>
    </div>
  );
};

export const CPFRelief: React.FC<ReliefProps> = ({ value, onChange }) => (
  <div className="space-y-2">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Label htmlFor="cpfRelief">CPF Relief</Label>
        </TooltipTrigger>
        <TooltipContent>
          <p>Enter your CPF contribution amount.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <Input
      id="cpfRelief"
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  </div>
);

export const LifeInsuranceRelief: React.FC<
  ReliefProps & { cpfContribution: number }
> = ({ value, onChange, cpfContribution }) => {
  const maxRelief = Math.max(0, 5000 - cpfContribution);

  return (
    <div className="space-y-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Label htmlFor="lifeInsuranceRelief">Life Insurance Relief</Label>
          </TooltipTrigger>
          <TooltipContent>
            <p>Maximum relief is $5,000 less your CPF contribution.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Input
        id="lifeInsuranceRelief"
        type="number"
        value={value}
        onChange={(e) => onChange(Math.min(Number(e.target.value), maxRelief))}
        max={maxRelief}
      />
      <p className="text-sm text-muted-foreground">
        Maximum relief: ${maxRelief}
      </p>
    </div>
  );
};

export const CourseFeeRelief: React.FC<ReliefProps> = ({ value, onChange }) => (
  <div className="space-y-2">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Label htmlFor="courseFeeRelief">Course Fee Relief</Label>
        </TooltipTrigger>
        <TooltipContent>
          <p>Maximum relief is $5,500.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <Input
      id="courseFeeRelief"
      type="number"
      value={value}
      onChange={(e) => onChange(Math.min(Number(e.target.value), 5500))}
      max={5500}
    />
    <p className="text-sm text-muted-foreground">Maximum relief: $5,500</p>
  </div>
);

export const ForeignDomesticWorkerLevyRelief: React.FC<ReliefProps> = ({
  value,
  onChange,
}) => (
  <div className="space-y-2">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Label htmlFor="fdwlRelief">
            Foreign Domestic Worker Levy Relief
          </Label>
        </TooltipTrigger>
        <TooltipContent>
          <p>Enter twice the total levy paid in the previous year.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <Input
      id="fdwlRelief"
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
    <p className="text-sm text-muted-foreground">
      Enter twice the total levy paid in the previous year
    </p>
  </div>
);

export const NSmanRelief: React.FC<ReliefProps> = ({ value, onChange }) => (
  <div className="space-y-2">
    <div className="flex items-center space-x-2">
      <Label htmlFor="nsmanRelief">NSman Relief</Label>

      <ReliefTooltip>
        <p>Select the appropriate relief amount based on your NSman status.</p>
      </ReliefTooltip>

      <Link
        target="_blank"
        href="https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/tax-reliefs-rebates-and-deductions/tax-reliefs/nsman-relief-(self-wife-and-parent)"
      >
        <ExternalLinkIcon size={16} />
      </Link>
    </div>

    <RadioGroup
      onValueChange={(val) => onChange(Number(val))}
      value={value.toString()}
    >
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
  </div>
);
