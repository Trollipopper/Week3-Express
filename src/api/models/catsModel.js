import { readFile } from 'node:fs/promises';

const fileUrl = new URL('../serve.json', import.meta.url);
let cached = null;

async function loadCats() {
  if (cached) return cached;
  const raw = await readFile(fileUrl, 'utf-8');
  const parsed = JSON.parse(raw);
  const arr = Array.isArray(parsed) ? parsed : [parsed];
  cached = arr.map((c) => ({
    id: c.cat_id ?? c.id ?? c.catId ?? null,
    ...c,
  }));
  return cached;
}

export async function getAllCats() {
  return await loadCats();
}

export async function getCatById(id) {
  const list = await loadCats();
  return list.find((c) => String(c.id) === String(id));
}

export async function addCat(cat) {
  const list = await loadCats();
  const maxId = list.reduce((m, it) => Math.max(m, Number(it.id) || 0), 0);
  const newId = maxId + 1;
  const newCat = { id: newId, ...cat, image: cat.image ?? cat.filename ?? null };
  list.push(newCat);
  return newCat;
}
