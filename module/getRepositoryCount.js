const axios = require('axios');

const githubAPI = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    'Authorization': `token ${process.env.GITTOKEN}`,
  },
});

async function getRepositoryCount() {
  try {
    const response = await githubAPI.get('/user/repos');
    return response.data.length;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRepositoryCount,
};
