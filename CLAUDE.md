# breezelaundry — Project Intelligence

## Brand identity
breezelaundry should feel like an **invisible operating system for clothing care**.
Not a dry cleaner. Not a marketplace. Not a delivery startup.

Benchmark brands: Stripe (infrastructure confidence), Linear (precision), Uber (operational clarity), Paystack (African tech trust), Notion (calm whitespace).

Remain softer and more domestic than enterprise SaaS.

---

## Tech stack
- **Web:** Next.js, Tailwind CSS, shadcn/ui, Framer Motion
- **Forms:** Formik + Yup
- **Icons:** @iconify/react — Lucide icon set (`lucide:*`), 2px stroke, rounded
- **Data:** @notionhq/client via Next.js API routes
- **Class merging:** clsx
- **Mobile:** React Native, Expo, NativeWind or Tamagui, Zustand, React Query, Reanimated

---

## Design tokens

### Colors
```
primary:  #4694D8   — buttons, active states, links, highlights
navy:     #0F172A   — headings, high-emphasis text, icons, navigation
bg:       #F5F7FA   — app backgrounds, cards, containers
white:    #FFFFFF
success:  #22C55E   — delivery completed
warning:  #F59E0B   — pickup pending / delayed
error:    #EF4444   — missing item / failed payment
info:     #3B82F6   — tracking updates
```

### Neutral scale
```
900  #0F172A
800  #1E293B
700  #334155
600  #475569
500  #64748B
400  #94A3B8
300  #CBD5E1
200  #E2E8F0
100  #F1F5F9
50   #F8FAFC
```

### Border radius (soft corners always)
```
inputs:        12px
cards:         16px
modals:        24px
buttons:       14px
bottom sheets: 28px
```
Never use sharp edges.

### Spacing (8pt grid)
```
xs   4px
sm   8px
md   16px
lg   24px
xl   32px
2xl  40px
3xl  48px
```

### Shadows — subtle only
```css
box-shadow: 0px 1px 2px rgba(15,23,42,0.04), 0px 4px 12px rgba(15,23,42,0.06);
```
Never heavy. Never glassy.

### Typography
- **Display/headings:** Sora
- **Body/UI:** DM Sans (preferred), Inter, or Geist
- Scale: Hero 40/700 · H1 32/700 · H2 24/600 · H3 20/600 · Body 16/400 · Small 14/400 · Caption 12/500
- **Never ALL CAPS in UI.** Sentence case throughout.
- Generous line height. Large spacing around headings. The UI should breathe.

---

## Component rules

### Buttons
- Primary: `#4694D8` background, white text, medium shadow, height 52px, radius 14px
- Secondary: white background, `#E2E8F0` border, navy text
- Destructive: soft red background, red text
- One primary action per screen — never competing CTAs

### Inputs
- Height: 56px · Border-radius: 14px · Padding: 16px
- Feel: spacious, premium, easy to scan
- Focus ring: subtle blue glow

### Cards
- Primary UI primitive
- Large radius (16px) · High padding · Minimal borders · Subtle shadow only

### Motion
- Style: calm, predictable, gentle — never flashy
- Tap: 120ms · Modal: 220ms · Page transition: 260ms
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`

---

## Logo usage
- **Primary:** Blue icon + dark navy wordmark on light neutral background (default web/app)
- **Secondary:** White wordmark on blue background — splash screens, headers, marketing
- Clear space: icon circle height × 1.5
- Min width: mobile 120px · web 140px · print 30mm
- **Never:** rotate, add gradients, add shadows, stretch, use multiple blues, place on noisy photography

---

## UI principles

1. **One primary action per screen.** "What is the next thing the user should do?"
2. **Reduce cognitive load.** The UI must summarize, automate, and reassure.
3. **Confidence over excitement.** Design like trusted infrastructure — not food delivery or crypto.

---

## Tone of voice
- Speaks: clearly, softly, operationally
- Never: overly playful, slang-heavy, corporate stiff

```
✅ Pickup confirmed. Your laundry is on the way.
❌ Woohoo! Your drip is getting cleaned.
```

---

## Iconography
- Lucide or Heroicons
- Outline style · Rounded strokes · 2px consistent stroke weight

---

## Accessibility
- WCAG AA minimum contrast
- 44px minimum touch targets
- Dynamic font scaling support
- VoiceOver / TalkBack compatible

---

## Empty states
Reassure, don't alarm.
```
No active orders.
Your next pickup is Thursday at 9AM.
```

---

## Notifications — reduce anxiety
Priority order: Pickup confirmed → Rider arriving → Laundry completed → Delivery nearby → Missing item issue
Tone: factual, reassuring.

---

## Web app layout
- Left sidebar: Dashboard · Orders · Wardrobe · Vendors · Billing · Support
- Main area: large whitespace, card-based layouts
- Feel: dashboard / logistics / trust — not social media

---

## Mobile app structure (React Native)
Bottom tabs: Home (orders + status) · Wardrobe · Track · Payments · Account

Home screen:
- Greeting: "Good evening, Michael"
- Large status card: "Laundry in progress · Picked up 45 mins ago · Track live →"
- Quick actions: Schedule pickup · Repeat last order · Voice order · WhatsApp support
- Upcoming schedule: "Weekly pickup · Every Thursday · 9AM–11AM"