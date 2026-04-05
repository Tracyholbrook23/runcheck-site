# RunCheck — Marketing Website

The official landing site for **RunCheck**, a pickup basketball app that helps players find live games near them. Built and maintained by Tracy H., founder of RunCheck.

**Live site:** [theruncheck.app](https://theruncheck.app)

---

## About RunCheck

RunCheck solves a problem every pickup basketball player knows: you drive to the gym and it's empty. The app lets players check in at courts in real time using GPS verification, so anyone can see exactly how many people are at a gym before they leave the house.

Currently live in Austin, TX and surrounding areas — with more cities coming soon.

---

## What's on the site

| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero with background video, live court demo, testimonials, FAQ, email capture |
| How it Works | `/how-it-works` | Step-by-step walkthrough of the app experience |
| About | `/about` | Mission, vision, values, and founder story |
| Contact | `/contact` | Email, phone, and privacy policy links |

---

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion v12
- **Deployment:** Vercel
- **Domain:** theruncheck.app

---

## Project structure

```
app/
  page.tsx              # Home page
  about/page.tsx        # About page
  how-it-works/page.tsx # How it works page
  contact/page.tsx      # Contact page
  components/
    Nav.tsx             # Sticky navigation bar
    Footer.tsx          # Site footer with links + Instagram
    Reveal.tsx          # Scroll-reveal animation wrapper
    LiveDemo.tsx        # Animated real-time court activity demo
    FAQ.tsx             # Accordion FAQ component
public/
  runcheck-logo.png     # RunCheck logo
  founder.jpg           # Founder photo (used on About page)
  hero.mp4              # Background video for home page hero
```

---

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## Deploying

The site deploys automatically to Vercel. To push a manual production build:

```bash
cd ~/Desktop/runcheck-site
vercel --prod
```

---

## Email capture

The early access email form in the homepage is wired to a `submitEmail()` function in `app/page.tsx`. To connect it to a real email service (Klaviyo, Mailchimp, etc.), replace the `console.log` inside that function with your API call. No other changes needed.

---

## Contact

- **Email:** runcheckapp@gmail.com
- **Phone:** (517) 944-1431
- **Instagram:** [@run.check](https://www.instagram.com/run.check)
- **Privacy Policy:** [View on Notion](https://gray-marlin-55c.notion.site/RunCheck-Privacy-Policy-3280818539eb80168b7cc7dd061f3d09)
