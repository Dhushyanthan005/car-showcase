import { testDrives, addTestDrive, updateTestDriveStatus, getTestDrivesByDealer, getTestDrivesByUser, deleteTestDrive } from '../data/testdrives.js';
import { cars } from '../data/cars.js';

export const createTestDrive = (req, res) => {
  const { car_id, dealer_id, name, phone, date, message } = req.body;
  const user = req.user;

  if (!car_id || !dealer_id || !name || !phone || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const car = cars.find(c => c.id === parseInt(car_id));
  if (!car) {
    return res.status(404).json({ error: 'Car not found' });
  }

  const newTestDrive = addTestDrive({
    user_id: parseInt(user.id) || 1,
    car_id: parseInt(car_id),
    dealer_id: parseInt(dealer_id),
    user_name: name,
    car_info: `${car.car} ${car.car_model} ${car.car_model_year}`,
    date,
    status: 'pending',
    phone,
    message: message || ''
  });

  res.status(201).json({
    success: true,
    testDrive: newTestDrive,
    message: 'Test drive request created'
  });
};

export const getTestDrives = (req, res) => {
  const user = req.user;
  
  if (user.role === 'dealer') {
    // Get test drives for this dealer
    const requests = getTestDrivesByDealer(parseInt(user.id) || 1);
    return res.json({
      success: true,
      testDrives: requests,
      count: requests.length
    });
  } else if (user.role === 'user') {
    // Get test drives for this user
    const requests = getTestDrivesByUser(parseInt(user.id) || 1);
    return res.json({
      success: true,
      testDrives: requests,
      count: requests.length
    });
  } else {
    // Admin sees all
    return res.json({
      success: true,
      testDrives: testDrives,
      count: testDrives.length
    });
  }
};

export const getTestDriveById = (req, res) => {
  const { id } = req.params;
  const testDrive = testDrives.find(t => t.id === parseInt(id));

  if (!testDrive) {
    return res.status(404).json({ error: 'Test drive not found' });
  }

  res.json({
    success: true,
    testDrive
  });
};

export const updateTestDrive = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const updated = updateTestDriveStatus(parseInt(id), status);
  
  if (!updated) {
    return res.status(404).json({ error: 'Test drive not found' });
  }

  res.json({
    success: true,
    testDrive: updated,
    message: `Test drive request ${status}`
  });
};

export const deleteTestDrive = (req, res) => {
  const { id } = req.params;
  const success = deleteTestDrive(parseInt(id));

  if (!success) {
    return res.status(404).json({ error: 'Test drive not found' });
  }

  res.json({
    success: true,
    message: 'Test drive deleted'
  });
};
