// Mock dealers database
export const dealers = [
  { id: 1, name: "AutoPlex Motors", location: "New York, NY", phone: "+1 555-0101", email: "dealer@demo.com", cars_count: 24, rating: 4.8 },
  { id: 2, name: "Elite Cars", location: "Los Angeles, CA", phone: "+1 555-0202", email: "elite@demo.com", cars_count: 18, rating: 4.6 },
  { id: 3, name: "Prime Auto", location: "Chicago, IL", phone: "+1 555-0303", email: "prime@demo.com", cars_count: 31, rating: 4.9 },
];

export const getDealer = (id) => {
  return dealers.find(d => d.id === id);
};

export const getAllDealers = () => {
  return dealers;
};

export const getDealerByEmail = (email) => {
  return dealers.find(d => d.email === email);
};
