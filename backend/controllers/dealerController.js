import { dealers, getDealer, getAllDealers } from '../data/dealers.js';
import { cars } from '../data/cars.js';

export const getDealers = (req, res) => {
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

export const getDealerById = (req, res) => {
  const { id } = req.params;
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

export const getDealerProfile = (req, res) => {
  const user = req.user;
  
  if (user.role !== 'dealer') {
    return res.status(403).json({ error: 'Only dealers can view profiles' });
  }

  // For demo purposes, use the dealer data
  const dealer = getDealer(1);
  dealer.name = user.name;
  dealer.email = user.email;
  
  const dealerCars = cars.filter(c => c.dealer_id === 1);

  res.json({
    success: true,
    dealer: {
      ...dealer,
      cars_count: dealerCars.length
    }
  });
};
