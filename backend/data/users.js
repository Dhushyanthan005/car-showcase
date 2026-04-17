// Mock users database
export const users = [
  { id: 1, name: "John Doe", email: "user@demo.com", password: "password", role: "user", phone: "+1 555-1000" },
  { id: 2, name: "Alice Johnson", email: "alice@demo.com", password: "password", role: "user", phone: "+1 555-1001" },
  { id: 3, name: "AutoPlex Motors", email: "dealer@demo.com", password: "password", role: "dealer", phone: "+1 555-0101" },
  { id: 4, name: "Elite Cars", email: "elite@demo.com", password: "password", role: "dealer", phone: "+1 555-0202" },
  { id: 5, name: "Prime Auto", email: "prime@demo.com", password: "password", role: "dealer", phone: "+1 555-0303" },
  { id: 6, name: "Admin", email: "admin@demo.com", password: "password", role: "admin", phone: "+1 555-9999" },
];

export let nextUserId = 7;

export const findUserByEmail = (email) => {
  return users.find(u => u.email === email);
};

export const findUserById = (id) => {
  return users.find(u => u.id === id);
};

export const addUser = (user) => {
  const newUser = { ...user, id: nextUserId++ };
  users.push(newUser);
  return newUser;
};

export const getUsersWithRole = (role) => {
  return users.filter(u => u.role === role);
};

// Export without password
export const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, ...rest } = user;
  return rest;
};
