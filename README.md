This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About

This app is a simple tax calculator for Singapore. It is built with Next.js and Tailwind CSS.

I built this because I wanted to see how much tax I would save if I topped up my CPF or contributed to my SRS.

However, other online calculators require me to input my existing assessable income, which I may not always know on hand.

This web app allows me to input my income and tax reliefs, which are saved to local storage. I can then tweak the additional reliefs to see how much tax I would save.

## Deployment

This app is deployed at https://singapore-tax-calculator.vercel.app/ using Vercel.

To deploy a new version, push a new commit to the `main` branch.
