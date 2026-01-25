import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileLoansOpen, setMobileLoansOpen] = useState(false);
  const [mobileInsuranceOpen, setMobileInsuranceOpen] = useState(false);

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-green-700 cursor-pointer"
          >
            RUPYA<span className="text-green-400">.</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {/* Loans Dropdown */}
            <div className="group relative">
              <button className="flex items-center gap-1 font-medium hover:text-green-600">
                Loans <ChevronDown className="w-4 h-4" />
              </button>

              <div className="absolute -inset-4" />

              <div
                className="absolute left-0 top-full pt-3 w-56
                opacity-0 invisible
                group-hover:opacity-100 group-hover:visible
                transition-all duration-200
                pointer-events-none group-hover:pointer-events-auto"
              >
                <div className="bg-white border rounded-xl shadow-lg overflow-hidden">
                  <DropdownItem label="Personal Loan" />
                  <DropdownItem label="Business Loan" />
                  <DropdownItem label="Instant Loan" />
                </div>
              </div>
            </div>

            {/* Insurance Dropdown */}
            <div className="group relative">
              <button className="flex items-center gap-1 font-medium hover:text-green-600">
                Insurance <ChevronDown className="w-4 h-4" />
              </button>

              <div className="absolute -inset-4" />

              <div
                className="absolute left-0 top-full pt-3 w-56
                opacity-0 invisible
                group-hover:opacity-100 group-hover:visible
                transition-all duration-200
                pointer-events-none group-hover:pointer-events-auto"
              >
                <div className="bg-white border rounded-xl shadow-lg overflow-hidden">
                  <DropdownItem label="Health Insurance" />
                  <DropdownItem label="Life Insurance" />
                  <DropdownItem label="Vehicle Insurance" />
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/agent-login")}
              className="font-medium hover:text-green-600"
            >
              Agent Login
            </button>

            <Button
              onClick={() => navigate("/scan")}
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6"
            >
              Apply Now
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileOpen && (
          <div className="md:hidden px-4 pb-4 space-y-3">
            {/* Loans */}
            <MobileDropdown
              label="Loans"
              open={mobileLoansOpen}
              toggle={() => setMobileLoansOpen(!mobileLoansOpen)}
              items={["Personal Loan", "Business Loan", "Instant Loan"]}
            />

            {/* Insurance */}
            <MobileDropdown
              label="Insurance"
              open={mobileInsuranceOpen}
              toggle={() => setMobileInsuranceOpen(!mobileInsuranceOpen)}
              items={[
                "Health Insurance",
                "Life Insurance",
                "Vehicle Insurance",
              ]}
            />

            <button
              onClick={() => navigate("/agent-login")}
              className="block w-full text-left px-3 py-2 font-medium"
            >
              Agent Login
            </button>

            <Button
              onClick={() => navigate("/scan")}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl"
            >
              Apply Now
            </Button>
          </div>
        )}
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative bg-green-50">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Loans & Insurance,
              <br />
              <span className="text-green-600">Made Simple.</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Aapki har jarurat ka saathi.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                onClick={() => navigate("/scan")}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-xl"
              >
                Apply for Loan
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate("/agent-login")}
                className="px-8 py-6 text-lg rounded-xl"
              >
                Agent Login
              </Button>
            </div>
          </div>

          {/* Placeholder for 3D / animation */}
          <div className="hidden md:flex justify-center">
            <div className="w-[420px] h-[420px] bg-gradient-to-br from-green-200 to-green-100 rounded-3xl flex items-center justify-center text-green-700 font-bold">
              3D / Animation Area
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ================= HELPERS ================= */

const DropdownItem = ({ label }) => (
  <div className="px-4 py-3 hover:bg-green-50 cursor-pointer text-sm">
    {label}
  </div>
);

const MobileDropdown = ({ label, open, toggle, items }) => (
  <div>
    <button
      onClick={toggle}
      className="flex justify-between items-center w-full px-3 py-2 font-medium"
    >
      {label}
      <ChevronDown
        className={`w-4 h-4 transition-transform ${
          open ? "rotate-180" : ""
        }`}
      />
    </button>

    <div
      className={`transition-all duration-300 overflow-hidden ${
        open ? "max-h-64" : "max-h-0"
      }`}
    >
      <div className="pl-4 space-y-2 text-sm text-gray-600">
        {items.map((item) => (
          <div key={item} className="py-1">
            {item}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default LandingPage;
