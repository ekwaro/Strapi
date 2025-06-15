module.exports = async () => {
 
    const seed = require('../../scripts/generate-strapi-data');
    await seed();
  
};