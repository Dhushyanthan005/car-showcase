import { useState, useEffect } from "react";
import { getCarImageUrl, getLocalCarImageUrl } from "../services/carImages";

const cache = {};

// useCarImage accepts either (brand, model) or a full car object.
export const useCarImage = (brandOrCar = "", model = "") => {
  const isObj = typeof brandOrCar === "object" && brandOrCar !== null;
  const car = isObj ? brandOrCar : null;
  const brand = isObj ? (car.car || car.brand || "") : brandOrCar;
  const carModel = isObj ? (car.car_model || "") : model;

  const key = isObj ? `car:${car.id || `${brand} ${carModel}`}` : `${brand} ${carModel}`;
  const [src, setSrc] = useState(cache[key] || null);

  useEffect(() => {
    if (cache[key]) { setSrc(cache[key]); return; }

    // Check local image overrides first
    if (car) {
      const local = getLocalCarImageUrl(car);
      if (local) {
        cache[key] = local;
        setSrc(local);
        return;
      }
    }

    const queries = [
      `${brand} ${carModel} automobile`,
      `${brand} automobile`,
    ];

    const tryNext = async (index) => {
      if (index >= queries.length) {
        // Try brand-based Wikimedia image as a last fetch attempt
        const wiki = getCarImageUrl(brand, 800);
        if (wiki) {
          cache[key] = wiki;
          setSrc(wiki);
          return;
        }

        const fallback = `https://picsum.photos/seed/${encodeURIComponent(key)}/800/500`;
        cache[key] = fallback;
        setSrc(fallback);
        return;
      }
      try {
        const title = encodeURIComponent(queries[index]);
        const res = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`,
          { headers: { Accept: "application/json" } }
        );
        const data = await res.json();
        const img = data?.thumbnail?.source || data?.originalimage?.source;
        if (img) {
          cache[key] = img;
          setSrc(img);
        } else {
          tryNext(index + 1);
        }
      } catch {
        tryNext(index + 1);
      }
    };

    tryNext(0);
  }, [brand, carModel, key]);

  return src;
};
