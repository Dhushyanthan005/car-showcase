import { useState } from "react";
import Navbar from "../components/Navbar";

const STATS = [
  { label: "Total Users", value: "1,284", icon: "👥", color: "from-violet-500 to-indigo-600" },
  { label: "Total Dealers", value: "48", icon: "🏪", color: "from-blue-500 to-cyan-600" },
  { label: "Total Cars", value: "3,921", icon: "🚗", color: "from-emerald-500 to-teal-600" },
  { label: "Total Requests", value: "892", icon: "📋", color: "from-orange-500 to-amber-600" },
];

const INIT_USERS = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", phone: "+1 555-1001", joined: "2024-01-10", status: "active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", phone: "+1 555-1002", joined: "2024-01-12", status: "active" },
  { id: 3, name: "Carol White", email: "carol@example.com", phone: "+1 555-1003", joined: "2024-01-14", status: "inactive" },
];

const INIT_DEALERS = [
  { id: 1, name: "AutoPlex Motors", email: "autoplex@example.com", location: "New York, NY", cars: 24, status: "approved" },
  { id: 2, name: "Elite Cars", email: "elite@example.com", location: "Los Angeles, CA", cars: 18, status: "pending" },
  { id: 3, name: "Prime Auto", email: "prime@example.com", location: "Chicago, IL", cars: 31, status: "pending" },
];

const NAV_ITEMS = ["Overview", "Users", "Dealers"];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [users, setUsers] = useState(INIT_USERS);
  const [dealers, setDealers] = useState(INIT_DEALERS);

  const deleteUser = (id) => setUsers((prev) => prev.filter((u) => u.id !== id));
  const approveDealer = (id) =>
    setDealers((prev) => prev.map((d) => (d.id === id ? { ...d, status: "approved" } : d)));
  const deleteDealer = (id) => setDealers((prev) => prev.filter((d) => d.id !== id));

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-56 shrink-0">
            <div className="card p-4 sticky top-24">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                Navigation
              </p>
              <nav className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item}
                    onClick={() => setActiveTab(item)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      activeTab === item
                        ? "bg-violet-600 text-white shadow-lg shadow-violet-500/25"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item === "Overview" ? "📊" : item === "Users" ? "👥" : "🏪"} {item}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {activeTab === "Overview" && (
              <div>
                <h1 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                  {STATS.map(({ label, value, icon, color }) => (
                    <div key={label} className="card p-6 hover:-translate-y-1 transition-transform">
                      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                        {icon}
                      </div>
                      <p className="text-3xl font-bold text-white">{value}</p>
                      <p className="text-gray-400 text-sm mt-1">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="card p-6">
                    <h3 className="font-semibold text-white mb-4">Recent Users</h3>
                    <div className="space-y-3">
                      {users.map((u) => (
                        <div key={u.id} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {u.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white font-medium truncate">{u.name}</p>
                            <p className="text-xs text-gray-500 truncate">{u.email}</p>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${u.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                            {u.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card p-6">
                    <h3 className="font-semibold text-white mb-4">Pending Approvals</h3>
                    <div className="space-y-3">
                      {dealers.filter((d) => d.status === "pending").map((d) => (
                        <div key={d.id} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {d.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white font-medium truncate">{d.name}</p>
                            <p className="text-xs text-gray-500">{d.location}</p>
                          </div>
                          <button
                            onClick={() => approveDealer(d.id)}
                            className="text-xs bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Approve
                          </button>
                        </div>
                      ))}
                      {dealers.filter((d) => d.status === "pending").length === 0 && (
                        <p className="text-gray-500 text-sm">No pending approvals</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Users" && (
              <div>
                <h1 className="text-2xl font-bold text-white mb-6">User Management</h1>
                <div className="card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          {["Name", "Email", "Phone", "Joined", "Status", "Action"].map((h) => (
                            <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {users.map((u) => (
                          <tr key={u.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                  {u.name.charAt(0)}
                                </div>
                                <span className="text-white text-sm font-medium">{u.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-400 text-sm">{u.email}</td>
                            <td className="px-6 py-4 text-gray-400 text-sm">{u.phone}</td>
                            <td className="px-6 py-4 text-gray-400 text-sm">{u.joined}</td>
                            <td className="px-6 py-4">
                              <span className={`text-xs px-2.5 py-1 rounded-full ${u.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                                {u.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => deleteUser(u.id)}
                                className="text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1.5 rounded-lg transition-colors"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Dealers" && (
              <div>
                <h1 className="text-2xl font-bold text-white mb-6">Dealer Management</h1>
                <div className="card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          {["Dealer", "Email", "Location", "Cars", "Status", "Actions"].map((h) => (
                            <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {dealers.map((d) => (
                          <tr key={d.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                  {d.name.charAt(0)}
                                </div>
                                <span className="text-white text-sm font-medium">{d.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-400 text-sm">{d.email}</td>
                            <td className="px-6 py-4 text-gray-400 text-sm">{d.location}</td>
                            <td className="px-6 py-4 text-gray-300 text-sm">{d.cars}</td>
                            <td className="px-6 py-4">
                              <span className={`text-xs px-2.5 py-1 rounded-full ${d.status === "approved" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                                {d.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                {d.status === "pending" && (
                                  <button
                                    onClick={() => approveDealer(d.id)}
                                    className="text-xs bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 py-1.5 rounded-lg transition-colors"
                                  >
                                    Approve
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteDealer(d.id)}
                                  className="text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1.5 rounded-lg transition-colors"
                                >
                                  Delete
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
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
