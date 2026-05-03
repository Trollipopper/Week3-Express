import express from 'express';
import {readFile} from 'node:fs/promises';

const app = express();

const port = process.env.PORT || 3000;

app.use('/public', express.static('public'));

async function loadCats() {
  const fileUrl = new URL('./serve.json', import.meta.url);
  const raw = await readFile(fileUrl, 'utf-8');
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [parsed];
}

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/api/v1/cats', async (req, res) => {
  try {
    const cats = await loadCats();
    res.json(cats);
  } catch {
    res.status(500).json({message: 'Failed to load cats'});
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
