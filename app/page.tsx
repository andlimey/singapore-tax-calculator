"use client";

import TaxCalculator from "@/components/tax-calculator";
import { useIsClient } from "@uidotdev/usehooks";

export default function Home() {
  const isClient = useIsClient();

  if (isClient === false) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-8 text-4xl font-bold">Singapore Tax Savings Viewer</h1>
      <TaxCalculator />
    </main>
  );
}
