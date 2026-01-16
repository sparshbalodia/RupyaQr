import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { FileText, Loader2 } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
const API = `${BACKEND_URL}/api`;

const loanTypes = [
  "Personal Loan",
  "Business Loan",
  "Used Car Loan",
  "New Car Loan",
  "Used Commercial Vehicle Loan",
  "New Commercial Vehicle Loan",
  "Two Wheeler Loan",
  "Home Loan",
  "Mortgage Loan (LAP)"
];

const employmentTypes = ["Salaried", "Self Employed"];

const LoanForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const agentId = searchParams.get("agentId");
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    agentId: agentId || "",
    loanType: "",
    fullName: "",
    panNumber: "",
    aadhaarNumber: "",
    mobile: "",
    dob: "",
    address: "",
    employmentType: "",
    monthlyIncome: "",
    email: ""
  });

  useEffect(() => {
    if (!agentId) {
      toast.error("Invalid QR code. Agent ID missing.");
    }
  }, [agentId]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validatePAN = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const validateAadhaar = (aadhaar) => {
    return /^\d{12}$/.test(aadhaar);
  };

  const validateMobile = (mobile) => {
    return /^[6-9]\d{9}$/.test(mobile);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    if (!validatePAN(formData.panNumber)) {
      toast.error("Invalid PAN format. Example: ABCDE1234F");
      return;
    }

    if (!validateAadhaar(formData.aadhaarNumber)) {
      toast.error("Aadhaar must be 12 digits");
      return;
    }

    if (!validateMobile(formData.mobile)) {
      toast.error("Invalid mobile number");
      return;
    }

    setLoading(true);
    try {
      // const payload = {
      //   ...formData,
      //   monthlyIncome: parseFloat(formData.monthlyIncome)
      // };
        const payload = {
          agentId: formData.agentId,
          loanType: formData.loanType,
          fullName: formData.fullName,
          pan: formData.panNumber,          // ✅ FIX
          aadhaar: formData.aadhaarNumber,  // ✅ FIX
          mobile: formData.mobile,
          dob: formData.dob,
          address: formData.address,
          employmentType: formData.employmentType,
          monthlyIncome: Number(formData.monthlyIncome),
          email: formData.email
        };

      
      await axios.post(`${API}/loan-applications`, payload);
      toast.success("Application submitted successfully!");
      navigate("/success");
    } catch (error) {

      console.error("Error submitting application:", error);
      // toast.error(error.response?.data?.detail || "Failed to submit application");
      const message =
        error?.response?.data?.detail?.[0]?.msg ||
        error?.response?.data?.message ||
        "Failed to submit application";

      toast.error(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            Loan Application Form
          </h1>
          <p className="text-gray-600">Fill in your details to apply for a loan</p>
          {agentId && (
            <p className="text-sm text-gray-500 mt-2">Agent ID: <span className="font-mono font-semibold">{agentId}</span></p>
          )}
        </div>

        {/* Form */}
        <Card className="shadow-lg" data-testid="loan-form-card">
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
            <CardDescription>All fields marked with * are required</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Loan Type */}
              <div className="space-y-2">
                <Label htmlFor="loan-type">Which loan are you willing to apply for? *</Label>
                <Select value={formData.loanType} onValueChange={(value) => handleChange("loanType", value)} required>
                  <SelectTrigger id="loan-type" data-testid="loan-type-select">
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    {loanTypes.map((type) => (
                      <SelectItem key={type} value={type} data-testid={`loan-type-${type.replace(/\s+/g, '-').toLowerCase()}`}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name As Per PAN Card *</Label>
                <Input
                  id="full-name"
                  data-testid="full-name-input"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  required
                />
              </div>

              {/* PAN Number */}
              <div className="space-y-2">
                <Label htmlFor="pan-number">PAN Number *</Label>
                <Input
                  id="pan-number"
                  data-testid="pan-number-input"
                  placeholder="ABCDE1234F"
                  value={formData.panNumber}
                  onChange={(e) => handleChange("panNumber", e.target.value.toUpperCase())}
                  maxLength={10}
                  required
                />
              </div>

              {/* Aadhaar Number */}
              <div className="space-y-2">
                <Label htmlFor="aadhaar-number">Aadhaar Number *</Label>
                <Input
                  id="aadhaar-number"
                  data-testid="aadhaar-number-input"
                  placeholder="123456789012"
                  value={formData.aadhaarNumber}
                  onChange={(e) => handleChange("aadhaarNumber", e.target.value.replace(/\D/g, ''))}
                  maxLength={12}
                  required
                />
              </div>

              {/* Mobile Number */}
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input
                  id="mobile"
                  data-testid="mobile-input"
                  type="tel"
                  placeholder="9876543210"
                  value={formData.mobile}
                  onChange={(e) => handleChange("mobile", e.target.value.replace(/\D/g, ''))}
                  maxLength={10}
                  required
                />
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input
                  id="dob"
                  data-testid="dob-input"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  required
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  data-testid="address-input"
                  placeholder="Enter your address (optional)"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>

              {/* Employment Type */}
              <div className="space-y-2">
                <Label htmlFor="employment-type">Employment Type *</Label>
                <Select value={formData.employmentType} onValueChange={(value) => handleChange("employmentType", value)} required>
                  <SelectTrigger id="employment-type" data-testid="employment-type-select">
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    {employmentTypes.map((type) => (
                      <SelectItem key={type} value={type} data-testid={`employment-${type.replace(/\s+/g, '-').toLowerCase()}`}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Monthly Income */}
              <div className="space-y-2">
                <Label htmlFor="monthly-income">Net Monthly Income (₹) *</Label>
                <Input
                  id="monthly-income"
                  data-testid="monthly-income-input"
                  type="number"
                  placeholder="50000"
                  value={formData.monthlyIncome}
                  onChange={(e) => handleChange("monthlyIncome", e.target.value)}
                  min="0"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email ID *</Label>
                <Input
                  id="email"
                  data-testid="email-input"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={loading || !agentId} 
                className="w-full h-12 text-lg"
                data-testid="submit-application-button"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoanForm;
