import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import TestDriveForm from "../components/TestDriveForm";
import Spinner from "../components/Spinner";
import { getCarById } from "../services/carApi";
import { useCarImage } from "../hooks/useCarImage";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  // Pre-fill from state instantly, then confirm with API
  const [car, setCar] = useState(state?.car || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const imgSrc = useCarImage(car?.car, car?.car_model);

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      try {
        const data = await getCarById(id);
        if (data && data.car) {
          setCar(data);
        } else if (state?.car) {
          setCar(state.car);
        } else {
          setError("Car not found.");
        }
      } catch {
        if (state?.car) {
          setCar(state.car);
        } else {
          setError("Failed to load car details.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const features = [
    "Bluetooth Connectivity",
    "Backup Camera",
    "Lane Departure Warning",
    "Adaptive Cruise Control",
    "Heated Seats",
    "Sunroof",
  ];

  const availabilityText = car?.availability === true
    ? "Available"
    : car?.availability === false
    ? "Not Available"
    : car?.availability || "Available";

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back
        </button>

        {loading && !car ? (
          <Spinner />
        ) : error && !car ? (
          <div className="text-center py-20">
            <p className="text-red-400 mb-4">{error}</p>
            <button onClick={() => navigate(-1)} className="btn-primary">Go Back</button>
          </div>
        ) : car ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left — Image + Features */}
            <div>
              <div className="card overflow-hidden h-80 lg:h-96">
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={`${car.car} ${car.car_model}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://picsum.photos/seed/${car.id}/800/600`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                    <div className="w-10 h-10 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
                  </div>
                )}
              </div>

              <div className="card p-6 mt-5">
                <h3 className="font-semibold text-white mb-4">Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-violet-400">✓</span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Details + CTA */}
            <div>
              <div className="card p-6 mb-5">
                {/* Title + Price */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-white">
                      {car.car} {car.car_model}
                    </h1>
                    <p className="text-gray-400 mt-1">{car.car_model_year}</p>
                  </div>
                  <span className="text-2xl font-bold text-violet-400 whitespace-nowrap ml-4">
                    {car.price}
                  </span>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Brand", value: car.car },
                    { label: "Model", value: car.car_model },
                    { label: "Year", value: car.car_model_year },
                    { label: "Color", value: car.car_color || "N/A" },
                    { label: "VIN", value: car.car_vin || "N/A" },
                    { label: "Availability", value: availabilityText },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/5 rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-1">{label}</p>
                      <p className={`font-medium text-sm ${
                        label === "Availability"
                          ? availabilityText === "Available"
                            ? "text-green-400"
                            : "text-red-400"
                          : "text-white"
                      }`}>
                        {String(value)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              {!showForm ? (
                <div className="card p-6">
                  <h3 className="font-semibold text-white mb-2">Interested in this car?</h3>
                  <p className="text-gray-400 text-sm mb-5">
                    Book a test drive and experience it firsthand.
                  </p>
                  <button onClick={() => setShowForm(true)} className="btn-primary w-full">
                    🚗 Book Test Drive
                  </button>
                </div>
              ) : (
                <div className="card p-6">
                  <TestDriveForm
                    car={car}
                    onClose={() => setShowForm(false)}
                    onSubmit={(data) => console.log("Test drive request:", data)}
                  />
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
