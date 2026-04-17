import { useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const INITIAL_REQUESTS = [
  { id: 1, user: "Alice Johnson", car: "Toyota Camry 2022", date: "2024-01-15", status: "pending", phone: "+1 555-1001" },
  { id: 2, user: "Bob Smith", car: "Honda Accord 2023", date: "2024-01-16", status: "accepted", phone: "+1 555-1002" },
  { id: 3, user: "Carol White", car: "Ford Mustang 2021", date: "2024-01-17", status: "pending", phone: "+1 555-1003" },
  { id: 4, user: "David Lee", car: "BMW 3 Series 2022", date: "2024-01-18", status: "rejected", phone: "+1 555-1004" },
];

const STATUS_STYLES = {
  pending: "bg-yellow-500/20 text-yellow-400",
  accepted: "bg-green-500/20 text-green-400",
  rejected: "bg-red-500/20 text-red-400",
};

export default function DealerDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState(INITIAL_REQUESTS);

  const updateStatus = (id, status) =>
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar — Dealer Profile */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-4">
                {user?.name?.charAt(0) || "D"}
              </div>
              <h2 className="text-xl font-bold text-white">{user?.name}</h2>
              <p className="text-violet-400 text-sm capitalize mt-0.5">{user?.role}</p>

              <div className="mt-6 space-y-3">
                {[
                  { icon: "📍", label: "Location", value: "New York, NY" },
                  { icon: "📞", label: "Phone", value: "+1 555-0101" },
                  { icon: "✉️", label: "Email", value: user?.email },
                  { icon: "🚗", label: "Listed Cars", value: "24" },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="text-lg">{icon}</span>
                    <div>
                      <p className="text-xs text-gray-500">{label}</p>
                      <p className="text-sm text-gray-300">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-3">
                {[
                  { label: "Pending", value: requests.filter((r) => r.status === "pending").length, color: "text-yellow-400" },
                  { label: "Accepted", value: requests.filter((r) => r.status === "accepted").length, color: "text-green-400" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-white/5 rounded-xl p-3 text-center">
                    <p className={`text-2xl font-bold ${color}`}>{value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main — Requests Table */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-white">Test Drive Requests</h1>
              <span className="bg-violet-500/20 text-violet-400 text-sm font-medium px-3 py-1 rounded-full">
                {requests.length} total
              </span>
            </div>

            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      {["User", "Car", "Date", "Status", "Actions"].map((h) => (
                        <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {requests.map((req) => (
                      <tr key={req.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {req.user.charAt(0)}
                            </div>
                            <div>
                              <p className="text-white text-sm font-medium">{req.user}</p>
                              <p className="text-gray-500 text-xs">{req.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-300 text-sm">{req.car}</td>
                        <td className="px-6 py-4 text-gray-400 text-sm">{req.date}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[req.status]}`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {req.status === "pending" && (
                              <>
                                <button
                                  onClick={() => updateStatus(req.id, "accepted")}
                                  className="text-xs bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 py-1.5 rounded-lg transition-colors"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => updateStatus(req.id, "rejected")}
                                  className="text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1.5 rounded-lg transition-colors"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => alert(`Calling ${req.user} at ${req.phone}`)}
                              className="text-xs bg-white/10 hover:bg-white/20 text-gray-300 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              Contact
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
