require('dotenv').config()

const PORT = 4000 || process.env.PORT;
const API_KEY = process.env.GEMINI_API_KEY;

module.exports = {PORT , API_KEY};