import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.query(
    `SELECT user_id, name, username, email, role, password
     FROM wsk_users
     ORDER BY user_id`
  );
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    `SELECT user_id, name, username, email, role, password
     FROM wsk_users
     WHERE user_id = ?`,
    [id]
  );

  if (rows.length === 0) {
    return false;
  }

  return rows[0];
};

const addUser = async (user) => {
  const {name, username, email, role, password} = user;
  const sql = `INSERT INTO wsk_users (name, username, email, role, password)
               VALUES (?, ?, ?, ?, ?)`;
  const [result] = await promisePool.execute(sql, [
    name,
    username,
    email,
    role,
    password,
  ]);

  if (result.affectedRows === 0) {
    return false;
  }

  return {user_id: result.insertId};
};

const modifyUser = async (user, id) => {
  const {name, username, email, role, password} = user;
  const sql = `UPDATE wsk_users
               SET name = ?, username = ?, email = ?, role = ?, password = ?
               WHERE user_id = ?`;
  const [result] = await promisePool.execute(sql, [
    name,
    username,
    email,
    role,
    password,
    id,
  ]);

  if (result.affectedRows === 0) {
    return false;
  }

  return {message: 'success'};
};

const removeUser = async (id) => {
  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();
    await connection.execute('DELETE FROM wsk_cats WHERE owner = ?', [id]);
    const [result] = await connection.execute(
      'DELETE FROM wsk_users WHERE user_id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      await connection.rollback();
      return false;
    }

    await connection.commit();
    return {message: 'success'};
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export {listAllUsers, findUserById, addUser, modifyUser, removeUser};
// Additional helper
const findUserByUsername = async (username) => {
  const [rows] = await promisePool.execute(
    `SELECT user_id, name, username, email, role, password
     FROM wsk_users
     WHERE username = ?`,
    [username]
  );
  if (rows.length === 0) return false;
  return rows[0];
};

export {findUserByUsername};
