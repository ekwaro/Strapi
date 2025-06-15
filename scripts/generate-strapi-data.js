const axios = require('axios');
const { faker } = require('@faker-js/faker');

// === CONFIGURATION ===
const API_URL = 'http://localhost:1337/api';
const API_TOKEN = 'afee3f43363cf7695b0b987c4e3b120c65607c7cb2a97027d606744f020830ff52014c2d6cfe40ad289c08bf29f71c607ac885d4d9a54bdc66265e0b69d0b567bc6b86c060a592e169e2f473c53ba7a79a5bfde462737b90363d88f9438eff3fbbae1b441334dfacc29f0cd4ef6af33a2bcfe06e8fa21f570284ced269a13b5c'; // <-- Replace this

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
          images,             // ✅ Add the image URL
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