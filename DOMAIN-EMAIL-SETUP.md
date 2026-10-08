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

## Free email forwarding

Requested routing: info@aurastudiowarsaw.com -> aurastudiowarszawa@gmail.com
Use ImprovMX Free ($0): one domain, 25 aliases, up to 500 forwarded messages per day. No paid Hostinger mailbox is required. Keep the domain's existing Hostinger nameservers.

1. Create or sign into a free account at https://app.improvmx.com/ and add aurastudiowarsaw.com.
2. Add the alias info with destination aurastudiowarszawa@gmail.com and complete any email/account verification requested.
3. In Hostinger > Domains > Domain Portfolio > aurastudiowarsaw.com > DNS / Nameservers > Manage DNS records, add the records below. Copy the domain's actual recommended values from the ImprovMX dashboard if they differ.

| Type | Name | Value | Priority |
| --- | --- | --- | --- |
| MX | @ | mx1.improvmx.com | 10 |
| MX | @ | mx2.improvmx.com | 20 |
| TXT | @ | v=spf1 include:spf.improvmx.com ~all | - |

Only one SPF record may exist at the root. If an existing SPF record is present, merge the ImprovMX include into it rather than creating a second record. Remove other MX records only after confirming they are not supporting an existing mail service. Preserve the website A and verification TXT records.

4. In ImprovMX, run the DNS check until it reports Email forwarding active.
5. Send a test from another email account to info@aurastudiowarsaw.com and verify delivery in aurastudiowarszawa@gmail.com.
6. Once verified, set the contact email in the studio admin to info@aurastudiowarsaw.com. The website currently displays Gmail until forwarding is working.

This free setup forwards incoming messages. Sending as info through ImprovMX SMTP is not included in the Free plan.

Status: prepared, not activated; account setup and DNS changes are still needed.
Official pricing: https://www.improvmx.com/pricing/
Official Hostinger guide: https://www.improvmx.com/guides/hostinger/

## Google reviews

The website links to the Google business profile supplied by the owner: https://www.google.com/search?q=aura+studio+warsaw&kgmid=%2Fg%2F11z2skcbdv
It does not publish unverified ratings or review quotations. To display actual review cards, connect the studio's Google Business Profile through Windsor.ai, or provide verified review text and reviewer attribution for a manually maintained selection.
