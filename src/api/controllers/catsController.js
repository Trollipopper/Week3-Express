import * as model from '../models/catsModel.js';

export async function getCats(req, res) {
  try {
    const cats = await model.listAllCats();
    res.json(cats);
  } catch (err) {
    res.status(500).json({message: 'Failed to load cats'});
  }
}

export async function getCat(req, res) {
  try {
    const cat = await model.findCatById(req.params.id);
    if (!cat) return res.status(404).json({message: 'Cat not found'});
    res.json(cat);
  } catch (err) {
    res.status(500).json({message: 'Failed to load cat'});
  }
}

export async function getCatsByUserId(req, res) {
  try {
    const cats = await model.findCatsByUserId(req.params.userId);
    res.json(cats);
  } catch (err) {
    res.status(500).json({message: 'Failed to load cats'});
  }
}

export async function createCat(req, res) {
  try {
    const newCat = await model.addCat({
      ...req.body,
      filename: req.file?.filename,
    });
    res.status(201).json(newCat);
  } catch (err) {
    res.status(500).json({message: 'Failed to add cat'});
  }
}

export async function updateCat(req, res) {
  try {
    const existingCat = await model.findCatById(req.params.id);
    if (!existingCat) return res.status(404).json({message: 'Cat not found'});

    const updatedCat = await model.modifyCat(
      {
        ...existingCat,
        ...req.body,
        filename: req.file?.filename ?? existingCat.filename,
      },
      req.params.id,
    );
    res.json(updatedCat);
  } catch (err) {
    res.status(500).json({message: 'Failed to update cat'});
  }
}

export async function deleteCat(req, res) {
  try {
    const deletedCat = await model.removeCat(req.params.id);
    if (!deletedCat) return res.status(404).json({message: 'Cat not found'});

    res.json(deletedCat);
  } catch (err) {
    res.status(500).json({message: 'Failed to delete cat'});
  }
}
