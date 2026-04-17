import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import CarCard from "../components/CarCard";
import DealerCard from "../components/DealerCard";
import Spinner from "../components/Spinner";
import { getCars, filterCars } from "../services/carApi";

const BRANDS = ["All", "Toyota", "Honda", "Ford", "BMW", "Mercedes", "Audi", "Chevrolet"];
const YEARS = ["All", "2023", "2022", "2021", "2020", "2019", "2018"];

const DEALERS = [
  { id: 1, name: "AutoPlex Motors", location: "New York, NY", phone: "+1 555-0101", cars: 24 },
  { id: 2, name: "Elite Cars", location: "Los Angeles, CA", phone: "+1 555-0202", cars: 18 },
  { id: 3, name: "Prime Auto", location: "Chicago, IL", phone: "+1 555-0303", cars: 31 },
];

export default function UserDashboard() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [brand, setBrand] = useState("All");
  const [year, setYear] = useState("All");
  const [budget, setBudget] = useState(100000);
  const [search, setSearch] = useState("");

  const fetchCars = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const filters = {
        brand: brand !== "All" ? brand : "",
        year: year !== "All" ? year : "",
        maxPrice: budget,
      };
      const data = await filterCars(filters);
      setCars(data.slice(0, 30));
    } catch {
      setError("Failed to load cars. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [brand, year, budget]);

  useEffect(() => { fetchCars(); }, [fetchCars]);

  const displayed = cars.filter((c) =>
    search ? `${c.car} ${c.car_model}`.toLowerCase().includes(search.toLowerCase()) : true
  );

  const suggested = cars.filter(
    (c) => parseFloat(c.price?.replace(/[^0-9.]/g, "")) <= budget * 0.7
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Find Your Dream Car</h1>
          <p className="text-gray-400 mt-1">Browse from thousands of verified listings</p>
        </div>

        {/* Search + Filters */}
        <div className="card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <input
                className="input-field"
                placeholder="🔍  Search by brand or model..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="input-field"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              {BRANDS.map((b) => <option key={b} value={b} className="text-black bg-white">{b}</option>)}
            </select>

            <select
              className="input-field"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {YEARS.map((y) => <option key={y} value={y} className="text-black bg-white">{y}</option>)}
            </select>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-300">Max Budget</label>
              <span className="text-violet-400 font-semibold">${budget.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={5000}
              max={200000}
              step={1000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-violet-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$5,000</span>
              <span>$200,000</span>
            </div>
          </div>
        </div>

        {/* Car Listings */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-white">
              All Cars{" "}
              <span className="text-gray-500 font-normal text-base">({displayed.length})</span>
            </h2>
            <button onClick={fetchCars} className="btn-secondary text-sm py-2 px-4">
              Refresh
            </button>
          </div>

          {loading ? (
            <Spinner />
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-400 mb-4">{error}</p>
              <button onClick={fetchCars} className="btn-primary">Retry</button>
            </div>
          ) : displayed.length === 0 ? (
            <div className="text-center py-16 text-gray-500">No cars found matching your filters.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {displayed.map((car) => <CarCard key={car.id} car={car} />)}
            </div>
          )}
        </section>

        {/* Suggested */}
        {suggested.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-5">
              💡 Suggested Within Budget
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {suggested.map((car) => <CarCard key={car.id} car={car} />)}
            </div>
          </section>
        )}

        {/* Dealers */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-5">🏪 Featured Dealers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DEALERS.map((d) => (
              <DealerCard
                key={d.id}
                dealer={d}
                onContact={(dealer) => alert(`Contacting ${dealer.name} at ${dealer.phone}`)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
