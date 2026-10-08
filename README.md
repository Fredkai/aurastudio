# Aura Studio Warsaw

Complete full-stack studio website. All application source is in this folder.

## Run locally

Use Node 20 or newer.

    npm install
    npm run build
    npm run dev

Website: http://127.0.0.1:8787
Admin: http://127.0.0.1:8787/admin

The local runner applies generated migrations and stores local database and photos under `.local-state`. Local admin access is allowed only on loopback hosts by the development runner. Production admin access is restricted to the configured owner email through Sites sign-in. Never enable LOCAL_DEV in production.

## What works

- Responsive minimalist photography site, Polish and English.
- Database-backed studio details, prices, equipment, and booking terms.
- Day, start-time and duration selection with persisted booking requests and reference numbers. Studio rental is 150 PLN/hour for 1-24 whole hours within one day; photography is 150 PLN/30 minutes or 250 PLN/hour.
- Atomic conflict protection across both services: an active request holds its entire time range. The public monthly calendar returns only booked/blocked time ranges, never customer details.
- Admin confirmation, decline, and cancellation. Cancelling or declining reopens availability.
- Admin calendar: publish slots, block and reopen them; overlapping slots are rejected.
- Photo uploads to object storage, gallery filtering, lightbox, and hero/studio image selection.
- Server-backed FAQ assistant using saved information and current availability.
- Server-side admin authorization, same-origin write checks, booking/chat rate limits, input validation, and restricted photo formats.

## Studio setup

Open `/admin` while signed in as the Site owner. Upload real photos in Photography, set hero and studio images, save contact details and studio copy under Studio content, manage blocked times in Availability and confirm or decline requests under Bookings. Visitors can request any future unoccupied time without prepublished slots. Times use Europe/Warsaw; green means available to request, red means booked/blocked, and dark means selected. Bookings require studio confirmation, so displayed free hours are not a promise of studio opening hours.

Requests are pending until the studio approves them. Contact customers using the email/phone links in the dashboard. This release does not send automatic emails, take payments, or call a generative AI provider. The chat assistant is explicitly labelled as a studio FAQ assistant.

The confirmed offers are studio rental and photography sessions at the rates above. No sample bookings or availability are seeded into production. The original AURA STUDIO.txt note is preserved outside this folder.

## Project map

- `public/`: visitor and admin HTML, CSS, JavaScript, favicon.
- `worker/index.js`: backend routes and business logic.
- `db/schema.ts`: database schema.
- `drizzle/`: generated production migrations and immutable history.
- `scripts/build.mjs`: deterministic frontend/Worker build.
- `scripts/dev.mjs`: persistent local database and photo storage runner.
- `tests/`: real storage/API and frontend integration tests.
- `.openai/hosting.json`: existing Site identity and D1/R2 bindings.

## Validation

    npm test
    node scripts/validate-artifact.mjs

16 integration checks cover actual local D1/R2 storage, concurrent bookings, authorization, cancellation, uploaded media, assistant responses, frontend submission/admin actions, and safe content rendering. DOM interaction tests do not perform screenshot or browser-layout validation.
