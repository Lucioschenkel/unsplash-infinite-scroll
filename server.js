import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(__dirname + '/public'));

app.use('/api/photos', async (req, res) => {
  const recordCount = 10;
  const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_API_KEY}&count=${recordCount}&content_filter=high`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(204).json([]);
  }
});

app.listen(Number(process.env.PORT), () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
