import { STRAPI_DEFAULT_PORT } from "../src/constants";

export default ({ env }) => ({
  host: env('STRAPI_HOST', '0.0.0.0'),
  port: env.int('STRAPI_PORT', STRAPI_DEFAULT_PORT),
  app: {
    keys: env.array('STRAPI_APP_KEYS'),
  },
  url: env('STRAPI_PUBLIC_URL', `http://localhost:${STRAPI_DEFAULT_PORT}`)
});
