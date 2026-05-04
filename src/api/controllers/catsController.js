import * as model from '../models/catsModel.js';

export async function getCats(req, res, next) {
  try {
    const cats = await model.listAllCats();
    res.json(cats);
  } catch (err) {
    next(err);
  }
}

export async function getCat(req, res, next) {
  try {
    const cat = await model.findCatById(req.params.id);
    if (!cat) return next({status: 404, message: 'Cat not found'});
    res.json(cat);
  } catch (err) {
    next(err);
  }
}

export async function getCatsByUserId(req, res, next) {
  try {
    const cats = await model.findCatsByUserId(req.params.userId);
    res.json(cats);
  } catch (err) {
    next(err);
  }
}

export async function createCat(req, res, next) {
  try {
    const newCat = await model.addCat({
      ...req.body,
      // DB requires filename to be non-null, so use a placeholder when no file was uploaded.
      filename: req.file?.filename ?? 'no-image.png',
    });
    res.status(201).json(newCat);
  } catch (err) {
    next(err);
  }
}

export async function updateCat(req, res, next) {
  try {
    const existingCat = await model.findCatById(req.params.id);
    if (!existingCat) return next({status: 404, message: 'Cat not found'});
    const auth = res.locals.user;
    if (!auth) return next({status: 401, message: 'Unauthorized'});
    if (
      auth.role !== 'admin' &&
      Number(auth.user_id) !== Number(existingCat.owner)
    ) {
      return next({status: 403, message: 'Forbidden'});
    }

    const updatedCat = await model.modifyCat(
      {
        ...existingCat,
        ...req.body,
        filename: req.file?.filename ?? existingCat.filename,
      },
      req.params.id,
      auth
    );
    res.json(updatedCat);
  } catch (err) {
    next(err);
  }
}

export async function deleteCat(req, res, next) {
  try {
    const auth = res.locals.user;
    if (!auth) return next({status: 401, message: 'Unauthorized'});

    const existingCat = await model.findCatById(req.params.id);
    if (!existingCat) return next({status: 404, message: 'Cat not found'});
    if (
      auth.role !== 'admin' &&
      Number(auth.user_id) !== Number(existingCat.owner)
    )
      return next({status: 403, message: 'Forbidden'});

    const deletedCat = await model.removeCat(req.params.id, auth);
    if (!deletedCat) return next({status: 404, message: 'Cat not found'});

    res.json(deletedCat);
  } catch (err) {
    next(err);
  }
}
