module.exports = [
  'strapi::logger',
  'strapi::errors',
    {
    name: 'strapi::cors',
    config: {
      origin: [
        'https://dashing-cajeta-d5c85c.netlify.app', // ✅ your Netlify site
        'http://localhost:3000' // (optional: for local dev)
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      headers: '*',
    },
  },
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
