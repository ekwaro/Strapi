module.exports = async () => {
  if (process.env.NODE_ENV === 'production') {
    const seed = require('../../scripts/generate-strapi-data');
    await seed();
  }
};