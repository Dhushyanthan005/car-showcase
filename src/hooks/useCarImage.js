import { useState, useEffect } from "react";

const cache = {};

export const useCarImage = (brand = "", model = "") => {
  const key = `${brand} ${model}`;
  const [src, setSrc] = useState(cache[key] || null);

  useEffect(() => {
    if (cache[key]) { setSrc(cache[key]); return; }

    const queries = [
      `${brand} ${model} automobile`,
      `${brand} automobile`,
    ];

    const tryNext = async (index) => {
      if (index >= queries.length) {
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
  }, [brand, model, key]);

  return src;
};
