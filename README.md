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

I also wanted to test using v0 from Vercel. This project heavily uses v0 and Cursor for quick implementation.

## Limitations

The tax reliefs are applicable for the year 2025.

## Deployment

This app is deployed at https://singapore-tax-calculator.vercel.app/ using Vercel.

To deploy a new version, push a new commit to the `main` branch.

## Lessons learned

### First cut: Only including tax reliefs

The first implementation only had 1 input for total income. The rest were inputs for the different tax reliefs.

This was a simple first implementation, but I wanted to make it even easier to input the reliefs.

### Second cut: Automatically calculating reliefs

I started with automatically calculating the Earned Income Relief since this was the easiest to calculate.

However, this required the user to instead input 2 fields - their age and whether they are handicapped. I am still contemplating if I should just let the Earned Income Relief be a single field, but I'll leave it as it is for now.

I also realised that the other fields are not necessarily as straightforward to calculate.

For example, the Parent Relief can be shared with other claimants, so there is no easy way to automate the calculation.

The other relief I could calculate automatically would be the CPF contribution relief, since it is based on the employment income and bonus.

### Third cut: Adding other income segments

I later realised I had to add other income segments. For the CPF contribution relief, I implemented 1 field for employment income, and another for bonus.

However, this would exclude other potential income sources that aren't subjected to CPF deductions.
