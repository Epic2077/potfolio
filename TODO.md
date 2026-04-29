# Epic2077 — Portfolio Todo List

## 🔴 Critical Bugs

- [x] **`next.config.mjs`** — Remove `ignoreBuildErrors: true` and `ignoreDuringBuilds: true`. TypeScript and ESLint errors are silently swallowed on every build.
- [x] **`next.config.mjs`** — Set `productionBrowserSourceMaps` to `false`. Currently exposes full source code in production DevTools.
- [x] **`page.tsx`** — Remove `'use client'` from the root page. Forces the entire tree client-side, disabling SSR and breaking SEO / social link previews.
- [ ] **`ContactSection.tsx`** — Replace the mock `setTimeout` with a real email service (Resend, Formspree, or EmailJS). Messages currently go nowhere. _(needs API key / service choice)_
- [ ] **`ProjectsSection.tsx` / `ContactSection.tsx`** — Replace all `href="#"` placeholders with real URLs for project demos, GitHub repos, LinkedIn, and Twitter/X. _(needs your URLs)_

---

## 🟠 Medium Bugs

- [x] **`Header.tsx`** — Wire up `activeSection` state with an IntersectionObserver. It's initialized to `''` and never updated, so the active nav highlight never fires.
- [x] **`CustomCursor.tsx`** — Add `mouseenter`/`mouseleave` cleanup in the `useEffect` return. Currently only `mousemove` is removed, causing a memory leak on long sessions.
- [x] **`CustomCursor.tsx`** — Hide the cursor elements on touch/mobile devices. They render at `(0,0)` when no mouse is present.
- [x] **`Footer.tsx`** — Guard `window.scrollTo` behind a client-side check or convert to `'use client'`. Will throw a hydration error as-is.
- [x] **`not-found.tsx`** — Replace `text-onBackground` with `text-foreground`. `--on-background` is not defined in the theme and the class does nothing.

---

## 🟡 Minor Bugs

- [ ] **`LoadingScreen.tsx`** — Add a `sessionStorage` flag so the loading animation is skipped on repeat visits within the same session.
- [ ] **`public/`** — Add a real `favicon.ico`. `layout.tsx` references it but it doesn't exist; the browser tab shows a broken icon.
- [ ] **`layout.tsx`** — Replace the Open Graph image (`app_logo.png`) with a proper 1200×630 banner image for correct social media previews.
<!-- - [ ] **Root** — Add a `.env.example` file documenting `NEXT_PUBLIC_SITE_URL` and any other env variables. -->

---

## 🟢 Features to Add

### High Impact

- [ ] **Resume download** — Add a "Download CV" button in the Hero or About section. Required by most recruiters.
- [ ] **Real contact form backend** — Wire `ContactSection` to an actual email API with server-side validation and basic rate limiting.
- [ ] **`prefers-reduced-motion` support** — Wrap canvas animations, RAF loops, parallax, and CSS keyframes in a `useReducedMotion` check for accessibility.
- [ ] **Active nav tracking** — Complete the `activeSection` IntersectionObserver in `Header.tsx` (the state is already there).

### Medium Impact

- [ ] **Real profile photo** — Replace the Unsplash stock "dark workspace with LEDs" image in `AboutSection` with a personal photo. Add a `blurDataURL` for smooth loading.
- [ ] **`⌘K` command palette** — `NovaStarOrb` advertises pressing `⌘K` but nothing happens. Build a simple command palette (jump to section, copy email, open GitHub) or remove the hint.
- [ ] **Skip / one-time loading screen** — Let users press `Escape` to skip `LoadingScreen`, and persist the skip state in `sessionStorage`.
- [ ] **Testimonials section** — Add 2–3 short quotes from colleagues or Maktab Sharif students for credibility.
- [ ] **Animated stat counters** — Count-up animation for `4+`, `20+`, `5` stats in `HeroSection` when they scroll into view.

### Polish

- [ ] **ARIA accessibility** — Add proper `role`, `aria-label`, and keyboard support to the Experience timeline, project cards, and Skills tabs.
- [ ] **Scroll-to-top button** — Standard for long single-page sites.
- [ ] **Project filter by tech stack** — Tag-based filtering in `ProjectsSection`.
- [ ] **`/blog` or `/writing` route** — A placeholder writing section improves SEO surface area and signals depth.
