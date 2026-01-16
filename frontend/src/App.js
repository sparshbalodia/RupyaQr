import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "@/pages/AdminDashboard";
import LoanForm from "@/pages/LoanForm";
import FormSuccess from "@/pages/FormSuccess";
import ScanChoice from "./pages/ScanChoice";
import InsuranceForm from "@/pages/InsuranceForm";
import AdminApplications from "@/pages/AdminApplications";
import AgentLogin from "@/pages/AgentLogin";
import AgentDashboard from "@/pages/AgentDashboard";
import LandingPage from "./pages/LandingPage";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/scan" element={<ScanChoice />} />
        <Route path="/loan-form" element={<LoanForm />} />
        <Route path="/insurance-form" element={<InsuranceForm />} />
        <Route path="/success" element={<FormSuccess />} />

        {/* Agent */}
        <Route path="/agent-login" element={<AgentLogin />} />
        <Route path="/agent/dashboard" element={<AgentDashboard />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/applications" element={<AdminApplications />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
