import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CS</span>
          </div>
          <span className="text-white font-bold text-lg">CarShowcase</span>
        </Link>

        <div className="flex items-center gap-4">
          {user && (
            <>
              <span className="text-gray-400 text-sm hidden sm:block">
                {user.name} •{" "}
                <span className="text-violet-400 capitalize">{user.role}</span>
              </span>
              <button onClick={handleLogout} className="btn-secondary text-sm py-2 px-4">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
