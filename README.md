# Aura Studio Warsaw — first website draft

Open dist/index.html in a browser to review the site locally.

## Included
- Responsive editorial layout; Polish/English language switch.
- Two proposed paths: studio rental and sessions with a photographer.
- Filterable gallery with keyboard-accessible image lightbox.
- Booking enquiry composer with date validation, copy action and Instagram handoff.
- Local FAQ chatbot. It does not use AI or claim access to live availability.

## Replace photographs
Create dist/images and add your photographs there. In dist/app.js, replace the empty AURA.images.hero and AURA.images.studio values with image paths (for example images/studio-01.jpg). Add paths for each AURA.gallery entry and update its Polish and English caption. Empty or missing images retain explicit photo placeholders.

## Still needed for a production launch
Confirm the two business offerings, service descriptions, exact address, pricing, equipment, booking/cancellation policies and photo captions. The creative copy and service categories are draft proposals, not independently verified company claims. Instagram blocked research access.

The booking form currently creates a message for the visitor to send on Instagram. It does not submit, store, or confirm bookings. Connect your actual booking provider to add live slots, confirmations and payments. Replace the FAQ helper with a server-backed AI integration if an AI chatbot is desired.

No original note was changed. No form data is stored or transmitted by this draft.
