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

      {/* ================= LOANS SECTION ================= */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">
              Loans designed for your needs
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Get quick access to loans with simple eligibility and transparent processing.
            </p>
          </div>

          {/* Loan Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">

            <LoanCard
              title="Personal Loan"
              description="Instant funds for your personal expenses with minimal documentation."
              points={[
                "Loan up to ₹5 Lakhs",
                "No collateral required",
                "Fast approval",
              ]}
            />

            <LoanCard
              title="Business Loan"
              description="Fuel your business growth with easy and flexible financing."
              points={[
                "Loan up to ₹50 Lakhs",
                "Flexible repayment",
                "Designed for MSMEs",
              ]}
            />

            <LoanCard
              title="Instant Credit"
              description="Short-term credit solutions for urgent financial needs."
              points={[
                "Quick disbursal",
                "Short tenure",
                "Simple KYC",
              ]}
            />
          </div>
  
            
        </div>
      </section>


      {/* ================= INSURANCE SECTION ================= */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">
              Insurance that protects what matters
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Compare and apply for insurance plans easily with expert assistance via Rupya.
            </p>
          </div>

          {/* Insurance Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">

            <InsuranceCard
              title="Health Insurance"
              description="Medical coverage for you and your family with cashless hospitalization."
              points={[
                "Cashless hospital network",
                "Tax benefits under 80D",
                "Covers critical illnesses",
              ]}
            />

            <InsuranceCard
              title="Life Insurance"
              description="Secure your family’s future with reliable life cover plans."
              points={[
                "High life cover at low premium",
                "Financial security for dependents",
                "Flexible policy tenure",
              ]}
            />

            <InsuranceCard
              title="Motor Insurance"
              description="Protect your vehicle against accidents, theft, and damages."
              points={[
                "Third-party & comprehensive cover",
                "Instant policy issuance",
                "Zero-depreciation add-ons",
              ]}
            />
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

const LoanCard = ({ title, description, points }) => {
  return (
    <div className="border rounded-2xl p-8 bg-white hover:shadow-lg transition">
      <h3 className="text-xl font-bold">{title}</h3>

      <p className="mt-3 text-gray-600">
        {description}
      </p>

      <ul className="mt-6 space-y-2 text-gray-600">
        {points.map((item) => (
          <li key={item}>✔ {item}</li>
        ))}
      </ul>

      <button
        onClick={() => window.location.href = "/scan"}
        className="mt-8 w-full border border-green-600 text-green-700 hover:bg-green-50 py-3 rounded-xl font-medium transition"
      >
        Apply Now
      </button>
    </div>
  );
};


const InsuranceCard = ({ title, description, points }) => {
  return (
    <div className="border rounded-2xl p-8 bg-white hover:shadow-lg transition">
      <h3 className="text-xl font-bold">{title}</h3>

      <p className="mt-3 text-gray-600">
        {description}
      </p>

      <ul className="mt-6 space-y-2 text-gray-600">
        {points.map((item) => (
          <li key={item}>✔ {item}</li>
        ))}
      </ul>

      <button
        onClick={() => window.location.href = "/scan"}
        className="mt-8 w-full border border-green-600 text-green-700 hover:bg-green-50 py-3 rounded-xl font-medium transition"
      >
        Get Covered
      </button>
    </div>
  );
};


export default LandingPage;