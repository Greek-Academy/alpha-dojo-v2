/** フロントエンドのドメイン
 *
 * 例: localhost
 */
export const HOST = process.env.HOST;

/** Strapi の URL
 *
 * 例: http://localhost:1337
 */
export const STRAPI_URL = process.env.STRAPI_PUBLIC_URL;

/** Strapi の API の URL
 *
 * 例: http://localhost:1337/api
 */
export const STRAPI_API_URL = STRAPI_URL + '/api';

/** Judge0 の API の URL
 *
 * 例: http://localhost:2358
 */
export const JUDGE_API_ENDPOINT = process.env.JUDGE_API_ENDPOINT;
