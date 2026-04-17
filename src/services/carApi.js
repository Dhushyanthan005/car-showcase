import axios from "axios";

// Use corsproxy.io to bypass CORS on myfakeapi.com
const BASE_URL = "https://corsproxy.io/?url=https://myfakeapi.com/api/cars";

const api = axios.create({ baseURL: BASE_URL });

// 50 mock cars as fallback if API is unreachable
const MOCK_CARS = [
  { id: 1,  car: "Toyota",      car_model: "Camry",       car_color: "White",  car_model_year: 2022, car_vin: "1HGBH41JXMN109186", price: "$24,000", availability: true },
  { id: 2,  car: "Honda",       car_model: "Civic",       car_color: "Black",  car_model_year: 2023, car_vin: "2HGBH41JXMN109187", price: "$22,500", availability: true },
  { id: 3,  car: "Ford",        car_model: "Mustang",     car_color: "Red",    car_model_year: 2022, car_vin: "3HGBH41JXMN109188", price: "$35,000", availability: true },
  { id: 4,  car: "BMW",         car_model: "3 Series",    car_color: "Blue",   car_model_year: 2023, car_vin: "4HGBH41JXMN109189", price: "$45,000", availability: true },
  { id: 5,  car: "Mercedes-Benz", car_model: "C-Class",  car_color: "Silver", car_model_year: 2023, car_vin: "5HGBH41JXMN109190", price: "$48,000", availability: true },
  { id: 6,  car: "Audi",        car_model: "A4",          car_color: "Gray",   car_model_year: 2022, car_vin: "6HGBH41JXMN109191", price: "$42,000", availability: true },
  { id: 7,  car: "Tesla",       car_model: "Model 3",     car_color: "White",  car_model_year: 2023, car_vin: "7HGBH41JXMN109192", price: "$40,000", availability: true },
  { id: 8,  car: "Chevrolet",   car_model: "Camaro",      car_color: "Yellow", car_model_year: 2022, car_vin: "8HGBH41JXMN109193", price: "$32,000", availability: true },
  { id: 9,  car: "Porsche",     car_model: "911",         car_color: "Red",    car_model_year: 2023, car_vin: "9HGBH41JXMN109194", price: "$115,000", availability: true },
  { id: 10, car: "Lamborghini", car_model: "Urus",        car_color: "Orange", car_model_year: 2023, car_vin: "AHGBH41JXMN109195", price: "$225,000", availability: true },
  { id: 11, car: "Ferrari",     car_model: "F8",          car_color: "Red",    car_model_year: 2022, car_vin: "BHGBH41JXMN109196", price: "$280,000", availability: false },
  { id: 12, car: "Nissan",      car_model: "GT-R",        car_color: "Gray",   car_model_year: 2022, car_vin: "CHGBH41JXMN109197", price: "$115,000", availability: true },
  { id: 13, car: "Hyundai",     car_model: "Sonata",      car_color: "Blue",   car_model_year: 2023, car_vin: "DHGBH41JXMN109198", price: "$26,000", availability: true },
  { id: 14, car: "Kia",         car_model: "Stinger",     car_color: "Black",  car_model_year: 2022, car_vin: "EHGBH41JXMN109199", price: "$38,000", availability: true },
  { id: 15, car: "Mazda",       car_model: "CX-5",        car_color: "Red",    car_model_year: 2023, car_vin: "FHGBH41JXMN109200", price: "$29,000", availability: true },
  { id: 16, car: "Subaru",      car_model: "Outback",     car_color: "Green",  car_model_year: 2022, car_vin: "GHGBH41JXMN109201", price: "$31,000", availability: true },
  { id: 17, car: "Volkswagen",  car_model: "Golf GTI",    car_color: "White",  car_model_year: 2023, car_vin: "HHGBH41JXMN109202", price: "$33,000", availability: true },
  { id: 18, car: "Lexus",       car_model: "ES 350",      car_color: "Silver", car_model_year: 2023, car_vin: "IHGBH41JXMN109203", price: "$42,000", availability: true },
  { id: 19, car: "Jeep",        car_model: "Wrangler",    car_color: "Black",  car_model_year: 2022, car_vin: "JHGBH41JXMN109204", price: "$36,000", availability: true },
  { id: 20, car: "Dodge",       car_model: "Challenger",  car_color: "Purple", car_model_year: 2022, car_vin: "KHGBH41JXMN109205", price: "$34,000", availability: true },
  { id: 21, car: "Volvo",       car_model: "XC90",        car_color: "White",  car_model_year: 2023, car_vin: "LHGBH41JXMN109206", price: "$55,000", availability: true },
  { id: 22, car: "Land Rover",  car_model: "Defender",    car_color: "Green",  car_model_year: 2023, car_vin: "MHGBH41JXMN109207", price: "$65,000", availability: true },
  { id: 23, car: "Jaguar",      car_model: "F-Type",      car_color: "Red",    car_model_year: 2022, car_vin: "NHGBH41JXMN109208", price: "$72,000", availability: true },
  { id: 24, car: "Maserati",    car_model: "Ghibli",      car_color: "Blue",   car_model_year: 2022, car_vin: "OHGBH41JXMN109209", price: "$78,000", availability: false },
  { id: 25, car: "Bentley",     car_model: "Continental", car_color: "Black",  car_model_year: 2023, car_vin: "PHGBH41JXMN109210", price: "$220,000", availability: true },
  { id: 26, car: "Rolls-Royce", car_model: "Ghost",       car_color: "White",  car_model_year: 2023, car_vin: "QHGBH41JXMN109211", price: "$350,000", availability: true },
  { id: 27, car: "Aston Martin",car_model: "DB11",        car_color: "Silver", car_model_year: 2022, car_vin: "RHGBH41JXMN109212", price: "$195,000", availability: true },
  { id: 28, car: "Cadillac",    car_model: "CT5",         car_color: "Black",  car_model_year: 2023, car_vin: "SHGBH41JXMN109213", price: "$38,000", availability: true },
  { id: 29, car: "Lincoln",     car_model: "Aviator",     car_color: "Gray",   car_model_year: 2022, car_vin: "THGBH41JXMN109214", price: "$52,000", availability: true },
  { id: 30, car: "Infiniti",    car_model: "Q50",         car_color: "White",  car_model_year: 2023, car_vin: "UHGBH41JXMN109215", price: "$40,000", availability: true },
  { id: 31, car: "Acura",       car_model: "TLX",         car_color: "Blue",   car_model_year: 2023, car_vin: "VHGBH41JXMN109216", price: "$38,000", availability: true },
  { id: 32, car: "Alfa Romeo",  car_model: "Giulia",      car_color: "Red",    car_model_year: 2022, car_vin: "WHGBH41JXMN109217", price: "$44,000", availability: true },
  { id: 33, car: "Mitsubishi",  car_model: "Outlander",   car_color: "Black",  car_model_year: 2023, car_vin: "XHGBH41JXMN109218", price: "$28,000", availability: true },
  { id: 34, car: "Suzuki",      car_model: "Swift",       car_color: "Yellow", car_model_year: 2022, car_vin: "YHGBH41JXMN109219", price: "$18,000", availability: true },
  { id: 35, car: "Peugeot",     car_model: "308",         car_color: "Gray",   car_model_year: 2023, car_vin: "ZHGBH41JXMN109220", price: "$25,000", availability: true },
  { id: 36, car: "Honda",       car_model: "Accord",      car_color: "Silver", car_model_year: 2022, car_vin: "A1GBH41JXMN109221", price: "$27,000", availability: true },
  { id: 37, car: "Toyota",      car_model: "Corolla",     car_color: "White",  car_model_year: 2023, car_vin: "B1GBH41JXMN109222", price: "$21,000", availability: true },
  { id: 38, car: "Ford",        car_model: "F-150",       car_color: "Blue",   car_model_year: 2023, car_vin: "C1GBH41JXMN109223", price: "$42,000", availability: true },
  { id: 39, car: "Chevrolet",   car_model: "Corvette",    car_color: "Red",    car_model_year: 2023, car_vin: "D1GBH41JXMN109224", price: "$65,000", availability: true },
  { id: 40, car: "BMW",         car_model: "M3",          car_color: "Black",  car_model_year: 2023, car_vin: "E1GBH41JXMN109225", price: "$75,000", availability: true },
  { id: 41, car: "Mercedes-Benz", car_model: "E-Class",  car_color: "White",  car_model_year: 2022, car_vin: "F1GBH41JXMN109226", price: "$58,000", availability: true },
  { id: 42, car: "Audi",        car_model: "Q7",          car_color: "Gray",   car_model_year: 2023, car_vin: "G1GBH41JXMN109227", price: "$60,000", availability: true },
  { id: 43, car: "Tesla",       car_model: "Model S",     car_color: "Red",    car_model_year: 2023, car_vin: "H1GBH41JXMN109228", price: "$89,000", availability: true },
  { id: 44, car: "Porsche",     car_model: "Cayenne",     car_color: "Silver", car_model_year: 2022, car_vin: "I1GBH41JXMN109229", price: "$72,000", availability: true },
  { id: 45, car: "Nissan",      car_model: "Altima",      car_color: "Blue",   car_model_year: 2023, car_vin: "J1GBH41JXMN109230", price: "$25,000", availability: true },
  { id: 46, car: "Hyundai",     car_model: "Tucson",      car_color: "Green",  car_model_year: 2023, car_vin: "K1GBH41JXMN109231", price: "$28,000", availability: true },
  { id: 47, car: "Kia",         car_model: "Sportage",    car_color: "White",  car_model_year: 2022, car_vin: "L1GBH41JXMN109232", price: "$26,000", availability: true },
  { id: 48, car: "Mazda",       car_model: "Mazda3",      car_color: "Red",    car_model_year: 2023, car_vin: "M1GBH41JXMN109233", price: "$23,000", availability: true },
  { id: 49, car: "Subaru",      car_model: "Forester",    car_color: "Black",  car_model_year: 2022, car_vin: "N1GBH41JXMN109234", price: "$29,000", availability: true },
  { id: 50, car: "Volkswagen",  car_model: "Passat",      car_color: "Gray",   car_model_year: 2023, car_vin: "O1GBH41JXMN109235", price: "$30,000", availability: true },
];

export const getCars = async () => {
  try {
    const { data } = await api.get("/");
    const cars = data.cars || data;
    if (Array.isArray(cars) && cars.length > 0) return cars;
    return MOCK_CARS;
  } catch {
    return MOCK_CARS;
  }
};

export const getCarById = async (id) => {
  try {
    const { data } = await api.get(`/${id}`);
    const car = data.Car || data.car || data;
    if (car && car.car) return car;
    return MOCK_CARS.find((c) => String(c.id) === String(id)) || null;
  } catch {
    return MOCK_CARS.find((c) => String(c.id) === String(id)) || null;
  }
};

export const filterCars = async (filters = {}) => {
  const cars = await getCars();
  return cars.filter((car) => {
    const matchBrand = filters.brand
      ? car.car?.toLowerCase().includes(filters.brand.toLowerCase())
      : true;
    const matchYear = filters.year
      ? String(car.car_model_year) === String(filters.year)
      : true;
    const matchPrice = filters.maxPrice
      ? parseFloat(car.price?.replace(/[^0-9.]/g, "")) <= filters.maxPrice
      : true;
    return matchBrand && matchYear && matchPrice;
  });
};
