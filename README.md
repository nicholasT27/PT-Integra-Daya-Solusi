# PT Integra Daya Solusi website

Corporate website for PT Integra Daya Solusi, an Insurance, Risk and Engineering Consultant in Jakarta.
It presents the company, its six services, portfolio, insights, careers and contact details.

Built with Next.js (App Router), React, Tailwind CSS and JavaScript. There is no backend yet.

## How to run it

```bash
npm install
npm run dev      # development at http://localhost:3000
npm run build    # production build
npm run lint     # code checks
```

## Where to edit things

- `src/lib/site.js`: company address, phone numbers, services, articles, FAQs and menu.
  Set `company.email` there to make the contact form open an email draft.
- `src/components/Logo.js`: placeholder logo. Swap in the official logo file when available.
- `src/app/`: one folder per page (about, services, portfolio, insights, careers, contact).
