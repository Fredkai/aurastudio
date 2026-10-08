# Aura Studio Warsaw domain and email setup

Website domain: aurastudiowarsaw.com
Booking page: https://aurastudiowarsaw.com/booking (pending DNS verification)
Current public site: https://aura-studio-warsaw.millimationltd.chatgpt.site

## Website DNS

The domain currently uses Hostinger nameservers. In its DNS zone, set the following records. Replace existing apex website A/AAAA records that point elsewhere; preserve unrelated email, TXT, and verification records.

| Type | Host / name | Value |
| --- | --- | --- |
| A | @ | 162.159.143.30 |
| A | @ | 172.66.3.26 |
| TXT | _openai-site-verification | openai-site-verification=Uh2Hch7WVZTJqftB53WDyISMjjzaqTvijl7-coLFciw |
| TXT | _cf-custom-hostname | 6e96c1f5-b8ff-4cbf-bd88-3c9e3542b639 |

These records were returned by Sites for this exact domain. DNS and certificate verification are pending. After saving, refresh custom-domain status through Sites and confirm active HTTPS before sharing the domain.

## Email

Requested routing: info@aurastudiowarsaw.com -> aurastudiowarszawa@gmail.com
No MX records were returned by the DNS check; email is not configured or verified.

1. In Hostinger Emails, activate the email service for aurastudiowarsaw.com if needed, then create the info mailbox. A domain purchase alone does not confirm an email plan exists.
2. Use the mail provider's Connect domain instructions to add its actual MX, SPF, and DKIM records. Do not invent mail records or change the website A records.
3. In Emails > aurastudiowarsaw.com > Forwarders > Create a forwarder, select info@aurastudiowarsaw.com and destination aurastudiowarszawa@gmail.com. Keep copies enabled.
4. Open the verification email in aurastudiowarszawa@gmail.com and confirm the forwarder.
5. Send a test from another email account to info@aurastudiowarsaw.com and verify delivery in Gmail.
6. Once forwarding is verified, set the studio contact email to info@aurastudiowarsaw.com in /admin under Studio content. The website uses the existing Gmail address until then.

Official forwarding instructions: https://www.hostinger.com/support/1583221-how-to-set-up-a-forwarder-for-hostinger-email/

## Google reviews

The website links to the Google business profile supplied by the owner: https://www.google.com/search?q=aura+studio+warsaw&kgmid=%2Fg%2F11z2skcbdv
It does not publish unverified ratings or review quotations. To display actual review cards, connect the studio's Google Business Profile through Windsor.ai, or provide verified review text and reviewer attribution for a manually maintained selection.
