import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.fullName || !form.mobile) {
      alert("Please fill all fields");
      return;
    }

    // 🔹 You can later connect this to backend
    console.log("Customer Lead:", form);

    alert("Thank you! Our team will contact you shortly.");
    setForm({ fullName: "", mobile: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">

        {/* Branding */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Rupya</h1>
          <p className="text-gray-500 mt-1">
            Aapki har jarurat ka sathi
          </p>
        </div>

        {/* Customer Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">
              Get Started
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />

              <Input
                placeholder="Mobile Number"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
              />

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Login Buttons */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => alert("User login coming soon")}
          >
            User Login
          </Button>

          <Button
            className="w-full"
            onClick={() => navigate("/agent-login")}
          >
            Agent Login
          </Button>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
