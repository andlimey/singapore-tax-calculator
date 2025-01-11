import { ExternalLinkIcon } from "lucide-react";
import { Label } from "./label";
import { ReliefTooltip } from "./relief-tooltip";
import Link from "next/link";

interface ReliefLabelProps {
  labelHtmlFor: string;
  label: string;
  children: React.ReactNode;
  href: string;
}

export const ReliefLabel = ({
  labelHtmlFor,
  label,
  children,
  href,
}: ReliefLabelProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor={labelHtmlFor}>{label}</Label>

      <ReliefTooltip>{children}</ReliefTooltip>

      <Link target="_blank" href={href}>
        <ExternalLinkIcon size={16} />
      </Link>
    </div>
  );
};
