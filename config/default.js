/**
 * Created by sandeepkumar on 16/05/17.
 */
require('dotenv').config(); // eslint-disable-line import/no-extraneous-dependencies
const path = require('path');

// Default configuations applied to all environments
module.exports = {
  TEST: process.env.NODE_ENV === 'test',
  DEVELOPMENT: process.env.NODE_ENV === 'development',
  PRODUCTION: process.env.NODE_ENV === 'production',
  TARGETING_URL: process.env.TARGETING_URL,
  ROOT: path.normalize(path.join(__dirname, '/..')),
  PORT: process.env.PORT || 8000,
  DATABASE_URL: process.env.DATABASE_URL,
  LOGIN_URL: process.env.LOGIN_URL,
  CALLBACK_URL: process.env.CALLBACK_URL,
  HOME_PAGE_URL: process.env.HOME_PAGE_URL,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
};
