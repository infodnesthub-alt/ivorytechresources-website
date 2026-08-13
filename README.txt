IVORYTECHRESOURCES — NETLIFY VERSION
=======================================

This version is prepared for Netlify. It removes the PHP backend and uses
Netlify Forms for customer service-request submissions.

HOW IT WORKS
------------
Customer
  -> Website
  -> Service Request Form
  -> Netlify Forms
  -> Netlify Dashboard
  -> Optional email notification

DEPLOYMENT
----------
1. Create a Netlify account.
2. Create a new site from GitHub OR upload this folder.
3. Netlify should automatically detect the form because index.html contains:
       data-netlify="true"
       name="service-request"
4. After deployment, go to:
       Netlify Dashboard -> Your Site -> Forms
   You should see "service-request".
5. Configure email notifications under the form settings/notifications.
6. The successful submission redirects to /thank-you.html.

FILES
-----
index.html       Main website
thank-you.html   Successful submission page
admin.html       Instructions/shortcut to Netlify form management
netlify.toml     Netlify configuration
README.txt       This guide

IMPORTANT
---------
The Netlify version does NOT use PHP, MySQL, or the previous JSON storage.
Netlify stores form submissions in its own Forms system.

VISITOR ANALYTICS
-----------------
For visitor analytics, enable Netlify Analytics in the site's Netlify dashboard
or add an external analytics service such as Google Analytics/Matomo.

ADMIN ACCESS
------------
Netlify's own dashboard is the secure place to manage form submissions.
Do not create a public webpage containing customer submissions.

EMAIL
-----
Configure a Netlify Forms email notification so that new submissions are
sent to your business email address.

BUSINESS DETAILS
----------------
Before launch, replace any placeholder phone number/email/address in the
website with the actual IvoryTechResources details.
