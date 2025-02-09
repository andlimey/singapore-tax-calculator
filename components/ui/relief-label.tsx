import { ExternalLinkIcon } from "lucide-react";
import { Label } from "./label";
import { ReliefTooltip } from "./relief-tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ReliefLabelProps extends React.HTMLAttributes<HTMLDivElement> {
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
  className,
}: ReliefLabelProps) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Label htmlFor={labelHtmlFor}>{label}</Label>

      <ReliefTooltip>{children}</ReliefTooltip>

      <Link target="_blank" href={href}>
        <ExternalLinkIcon size={16} />
      </Link>
    </div>
  );
};
