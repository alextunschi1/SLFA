// NO ES6 HERE as it's used by several binaries not using babel
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(process.cwd(), "./.env") });
//listen to port 4444
const port = parseInt(process.env.PORT) || 4444;
module.exports = {
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  PORT: port,
  SITE_URL: process.env.SITE_URL || `http://localhost:${port}`,
};
