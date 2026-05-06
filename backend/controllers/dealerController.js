import { dealers, getDealer, getAllDealers } from '../data/dealers.js';
import { cars } from '../data/cars.js';
import { query } from '../db/index.js';

export const getDealers = async (req, res) => {
  try {
    if (query) {
      const dealersResult = await query("SELECT id, name, email, phone FROM users WHERE role = 'dealer'");
      const dbDealers = dealersResult.rows;
      
      const result = [];
      for (const dealer of dbDealers) {
        const carsResult = await query('SELECT id FROM cars WHERE dealer_id = $1', [dealer.id]);
        result.push({
          ...dealer,
          cars_count: carsResult.rows.length
        });
      }
      return res.json({ success: true, dealers: result, count: result.length });
    }
  } catch (err) {
    console.warn('DB query failed, falling back to in-memory:', err.message);
  }

  const dealersWithCounts = dealers.map(dealer => {
    const dealerCars = cars.filter(c => c.dealer_id === dealer.id);
    return {
      ...dealer,
      cars_count: dealerCars.length
    };
  });

  res.json({
    success: true,
    dealers: dealersWithCounts,
    count: dealersWithCounts.length
  });
};

export const getDealerById = async (req, res) => {
  const { id } = req.params;

  try {
    if (query) {
      const dealerResult = await query("SELECT id, name, email, phone FROM users WHERE role = 'dealer' AND id = $1", [id]);
      if (dealerResult.rows.length > 0) {
        const dealer = dealerResult.rows[0];
        const carsResult = await query('SELECT * FROM cars WHERE dealer_id = $1', [dealer.id]);
        return res.json({
          success: true,
          dealer: {
            ...dealer,
            cars_count: carsResult.rows.length,
            cars: carsResult.rows
          }
        });
      }
    }
  } catch (err) {
    console.warn('DB query failed, falling back to in-memory:', err.message);
  }

  const dealer = getDealer(parseInt(id));

  if (!dealer) {
    return res.status(404).json({ error: 'Dealer not found' });
  }

  const dealerCars = cars.filter(c => c.dealer_id === parseInt(id));

  res.json({
    success: true,
    dealer: {
      ...dealer,
      cars_count: dealerCars.length,
      cars: dealerCars
    }
  });
};

export const getDealerProfile = async (req, res) => {
  const user = req.user;
  
  if (user.role !== 'dealer') {
    return res.status(403).json({ error: 'Only dealers can view profiles' });
  }

  try {
    if (query) {
      const carsResult = await query('SELECT * FROM cars WHERE dealer_id = $1', [user.id]);
      return res.json({
        success: true,
        dealer: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          cars_count: carsResult.rows.length
        }
      });
    }
  } catch (err) {
    console.warn('DB query failed, falling back to in-memory:', err.message);
  }

  // For demo purposes, use the dealer data
  const dealer = getDealer(1);
  if (dealer) {
    dealer.name = user.name;
    dealer.email = user.email;
  }
  
  const dealerCars = cars.filter(c => c.dealer_id === 1);

  res.json({
    success: true,
    dealer: {
      ...(dealer || { name: user.name, email: user.email }),
      cars_count: dealerCars.length
    }
  });
};
