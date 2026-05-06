import { testDrives, addTestDrive, updateTestDriveStatus, getTestDrivesByDealer, getTestDrivesByUser, deleteTestDrive as removeTestDrive } from '../data/testdrives.js';
import { cars } from '../data/cars.js';
import { query } from '../db/index.js';

export const createTestDrive = async (req, res) => {
  const { car_id, dealer_id, name, phone, date, message } = req.body;
  const user = req.user;

  if (!car_id || !dealer_id || !name || !phone || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  let carInfo = '';
  try {
    if (query) {
      const carResult = await query('SELECT * FROM cars WHERE id = $1', [car_id]);
      if (carResult.rows.length === 0) {
        return res.status(404).json({ error: 'Car not found' });
      }
      const dbCar = carResult.rows[0];
      carInfo = `${dbCar.car} ${dbCar.car_model} ${dbCar.car_model_year}`;

      const insertResult = await query(
        `INSERT INTO testdrives(user_id, car_id, dealer_id, user_name, car_info, date, status, phone, message)
         VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [parseInt(user.id) || 1, parseInt(car_id), parseInt(dealer_id), name, carInfo, date, 'pending', phone, message || '']
      );

      return res.status(201).json({
        success: true,
        testDrive: insertResult.rows[0],
        message: 'Test drive request created'
      });
    }
  } catch (err) {
    console.warn('DB insert failed, falling back to in-memory:', err.message);
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

export const getTestDrives = async (req, res) => {
  const user = req.user;
  
  try {
    if (query) {
      let result;
      if (user.role === 'dealer') {
        result = await query('SELECT * FROM testdrives WHERE dealer_id = $1', [parseInt(user.id) || 1]);
      } else if (user.role === 'user') {
        result = await query('SELECT * FROM testdrives WHERE user_id = $1', [parseInt(user.id) || 1]);
      } else {
        result = await query('SELECT * FROM testdrives');
      }
      return res.json({
        success: true,
        testDrives: result.rows,
        count: result.rows.length
      });
    }
  } catch (err) {
    console.warn('DB query failed, falling back to in-memory:', err.message);
  }
  
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

export const getTestDriveById = async (req, res) => {
  const { id } = req.params;

  try {
    if (query) {
      const result = await query('SELECT * FROM testdrives WHERE id = $1', [id]);
      if (result.rows.length > 0) {
        return res.json({ success: true, testDrive: result.rows[0] });
      } else {
        return res.status(404).json({ error: 'Test drive not found' });
      }
    }
  } catch (err) {
    console.warn('DB query failed, falling back to in-memory:', err.message);
  }

  const testDrive = testDrives.find(t => t.id === parseInt(id));

  if (!testDrive) {
    return res.status(404).json({ error: 'Test drive not found' });
  }

  res.json({
    success: true,
    testDrive
  });
};

export const updateTestDrive = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    if (query) {
      const result = await query('UPDATE testdrives SET status = $1 WHERE id = $2 RETURNING *', [status, id]);
      if (result.rows.length > 0) {
        return res.json({
          success: true,
          testDrive: result.rows[0],
          message: `Test drive request ${status}`
        });
      } else {
        return res.status(404).json({ error: 'Test drive not found' });
      }
    }
  } catch (err) {
    console.warn('DB query failed, falling back to in-memory:', err.message);
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

export const deleteTestDrive = async (req, res) => {
  const { id } = req.params;
  
  try {
    if (query) {
      const result = await query('DELETE FROM testdrives WHERE id = $1', [id]);
      if (result.rowCount > 0) {
        return res.json({ success: true, message: 'Test drive deleted' });
      } else {
        return res.status(404).json({ error: 'Test drive not found' });
      }
    }
  } catch (err) {
    console.warn('DB query failed, falling back to in-memory:', err.message);
  }

  const success = removeTestDrive(parseInt(id));

  if (!success) {
    return res.status(404).json({ error: 'Test drive not found' });
  }

  res.json({
    success: true,
    message: 'Test drive deleted'
  });
};
