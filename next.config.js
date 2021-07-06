require('dotenv').config();
const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  env: {
    customKey: process.env.MY_KEY,
  },
  async rewrites() {
    return [
      {
        source: '/about',
        destination: '/',
      },
      {
        source: '/news/:slug',
        destination: '/posts/:slug',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/blog/:slug*',
        destination: '/news/:slug*', // Matched parameters can be used in the destination
        permanent: true,
      },
    ]
  },
};
