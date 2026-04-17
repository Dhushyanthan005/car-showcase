// Mock test drives database
export const testDrives = [
  { id: 1, user_id: 1, car_id: 1, dealer_id: 1, user_name: "John Doe", car_info: "Toyota Camry 2022", date: "2024-01-20", status: "pending", phone: "+1 555-1000", message: "Very interested" },
  { id: 2, user_id: 2, car_id: 2, dealer_id: 1, user_name: "Alice Johnson", car_info: "Honda Civic 2023", date: "2024-01-21", status: "accepted", phone: "+1 555-1001", message: "" },
  { id: 3, user_id: 1, car_id: 3, dealer_id: 2, user_name: "John Doe", car_info: "Ford Mustang 2022", date: "2024-01-22", status: "pending", phone: "+1 555-1000", message: "Please contact" },
];

export let nextTestDriveId = 4;

export const addTestDrive = (testDrive) => {
  const newTestDrive = { ...testDrive, id: nextTestDriveId++ };
  testDrives.push(newTestDrive);
  return newTestDrive;
};

export const updateTestDriveStatus = (id, status) => {
  const testDrive = testDrives.find(t => t.id === id);
  if (!testDrive) return null;
  testDrive.status = status;
  return testDrive;
};

export const getTestDrivesByDealer = (dealer_id) => {
  return testDrives.filter(t => t.dealer_id === dealer_id);
};

export const getTestDrivesByUser = (user_id) => {
  return testDrives.filter(t => t.user_id === user_id);
};

export const deleteTestDrive = (id) => {
  const index = testDrives.findIndex(t => t.id === id);
  if (index === -1) return false;
  testDrives.splice(index, 1);
  return true;
};
