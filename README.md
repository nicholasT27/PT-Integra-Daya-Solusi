# PT Integra Daya Solusi website

Corporate website for PT Integra Daya Solusi, an Insurance, Risk and Engineering Consultant in Jakarta.
It presents the company, its six services, portfolio, blog, careers and contact details.

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
  The history, leadership, projects, testimonials and job openings in that file are SAMPLE content for the client demo and must be replaced with real details.
  Set `company.email` there to make the contact form open an email draft.
- `public/brand/`: the official IDS logo files (blue and white) and the brand photo. The photo is low resolution, so it is not used on the pages right now.
- `src/components/qx/`: the menu, footer, home page hero and the scroll-animated home page sections.
- `src/app/`: one folder per page (about, services, portfolio, blog, careers, contact).
- `public/photos/`: put the real photos for the home page picture here (see `heroPhotos` in `src/lib/site.js`). Use five files of at least 900 px wide, roughly square or 4:5.
