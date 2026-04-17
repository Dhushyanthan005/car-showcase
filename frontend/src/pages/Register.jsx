import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", role: "user" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (form.password.length < 6) e.password = "Min 6 characters";
    if (!/^\d{10}$/.test(form.phone)) e.phone = "10-digit phone required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    login({ name: form.name, email: form.email, role: form.role });
    navigate(`/dashboard/${form.role}`);
  };

  const field = (key, label, type = "text", placeholder = "") => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <input
        type={type}
        className={`input-field ${errors[key] ? "border-red-500/50 focus:ring-red-500" : ""}`}
        placeholder={placeholder}
        value={form[key]}
        onChange={(e) => {
          setForm({ ...form, [key]: e.target.value });
          setErrors({ ...errors, [key]: "" });
        }}
      />
      {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-violet-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/30">
            <span className="text-white font-bold text-2xl">CS</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Create account</h1>
          <p className="text-gray-400 mt-1">Join CarShowcase today</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Register as</label>
              <div className="grid grid-cols-2 gap-2">
                {["user", "dealer"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setForm({ ...form, role: r })}
                    className={`py-2.5 rounded-xl text-sm font-medium capitalize transition-all border ${
                      form.role === r
                        ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/25"
                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {r === "user" ? "🙋 User" : "🏪 Dealer"}
                  </button>
                ))}
              </div>
            </div>

            {field("name", "Full Name", "text", "John Doe")}
            {field("email", "Email", "email", "you@example.com")}
            {field("phone", "Phone Number", "tel", "9876543210")}
            {field("password", "Password", "password", "Min 6 characters")}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
