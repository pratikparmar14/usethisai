# Deployment Guide - UseThisAI

## 🚀 QUICK DEPLOY TO VERCEL

### Step 1: Prepare for Deployment

1. **Update domain in sitemap.ts**
   - Change `https://usethisai.com` to your actual domain
   - File: `app/sitemap.ts` (lines 15, 17, 22)

2. **Add OpenAI API key** (optional, for Phase 8)
   - Get key from: https://platform.openai.com/api-keys
   - Add to `.env.local`: `OPENAI_API_KEY="sk-..."`

3. **Update analytics** (optional)
   - Add Plausible/PostHog setup in `app/layout.tsx`

### Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: UseThisAI programmatic SEO site"
git branch -M main
git remote add origin https://github.com/yourusername/usethisai.git
git push -u origin main
```

### Step 3: Deploy to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure environment variables:
   ```
   DATABASE_URL=postgresql://...
   OPENAI_API_KEY=sk-... (optional)
   ```
4. Click **Deploy**

That's it! Your site is live.

## 🔍 POST-DEPLOYMENT CHECKLIST

### Search Console
- [ ] Go to https://search.google.com/search-console
- [ ] Add property with your domain
- [ ] Submit sitemap: `https://yourdomain.com/sitemap.xml`
- [ ] Request indexing for top 10 professions

### Bing Webmaster Tools
- [ ] Go to https://www.bing.com/webmasters
- [ ] Add your site
- [ ] Submit sitemap

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Enable Vercel Analytics
- [ ] Set up uptime monitoring

## 📊 EXPECTED PERFORMANCE

- **FCP (First Contentful Paint):** < 1s
- **LCP (Largest Contentful Paint):** < 2.5s
- **CLS (Cumulative Layout Shift):** < 0.1
- **Sitemap Size:** ~500 URLs
- **Page Load Time:** 2-4s (first visit), <1s (cached)

## 🎯 LAUNCH TIMELINE

- **Day 1:** Deploy to Vercel
- **Day 2:** Submit to Google Search Console
- **Day 3-7:** Wait for crawling (Google indexes ISR pages fast)
- **Week 2:** Monitor rankings & traffic
- **Week 3:** Optimize based on analytics

## 💡 MONETIZATION SETUP

### Affiliate Links
- Update affiliate URLs in seed data
- Currently: `/ai-tools-for/slug?ref=usethisai`
- Change to your affiliate links

### Email Capture
- Add ConvertKit/Substack form to CTA sections
- Gate tool discounts behind email signup

### Display Ads
- Apply for Google AdSense
- Add ad code to top/bottom of money pages
- Expected: $0.5-2 per 1000 views (depends on traffic)

## 📈 TRAFFIC PROJECTIONS

```
Month 1: 0-100 visits (if indexed)
Month 2: 100-1,000 visits
Month 3: 500-2,000 visits
Month 6: 2,000-10,000 visits
Month 12: 10,000-50,000 visits
```

**Monetization starts at 1,000 views/month**

## 🛠 TROUBLESHOOTING

### Pages not indexing?
- Check sitemap: `https://yourdomain.com/sitemap.xml`
- Check robots.txt: `https://yourdomain.com/robots.txt`
- Request indexing in Google Search Console

### Slow builds?
- Vercel builds are typically < 30 seconds
- Check Database query performance
- Enable Vercel Edge Caching

### Database connection errors?
- Verify DATABASE_URL in Vercel settings
- Test connection locally: `npx prisma db execute --stdin`
- Check Neon dashboard for active connections

## 📞 SUPPORT

- Vercel: https://vercel.com/support
- Neon: https://neon.tech/docs
- Prisma: https://www.prisma.io/docs
- Next.js: https://nextjs.org/docs

---

Ready to deploy? Run: `git push` and watch your site go live! 🚀
