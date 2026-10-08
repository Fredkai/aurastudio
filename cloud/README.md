# Existing Google Cloud VM

Target: vremp-server, project vremp-502313, zone us-east1-b, IP 35.231.224.50.

The website and booking API run in a Node 22 container behind the existing Nginx installation. The container is published only on loopback (127.0.0.1:8787). Its database and photo objects persist on the VM disk at /var/lib/aura-studio and survive container replacement and reboot. Do not delete that directory or its backups.

Nginx terminates HTTPS for aurastudiowarsaw.com and redirects www to the primary domain. Administrator paths use password authentication; the proxy strips visitor-supplied identity headers and sets the configured administrator identity only after successful authentication. LOCAL_DEV is never enabled. The production runner rewrites internal request URLs to the canonical HTTPS origin for same-origin booking checks.

The VM also hosts other domains; deployment adds a separate Aura virtual host and preserves their configuration. Database backups should be taken before replacing this container, and ongoing off-VM backups should be configured before substantial real booking traffic.

Build: docker build -t aura-studio:current .
Run: docker run -d --name aura-studio --restart unless-stopped --publish 127.0.0.1:8787:8787 --volume /var/lib/aura-studio:/data --env PUBLIC_ORIGIN=https://aurastudiowarsaw.com --env ADMIN_EMAILS=aurastudiowarszawa@gmail.com aura-studio:current

The IP is currently ephemeral. Promoting this exact address to a reserved static address keeps DNS stable across stop/start operations; do not substitute a newly allocated address without updating DNS.

Email forwarding uses the existing MX/SPF records and is independent of this web server. Deployment must preserve those records.
