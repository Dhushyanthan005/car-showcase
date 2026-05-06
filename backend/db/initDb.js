import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { query } from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure we load the right .env
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const createTablesSql = `
CREATE TABLE IF NOT EXISTS cars (
  id SERIAL PRIMARY KEY,
  car VARCHAR(200),
  car_model VARCHAR(200),
  car_color VARCHAR(100),
  car_model_year INTEGER,
  car_vin VARCHAR(100),
  price VARCHAR(50),
  availability BOOLEAN,
  dealer_id INTEGER,
  image TEXT
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200),
  email VARCHAR(200) UNIQUE,
  password VARCHAR(200),
  role VARCHAR(50),
  phone VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS testdrives (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  car_id INTEGER,
  dealer_id INTEGER,
  user_name VARCHAR(200),
  car_info TEXT,
  date VARCHAR(100),
  status VARCHAR(50),
  phone VARCHAR(50),
  message TEXT
);
`;

async function seedCars() {
  try {
    const module = await import('../data/cars.js');
    const cars = module.cars || [];

    for (const c of cars) {
      await query(
        `INSERT INTO cars(car, car_model, car_color, car_model_year, car_vin, price, availability, dealer_id, image)
         VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
         ON CONFLICT DO NOTHING`,
        [c.car, c.car_model, c.car_color, c.car_model_year, c.car_vin, c.price, c.availability, c.dealer_id, c.image]
      );
    }
  } catch (err) {
    console.log('Error seeding cars:', err.message);
  }
}

async function seedUsers() {
  try {
    const module = await import('../data/users.js');
    const users = module.users || [];

    for (const u of users) {
      await query(
        `INSERT INTO users(name, email, password, role, phone)
         VALUES($1,$2,$3,$4,$5)
         ON CONFLICT (email) DO NOTHING`,
        [u.name, u.email, u.password, u.role, u.phone]
      );
    }
  } catch (err) {
    console.log('Error seeding users:', err.message);
  }
}

async function init() {
  try {
    console.log('Creating tables...');
    await query(createTablesSql);
    console.log('Seeding cars...');
    await seedCars();
    console.log('Seeding users...');
    await seedUsers();
    console.log('DB init completed');
    process.exit(0);
  } catch (err) {
    console.error('DB init failed', err);
    process.exit(1);
  }
}

if (process.argv[1] === __filename) {
  init();
}

export default init;
