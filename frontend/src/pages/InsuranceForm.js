import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const InsuranceForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const agentId = searchParams.get("agentId");

  const [formData, setFormData] = useState({
    agentId: agentId || "",
    fullName: "",
    mobile: "",
    insuranceType: "",
    email: "",
  });

  if (!agentId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">Invalid or expired QR</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8000/api/insurance-applications",
        formData
      );
      navigate("/success");
    } catch (error) {
      alert(
        error.response?.data?.detail || "Failed to submit insurance application"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">
          Insurance Application
        </h1>

        <input
          name="fullName"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="mobile"
          placeholder="Mobile Number"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <select
          name="insuranceType"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        >
          <option value="">Select Insurance Type</option>
          <option value="Health">Health Insurance</option>
          <option value="Life">Life Insurance</option>
          <option value="Vehicle">Vehicle Insurance</option>
        </select>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />

        <Button type="submit" className="w-full">
          Submit Insurance Application
        </Button>
      </form>
    </div>
  );
};

export default InsuranceForm;
