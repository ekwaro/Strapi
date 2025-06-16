const axios = require('axios');
const { faker } = require('@faker-js/faker');

// === CONFIGURATION ===
const API_URL = 'https://news-feed-vooc.onrender.com/api';
const API_TOKEN = '0c36869b3d581644f2946ec372a77db79b163e390629ff6b7147a35b85af8b2f67112e28159223a0d586f94bec912aa2a185100b4b269f71a757f75525b42d6d6d01c663ab7853e4f8bf15366ee821f61672a438b6c93524c705ea887a343d80e354194de7ef9252fc1270c1688f36e1880b784c7502920578b5b030445d7983'
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