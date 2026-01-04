import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "@/pages/AdminDashboard";
import LoanForm from "@/pages/LoanForm";
import FormSuccess from "@/pages/FormSuccess";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/form" element={<LoanForm />} />
          <Route path="/success" element={<FormSuccess />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
