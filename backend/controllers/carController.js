import { cars, addCar, updateCar, deleteCar } from '../data/cars.js';
import { getDealer } from '../data/dealers.js';

export const getAllCars = (req, res) => {
  const { brand, year, maxPrice, search } = req.query;

  let filtered = [...cars];

  if (brand && brand !== 'All') {
    filtered = filtered.filter(c => c.car.toLowerCase().includes(brand.toLowerCase()));
  }

  if (year && year !== 'All') {
    filtered = filtered.filter(c => c.car_model_year === parseInt(year));
  }

  if (maxPrice) {
    filtered = filtered.filter(c => parseInt(c.price) <= parseInt(maxPrice));
  }

  if (search) {
    filtered = filtered.filter(c => 
      `${c.car} ${c.car_model}`.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json({
    success: true,
    cars: filtered,
    count: filtered.length
  });
};

export const getCarById = (req, res) => {
  const { id } = req.params;
  const car = cars.find(c => c.id === parseInt(id));

  if (!car) {
    return res.status(404).json({ error: 'Car not found' });
  }

  res.json({
    success: true,
    car
  });
};

export const createCar = (req, res) => {
  const { car, car_model, car_color, car_model_year, car_vin, price, availability } = req.body;
  const user = req.user;

  if (!car || !car_model || !car_color || !car_model_year || !car_vin || !price) {
    return res.status(400).json({ error: 'Missing required car fields' });
  }

  // Use dealer_id from user's dealer info
  const newCar = addCar({
    car,
    car_model,
    car_color,
    car_model_year: parseInt(car_model_year),
    car_vin,
    price: price.toString(),
    availability: availability !== false,
    dealer_id: parseInt(user.id) || 1,
    image: `https://via.placeholder.com/300x200?text=${car}+${car_model}`
  });

  res.status(201).json({
    success: true,
    car: newCar,
    message: 'Car created successfully'
  });
};

export const updateCarById = (req, res) => {
  const { id } = req.params;
  const { car, car_model, car_color, car_model_year, car_vin, price, availability } = req.body;

  const car_obj = cars.find(c => c.id === parseInt(id));
  if (!car_obj) {
    return res.status(404).json({ error: 'Car not found' });
  }

  const updates = {};
  if (car) updates.car = car;
  if (car_model) updates.car_model = car_model;
  if (car_color) updates.car_color = car_color;
  if (car_model_year) updates.car_model_year = parseInt(car_model_year);
  if (car_vin) updates.car_vin = car_vin;
  if (price) updates.price = price.toString();
  if (availability !== undefined) updates.availability = availability;

  const updated = updateCar(parseInt(id), updates);

  res.json({
    success: true,
    car: updated,
    message: 'Car updated successfully'
  });
};

export const deleteCarById = (req, res) => {
  const { id } = req.params;
  const success = deleteCar(parseInt(id));

  if (!success) {
    return res.status(404).json({ error: 'Car not found' });
  }

  res.json({
    success: true,
    message: 'Car deleted successfully'
  });
};

export const getCarsByDealer = (req, res) => {
  const { dealer_id } = req.params;
  const dealerCars = cars.filter(c => c.dealer_id === parseInt(dealer_id));

  res.json({
    success: true,
    cars: dealerCars,
    count: dealerCars.length
  });
};
