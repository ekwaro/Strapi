const axios = require('axios');
const { faker } = require('@faker-js/faker');

// === CONFIGURATION ===
const API_URL = 'https://news-feed-vooc.onrender.com/api';
const API_TOKEN = '20e47008d3b21d79e66c81402880b9124ecdb03c5edd20bd8054e0dad3cb5435739fbded141ffeba85e8f1e83ecf784e8095848813cf718eef2237d0c9379495c9b86420a10783d2fa3e900b653cc76c780a7b152be9107aa540084eae57c4ef6b3c69783ce6c9156ef5da34c8a0bac004e4639d0e9ac3b2c3ed11a41003865b'
const headers = {
  Authorization: `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json',
};

const randomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

const createEntries = async () => {
  try {
    const authors = [];
    for (let i = 1; i <= 7; i++) {
      const name = faker.person.fullName();
      const res = await axios.post(`${API_URL}/authors`, {
        data: { name },
      }, { headers });
      authors.push(res.data.data.id);
      console.log(`✅ Created author: ${name}`);
    }

    const categories = [];
    for (let i = 1; i <= 3; i++) {
      const name = faker.commerce.department();
      const res = await axios.post(`${API_URL}/categories`, {
        data: { name },
      }, { headers });
      categories.push(res.data.data.id);
      console.log(`✅ Created category: ${name}`);
    }

    for (let i = 1; i <= 30; i++) {
      const title = faker.lorem.sentence();
      const content = faker.lorem.paragraphs(3, '\n\n');
      const excerpt = faker.lorem.sentences(2);
      const images = faker.image.urlLoremFlickr({ category: 'nature' });

      const authorId = randomFromArray(authors);
      const categoryId = randomFromArray(categories);

      await axios.post(`${API_URL}/posts`, {
        data: {
          title,
          content,
          excerpt,
          images,             
          author: authorId,
          category: categoryId,
        },
      }, { headers });

      console.log(`📝 Created post ${i}: "${title}"`);
    }

    console.log('🎉 All data created successfully!');
  } catch (err) {
    if (err.response) {
      console.error('❌ Error response:');
      console.error('Status:', err.response.status);
      console.error('Data:', err.response.data);
    } else if (err.request) {
      console.error('❌ No response received:', err.request);
    } else {
      console.error('❌ Script error:', err.message);
    }
  }
};

module.exports = createEntries;