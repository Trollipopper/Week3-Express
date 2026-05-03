import * as model from '../models/catsModel.js';

export async function getCats(req, res) {
  try {
    const cats = await model.getAllCats();
    res.json(cats);
  } catch (err) {
    res.status(500).json({message: 'Failed to load cats'});
  }
}

export async function getCat(req, res) {
  try {
    const cat = await model.getCatById(req.params.id);
    if (!cat) return res.status(404).json({message: 'Cat not found'});
    res.json(cat);
  } catch (err) {
    res.status(500).json({message: 'Failed to load cat'});
  }
}

export async function createCat(req, res) {
  try {
    console.log(req.body);
    console.log(req.file);
    const newCat = await model.addCat({
      ...req.body,
      image: req.file?.filename,
    });
    res.status(201).json(newCat);
  } catch (err) {
    res.status(500).json({message: 'Failed to add cat'});
  }
}
