// Mock cars database
export const cars = [
  { id: 1,  car: "Toyota",      car_model: "Camry",       car_color: "White",  car_model_year: 2022, car_vin: "1HGBH41JXMN109186", price: "24000", availability: true, dealer_id: 1, image: "/Toyota Camry.jpn.webp" },
  { id: 2,  car: "Honda",       car_model: "Civic",       car_color: "Black",  car_model_year: 2023, car_vin: "2HGBH41JXMN109187", price: "22500", availability: true, dealer_id: 1, image: "/Honda Civic.jpn.webp" },
  { id: 3,  car: "Ford",        car_model: "Mustang",     car_color: "Red",    car_model_year: 2022, car_vin: "3HGBH41JXMN109188", price: "35000", availability: true, dealer_id: 2, image: "/Ford Mustang.jpn.webp" },
  { id: 4,  car: "BMW",         car_model: "3 Series",    car_color: "Blue",   car_model_year: 2023, car_vin: "4HGBH41JXMN109189", price: "45000", availability: true, dealer_id: 2, image: "/BMW 3 Series.webp" },
  { id: 5,  car: "Mercedes-Benz", car_model: "C-Class",  car_color: "Silver", car_model_year: 2023, car_vin: "5HGBH41JXMN109190", price: "48000", availability: true, dealer_id: 3, image: "/Mercedes-Benz C-Class.webp" },
  { id: 6,  car: "Audi",        car_model: "A4",          car_color: "Gray",   car_model_year: 2022, car_vin: "6HGBH41JXMN109191", price: "42000", availability: true, dealer_id: 3, image: "/Audi A4.webp" },
  { id: 7,  car: "Tesla",       car_model: "Model 3",     car_color: "White",  car_model_year: 2023, car_vin: "7HGBH41JXMN109192", price: "40000", availability: true, dealer_id: 1, image: "/Tesla Model 3.jpg" },
  { id: 8,  car: "Chevrolet",   car_model: "Camaro",      car_color: "Yellow", car_model_year: 2022, car_vin: "8HGBH41JXMN109193", price: "32000", availability: true, dealer_id: 2, image: "/Chevrolet Camaro.jpg" },
  { id: 9,  car: "Porsche",     car_model: "911",         car_color: "Red",    car_model_year: 2023, car_vin: "9HGBH41JXMN109194", price: "115000", availability: true, dealer_id: 3, image: "https://via.placeholder.com/300x200?text=Porsche+911" },
  { id: 10, car: "Lamborghini", car_model: "Urus",        car_color: "Orange", car_model_year: 2023, car_vin: "AHGBH41JXMN109195", price: "225000", availability: true, dealer_id: 1, image: "https://via.placeholder.com/300x200?text=Lamborghini+Urus" },
];

export let nextCarId = 11;

export const addCar = (car) => {
  const newCar = { ...car, id: nextCarId++ };
  cars.push(newCar);
  return newCar;
};

export const updateCar = (id, updates) => {
  const car = cars.find(c => c.id === id);
  if (!car) return null;
  Object.assign(car, updates);
  return car;
};

export const deleteCar = (id) => {
  const index = cars.findIndex(c => c.id === id);
  if (index === -1) return false;
  cars.splice(index, 1);
  return true;
};
