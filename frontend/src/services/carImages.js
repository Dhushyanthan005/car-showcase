// Centralized car image helpers.
// Place local images in `public/car-images/` and reference them by filename
// via the `image` property on a car object (preferred) or by adding entries
// to the `LOCAL_IMG` mapping below. When no local image exists, the code
// falls back to Wikimedia thumbnails defined in `BRAND_IMG`.
const BRAND_IMG = {
  "Acura":         "acura.jpg",
  "Alfa Romeo":    "Alfa_Romeo_Giulia_2016.jpg",
  "Aston Martin":  "Aston_Martin_DB11_2016.jpg",
  "Audi":          "Audi_A4_B9_2015.jpg",
  "BMW":           "BMW_3er_G20_2019.jpg",
  "Bentley":       "Bentley_Continental_GT_2018.jpg",
  "Buick":         "Buick_Enclave_2018.jpg",
  "Cadillac":      "Cadillac_CT5_2020.jpg",
  "Chevrolet":     "Chevrolet_Camaro_2019.jpg",
  "Chrysler":      "Chrysler_300_2015.jpg",
  "Corbin":        "Corbin_Sparrow.jpg",
  "Daewoo":        "Daewoo_Lanos_2001.jpg",
  "Dodge":         "Dodge_Challenger_2018.jpg",
  "Eagle":         "Eagle_Talon_1995.jpg",
  "Ferrari":       "Ferrari_SF90_Stradale.jpg",
  "Ford":          "Ford_Mustang_2018.jpg",
  "GMC":           "GMC_Sierra_2019.jpg",
  "Geo":           "Geo_Metro_1995.jpg",
  "Holden":        "Holden_Commodore_VF.jpg",
  "Honda":         "Honda_Civic_2022.jpg",
  "Hummer":        "Hummer_H2_2003.jpg",
  "Hyundai":       "Hyundai_Sonata_2020.jpg",
  "Infiniti":      "Infiniti_Q50_2014.jpg",
  "Isuzu":         "Isuzu_D-Max_2020.jpg",
  "Jaguar":        "Jaguar_F-Type_2013.jpg",
  "Jeep":          "Jeep_Wrangler_JL_2018.jpg",
  "Kia":           "Kia_Stinger_2018.jpg",
  "Lamborghini":   "Lamborghini_Urus_2018.jpg",
  "Land Rover":    "Land_Rover_Defender_2020.jpg",
  "Lexus":         "Lexus_ES_2019.jpg",
  "Lincoln":       "Lincoln_Aviator_2020.jpg",
  "Lotus":         "Lotus_Evora_400.jpg",
  "MINI":          "MINI_Cooper_S_F56_2018.jpg",
  "Maserati":      "Maserati_Ghibli_2013.jpg",
  "Maybach":       "Mercedes-Maybach_S600_W222.jpg",
  "Mazda":         "Mazda_CX-5_2017.jpg",
  "Mercedes-Benz": "Mercedes-Benz_C-Klasse_W206.jpg",
  "Mercury":       "Mercury_Grand_Marquis_2011.jpg",
  "Mitsubishi":    "Mitsubishi_Outlander_2020.jpg",
  "Morgan":        "Morgan_Plus_4.jpg",
  "Nissan":        "Nissan_GT-R_2017.jpg",
  "Oldsmobile":    "Oldsmobile_Aurora_2001.jpg",
  "Panoz":         "Panoz_Esperante_2005.jpg",
  "Peugeot":       "Peugeot_308_2021.jpg",
  "Plymouth":      "Plymouth_Prowler_2001.jpg",
  "Pontiac":       "Pontiac_GTO_2004.jpg",
  "Porsche":       "Porsche_911_992.jpg",
  "Rolls-Royce":   "Rolls-Royce_Ghost_2021.jpg",
  "Saab":          "Saab_9-3_2008.jpg",
  "Saturn":        "Saturn_Vue_2007.jpg",
  "Scion":         "Scion_FR-S_2013.jpg",
  "Smart":         "Smart_fortwo_2015.jpg",
  "Subaru":        "Subaru_Outback_2020.jpg",
  "Suzuki":        "Suzuki_Swift_2017.jpg",
  "Tesla":         "Tesla_Model_3_2020.jpg",
  "Toyota":        "Toyota_Camry_2018.jpg",
  "Volkswagen":    "Volkswagen_Golf_GTI_Mk8.jpg",
  "Volvo":         "Volvo_XC90_2020.jpg",
};

export const getCarImageUrl = (brand = "", width = 400) => {
  const file = BRAND_IMG[brand];
  if (!file) return null;
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
};

// Optional local mapping: map brand or "Brand Model" to a local filename
// Example: { "Toyota": "toyota-camry.jpg", "Tesla Model 3": "tesla-model3.jpg" }
export const LOCAL_IMG = {
  // Files found in `public/` - map Brand or "Brand Model" to the local path
  "Toyota Camry": "/Toyota Camry.jpn.webp",
  "Toyota Corolla": "/Toyota Corolla.jpg",
  Toyota: "/Toyota Camry.jpn.webp",

  "Honda Civic": "/Honda Civic.jpn.webp",
  "Honda Accord": "/Honda Accord.jpg",
  Honda: "/Honda Civic.jpn.webp",

  "Ford Mustang": "/Ford Mustang.jpn.webp",
  Ford: "/Ford Mustang.jpn.webp",

  "BMW 3 Series": "/BMW 3 Series.webp",
  BMW: "/BMW 3 Series.webp",

  "Mercedes-Benz C-Class": "/Mercedes-Benz C-Class.webp",
  "Mercedes-Benz": "/Mercedes-Benz C-Class.webp",

  "Audi A4": "/Audi A4.webp",
  Audi: "/Audi A4.webp",

  "Tesla Model 3": "/Tesla Model 3.jpg",
  Tesla: "/Tesla Model 3.jpg",

  "Chevrolet Camaro": "/Chevrolet Camaro.jpg",
  Chevrolet: "/Chevrolet Camaro.jpg",

  "Alfa Romeo Giulia": "/Alfa Romeo Giulia.jpg",
  "Cadillac CT5": "/Cadillac CT5.jpg",
  "Dodge Challenger": "/Dodge Challenger.jpg",
  "Honda Civic": "/Honda Civic.jpn.webp",
  "Hyundai Sonata": "/Hyundai Sonata.jpg",
  "Infiniti Q50": "/Infiniti Q50.jpg",
  "Jaguar F-Type": "/Jaguar F-Type.jpg",
  "Jeep Wrangler": "/Jeep Wrangler.jpg",
  "Kia Stinger": "/Kia Stinger.jpg",
  "Land Rover Defender": "/Land Rover Defender.jpg",
  "Lexus ES 350": "/Lexus ES 350.jpg",
  "Lincoln Aviator": "/Lincoln Aviator.jpg",
  "Mazda CX-5": "/Mazda CX-5.jpg",
  "Mitsubishi Outlander": "/Mitsubishi Outlander.jpg",
  "Peugeot 308": "/Peugeot 308.jpg",
  "Subaru Outback": "/Subaru Outback.jpg",
  "Suzuki Swift": "/Suzuki Swift.jpg",
  "Volkswagen Golf GTI": "/Volkswagen Golf GTI.jpg",
  "Volvo XC90": "/Volvo XC90.jpg",
  "Cadillac": "/Cadillac CT5.jpg",
  "Porsche": "/Porsche_911_992.jpg",
  "Lamborghini": "/Lamborghini_Urus_2018.jpg",
  "Audi": "/Audi A4.webp",
  "BMW": "/BMW 3 Series.webp",
  "Mercedes": "/Mercedes-Benz C-Class.webp",
  // Add more mappings if you add more files to public/
};

export const getLocalCarImageUrl = (car) => {
  if (!car) return null;
  // If `image` provided on the car record, use it directly.
  if (car.image) {
    // If it's an absolute URL, return as-is. Otherwise treat as a filename
    // placed in `public/` (root) or a subfolder path. Normalize to start with '/'.
    if (/^https?:\/\//.test(car.image)) return car.image;
    return car.image.startsWith("/") ? car.image : `/${car.image}`;
  }

  const brandKey = car.car || car.brand || "";
  const modelKey = car.car_model ? `${brandKey} ${car.car_model}` : brandKey;

  // Try exact brand+model mapping, then brand only
  if (LOCAL_IMG[modelKey]) return LOCAL_IMG[modelKey].startsWith("/") ? LOCAL_IMG[modelKey] : `/${LOCAL_IMG[modelKey]}`;
  if (LOCAL_IMG[brandKey]) return LOCAL_IMG[brandKey].startsWith("/") ? LOCAL_IMG[brandKey] : `/${LOCAL_IMG[brandKey]}`;

  return null;
};
