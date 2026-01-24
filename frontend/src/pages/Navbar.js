import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(null);

  return (
    <nav className="w-full bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-600">
          Rupya
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((nav) => (
            <div
              key={nav.label}
              className="relative"
              onMouseEnter={() => setOpen(nav.label)}
              onMouseLeave={() => setOpen(null)}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-green-600 font-medium">
                {nav.label}
                <ChevronDown className="w-4 h-4" />
              </button>

              {open === nav.label && (
                <div className="absolute top-full left-0 mt-3 w-56 bg-white border rounded-xl shadow-lg">
                  {nav.items.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="block px-5 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right CTA */}
        <Link
          to="/agent-login"
          className="text-sm font-semibold text-green-600 border border-green-600 px-4 py-2 rounded-full hover:bg-green-50"
        >
          Agent Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
