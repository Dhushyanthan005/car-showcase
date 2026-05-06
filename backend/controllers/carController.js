import { cars, addCar, updateCar, deleteCar } from '../data/cars.js';
import { getDealer } from '../data/dealers.js';
import { query } from '../db/index.js';

export const getAllCars = async (req, res) => {
  const { brand, year, maxPrice, search } = req.query;

  // If DB is available, query it. Otherwise fall back to in-memory array.
  try {
    const conditions = [];
    const params = [];
    if (brand && brand !== 'All') { params.push(`%${brand}%`); conditions.push(`car ILIKE $${params.length}`); }
    if (year && year !== 'All') { params.push(parseInt(year)); conditions.push(`car_model_year = $${params.length}`); }
    if (maxPrice) { params.push(parseInt(maxPrice)); conditions.push(`CAST(price AS INTEGER) <= $${params.length}`); }
    if (search) { params.push(`%${search}%`); conditions.push(`(car || ' ' || car_model) ILIKE $${params.length}`); }

    let sql = 'SELECT * FROM cars';
    if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');

    if (query) {
      const result = await query(sql, params);
      return res.json({ success: true, cars: result.rows, count: result.rows.length });
    }
  } catch (err) {
    console.warn('DB query failed, falling back to in-memory:', err.message);
  }

  // fallback
  let filtered = [...cars];
  if (brand && brand !== 'All') filtered = filtered.filter(c => c.car.toLowerCase().includes(brand.toLowerCase()));
  if (year && year !== 'All') filtered = filtered.filter(c => c.car_model_year === parseInt(year));
  if (maxPrice) filtered = filtered.filter(c => parseInt(c.price) <= parseInt(maxPrice));
  if (search) filtered = filtered.filter(c => `${c.car} ${c.car_model}`.toLowerCase().includes(search.toLowerCase()));

  res.json({ success: true, cars: filtered, count: filtered.length });
};

export const getCarById = async (req, res) => {
  const { id } = req.params;
  try {
    if (query) {
      const result = await query('SELECT * FROM cars WHERE id = $1', [id]);
      if (result.rows.length) return res.json({ success: true, car: result.rows[0] });
    }
  } catch (err) {
    console.warn('DB query failed, falling back to in-memory:', err.message);
  }

  const car = cars.find(c => c.id === parseInt(id));
  if (!car) return res.status(404).json({ error: 'Car not found' });
  res.json({ success: true, car });
};

export const createCar = async (req, res) => {
  const { car, car_model, car_color, car_model_year, car_vin, price, availability } = req.body;
  const user = req.user;
  if (!car || !car_model || !car_color || !car_model_year || !car_vin || !price) {
    return res.status(400).json({ error: 'Missing required car fields' });
  }

  const image = `https://via.placeholder.com/300x200?text=${car}+${car_model}`;

  try {
    if (query) {
      const result = await query(
        `INSERT INTO cars(car, car_model, car_color, car_model_year, car_vin, price, availability, dealer_id, image)
         VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
        [car, car_model, car_color, parseInt(car_model_year), car_vin, price.toString(), availability !== false, parseInt(user.id) || 1, image]
      );
      return res.status(201).json({ success: true, car: result.rows[0], message: 'Car created successfully' });
    }
  } catch (err) {
    console.warn('DB insert failed, falling back to in-memory:', err.message);
  }

  const newCar = addCar({ car, car_model, car_color, car_model_year: parseInt(car_model_year), car_vin, price: price.toString(), availability: availability !== false, dealer_id: parseInt(user.id) || 1, image });
  res.status(201).json({ success: true, car: newCar, message: 'Car created successfully' });
};

export const updateCarById = async (req, res) => {
  const { id } = req.params;
  const { car, car_model, car_color, car_model_year, car_vin, price, availability } = req.body;
  try {
    if (query) {
      const fields = [];
      const params = [];
      if (car) { params.push(car); fields.push(`car=$${params.length}`); }
      if (car_model) { params.push(car_model); fields.push(`car_model=$${params.length}`); }
      if (car_color) { params.push(car_color); fields.push(`car_color=$${params.length}`); }
      if (car_model_year) { params.push(parseInt(car_model_year)); fields.push(`car_model_year=$${params.length}`); }
      if (car_vin) { params.push(car_vin); fields.push(`car_vin=$${params.length}`); }
      if (price) { params.push(price.toString()); fields.push(`price=$${params.length}`); }
      if (availability !== undefined) { params.push(availability); fields.push(`availability=$${params.length}`); }
      if (fields.length) {
        params.push(id);
        const sql = `UPDATE cars SET ${fields.join(', ')} WHERE id=$${params.length} RETURNING *`;
        const result = await query(sql, params);
        return res.json({ success: true, car: result.rows[0], message: 'Car updated successfully' });
      }
    }
  } catch (err) {
    console.warn('DB update failed, falling back to in-memory:', err.message);
  }

  const updated = updateCar(parseInt(id), { ...(car && { car }), ...(car_model && { car_model }), ...(car_color && { car_color }), ...(car_model_year && { car_model_year: parseInt(car_model_year) }), ...(car_vin && { car_vin }), ...(price && { price: price.toString() }), ...(availability !== undefined && { availability }) });
  res.json({ success: true, car: updated, message: 'Car updated successfully' });
};

export const deleteCarById = async (req, res) => {
  const { id } = req.params;
  try {
    if (query) {
      await query('DELETE FROM cars WHERE id=$1', [id]);
      return res.json({ success: true, message: 'Car deleted successfully' });
    }
  } catch (err) {
    console.warn('DB delete failed, falling back to in-memory:', err.message);
  }

  const success = deleteCar(parseInt(id));
  if (!success) return res.status(404).json({ error: 'Car not found' });
  res.json({ success: true, message: 'Car deleted successfully' });
};

export const getCarsByDealer = async (req, res) => {
  const { dealer_id } = req.params;
  try {
    if (query) {
      const result = await query('SELECT * FROM cars WHERE dealer_id=$1', [dealer_id]);
      return res.json({ success: true, cars: result.rows, count: result.rows.length });
    }
  } catch (err) {
    console.warn('DB query failed, falling back to in-memory:', err.message);
  }

  const dealerCars = cars.filter(c => c.dealer_id === parseInt(dealer_id));
  res.json({ success: true, cars: dealerCars, count: dealerCars.length });
};
