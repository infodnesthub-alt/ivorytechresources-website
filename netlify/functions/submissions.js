const crypto = require('crypto');

function unauthorized() {
  return {
    statusCode: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Ivory Tech Resources Admin"',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ error: 'Authentication required' })
  };
}

function validBasicAuth(event) {
  const header = event.headers.authorization || event.headers.Authorization || '';
  if (!header.startsWith('Basic ')) return false;
  try {
    const decoded = Buffer.from(header.slice(6), 'base64').toString('utf8');
    const i = decoded.indexOf(':');
    if (i < 0) return false;
    const user = decoded.slice(0, i);
    const pass = decoded.slice(i + 1);
    const expectedUser = process.env.ADMIN_USER || 'admin';
    const expectedPass = process.env.ADMIN_PASSWORD || '';
    if (!expectedPass) return false;
    return user === expectedUser && crypto.timingSafeEqual(Buffer.from(pass), Buffer.from(expectedPass));
  } catch (_) {
    return false;
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers: { Allow: 'GET' }, body: JSON.stringify({ error: 'Method not allowed' }) };
  }
  if (!validBasicAuth(event)) return unauthorized();

  const siteId = process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_AUTH_TOKEN;
  if (!siteId || !token) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Server is not configured. Add NETLIFY_SITE_ID and NETLIFY_AUTH_TOKEN environment variables.' })
    };
  }

  const url = `https://api.netlify.com/api/v1/sites/${encodeURIComponent(siteId)}/submissions?per_page=100`;
  const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const text = await response.text();
  if (!response.ok) {
    return { statusCode: response.status, headers: { 'Content-Type': 'application/json' }, body: text };
  }

  let submissions;
  try { submissions = JSON.parse(text); } catch (_) { submissions = []; }
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify(submissions)
  };
};
