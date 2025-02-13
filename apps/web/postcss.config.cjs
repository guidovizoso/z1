const { join } = require("node:path");

module.exports = {
  plugins: {
    "@tailwindcss/postcss": {
      base: join(__dirname, "../../"),
    },
  },
};
