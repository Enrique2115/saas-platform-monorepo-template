/**
 * @filename: lint-staged.config.mjs
 * @type {import('lint-staged').Configuration}
 */
export default {
  "apps/**/*.{ts,tsx}": ["npx ultracite format", "npx ultracite lint"],
  "packages/**/*.{ts,tsx}": ["npx ultracite format", "npx ultracite lint"],
};
