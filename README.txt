IVORY TECH RESOURCES — NETLIFY VERSION + REQUEST DASHBOARD

This package contains the supplied engineering website design, a Netlify Forms service-request form, a protected staff request dashboard, and a Netlify Function that reads real Netlify Form submissions.

DEPLOYMENT
1. Upload/replace the files in your GitHub repository.
2. Keep the images/ folder exactly as supplied.
3. In Netlify, set these environment variables for the site:
   NETLIFY_SITE_ID = your Netlify site ID
   NETLIFY_AUTH_TOKEN = a Netlify personal access token with access to the site
   ADMIN_USER = your dashboard username (example: admin)
   ADMIN_PASSWORD = a strong dashboard password
4. Redeploy the site.
5. Open /admin.html or /admin.

The public contact form is named "service-request" and submits through Netlify Forms.

NOTE
The dashboard reads real Netlify Forms submissions through the server-side Netlify Function. Status labels are stored in the browser's local storage; Netlify's form submission records themselves are not modified by the dashboard.
