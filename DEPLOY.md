# Deploy saivishalvarma.com

## Stack

- **Code:** public GitHub repo (portfolio only — not PM Brain)
- **Host:** Vercel
- **Domain:** saivishalvarma.com (GoDaddy)

## GoDaddy DNS (after Vercel shows the domain)

In GoDaddy → **My Products** → **DNS** for `saivishalvarma.com`:

1. Remove conflicting **A** / **CNAME** / **Forwarding** for `@` and `www` if present (parking pages break this).
2. Add:

| Type  | Name | Value                 | TTL  |
|-------|------|-----------------------|------|
| A     | @    | `76.76.21.21`         | 600  |
| CNAME | www  | `cname.vercel-dns.com`| 600  |

If Vercel’s Domains panel shows different targets, use **those** values instead.

3. In Vercel → Project → **Settings → Domains** add:
   - `saivishalvarma.com`
   - `www.saivishalvarma.com` (redirect to apex is fine)

DNS usually works in 5–30 minutes; GoDaddy can take up to 48h.

## Local commands (after `gh auth login`)

```bash
cd "/Users/vishalvarma/Documents/PM Brain/pm-brain/web"
gh repo create saivishalvarma-portfolio --public --source=. --remote=origin --push
npx vercel --prod
npx vercel domains add saivishalvarma.com
```
