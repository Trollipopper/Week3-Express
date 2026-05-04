import promisePool from '../../utils/database.js';

const listAllCats = async () => {
  const [rows] = await promisePool.query(
    `SELECT c.cat_id, c.cat_name, c.weight, c.owner, c.filename, c.birthdate, u.name AS owner_name
     FROM wsk_cats c
     LEFT JOIN wsk_users u ON c.owner = u.user_id
     ORDER BY c.cat_id`
  );
  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute(
    `SELECT c.cat_id, c.cat_name, c.weight, c.owner, c.filename, c.birthdate, u.name AS owner_name
     FROM wsk_cats c
     LEFT JOIN wsk_users u ON c.owner = u.user_id
     WHERE c.cat_id = ?`,
    [id]
  );

  if (rows.length === 0) {
    return false;
  }

  return rows[0];
};

const findCatsByUserId = async (userId) => {
  const [rows] = await promisePool.execute(
    `SELECT c.cat_id, c.cat_name, c.weight, c.owner, c.filename, c.birthdate, u.name AS owner_name
     FROM wsk_cats c
     LEFT JOIN wsk_users u ON c.owner = u.user_id
     WHERE c.owner = ?
     ORDER BY c.cat_id`,
    [userId]
  );
  return rows;
};

const addCat = async (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
               VALUES (?, ?, ?, ?, ?)`;
  const [result] = await promisePool.execute(sql, [
    cat_name || null,
    weight || null,
    owner || null,
    filename || null,
    birthdate || null,
  ]);

  if (result.affectedRows === 0) {
    return false;
  }

  return {cat_id: result.insertId};
};

const modifyCat = async (cat, id, auth) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;
  if (auth && auth.role !== 'admin') {
    const sql = `UPDATE wsk_cats
                 SET cat_name = ?, weight = ?, owner = ?, filename = ?, birthdate = ?
                 WHERE cat_id = ? AND owner = ?`;
    const [result] = await promisePool.execute(sql, [
      cat_name || null,
      weight || null,
      owner || null,
      filename || null,
      birthdate || null,
      id,
      auth.user_id,
    ]);
    if (result.affectedRows === 0) return false;
    return {message: 'success'};
  }
  const sql = `UPDATE wsk_cats
               SET cat_name = ?, weight = ?, owner = ?, filename = ?, birthdate = ?
               WHERE cat_id = ?`;
  const [result] = await promisePool.execute(sql, [
    cat_name || null,
    weight || null,
    owner || null,
    filename || null,
    birthdate || null,
    id,
  ]);
  if (result.affectedRows === 0) return false;
  return {message: 'success'};
};

const removeCat = async (id, auth) => {
  if (auth && auth.role !== 'admin') {
    const [result] = await promisePool.execute(
      'DELETE FROM wsk_cats WHERE cat_id = ? AND owner = ?',
      [id, auth.user_id]
    );
    if (result.affectedRows === 0) return false;
    return {message: 'success'};
  }
  const [result] = await promisePool.execute(
    'DELETE FROM wsk_cats WHERE cat_id = ?',
    [id]
  );
  if (result.affectedRows === 0) return false;
  return {message: 'success'};
};

export {
  listAllCats,
  findCatById,
  findCatsByUserId,
  addCat,
  modifyCat,
  removeCat,
};
