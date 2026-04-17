import { useNavigate } from "react-router-dom";
import { useCarImage } from "../hooks/useCarImage";

const FUEL_COLORS = {
  Gasoline: "bg-orange-500/20 text-orange-400",
  Electric: "bg-green-500/20 text-green-400",
  Diesel: "bg-blue-500/20 text-blue-400",
  Hybrid: "bg-teal-500/20 text-teal-400",
};

export default function CarCard({ car }) {
  const navigate = useNavigate();
  const imgSrc = useCarImage(car.car, car.car_model);
  const fuel = car.car_color || "Gasoline";
  const fuelClass = FUEL_COLORS[fuel] || "bg-gray-500/20 text-gray-400";

  return (
    <div className="card overflow-hidden group hover:border-violet-500/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <div className="relative h-44 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={`${car.car} ${car.car_model}`}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            onError={(e) => {
              e.target.src = `https://picsum.photos/seed/${car.id}/400/300`;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        <span className={`absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full ${fuelClass}`}>
          {fuel}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-white text-lg leading-tight">
          {car.car} {car.car_model}
        </h3>
        <p className="text-gray-400 text-sm mt-0.5">{car.car_model_year}</p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-violet-400 font-bold text-xl">{car.price}</span>
          <button
            onClick={() => navigate(`/car/${car.id}`, { state: { car } })}
            className="btn-primary text-sm py-2 px-4"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
