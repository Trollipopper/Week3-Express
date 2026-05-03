const userItems = [
  {
    user_id: 3609,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 3610,
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@metropolia.fi',
    role: 'user',
    password: 'password2',
  },
];

export function getAllUsers() {
  return userItems;
}

export function getUserById(id) {
  return userItems.find((u) => String(u.user_id) === String(id));
}

export function addUser(user) {
  const maxId = userItems.reduce((m, it) => Math.max(m, Number(it.user_id) || 0), 3609);
  const newId = maxId + 1;
  const newUser = { user_id: newId, ...user };
  userItems.push(newUser);
  return newUser;
}
