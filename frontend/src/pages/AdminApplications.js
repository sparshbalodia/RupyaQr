import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BACKEND_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
const API = `${BACKEND_URL}/api`;


const AdminApplications = () => {
  const [loans, setLoans] = useState([]);
  const [insurance, setInsurance] = useState([]);
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [insuranceApplications, setInsuranceApplications] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("all");


  useEffect(() => {
    fetchLoanApplications();
    fetchInsuranceApplications();
  }, []);

  const fetchLoanApplications = async () => {
    const res = await axios.get(`${API}/loan-applications`);
    setApplications(res.data);
    setFilteredApplications(res.data);
  };

  const fetchInsuranceApplications = async () => {
    const res = await axios.get(`${API}/insurance-applications`);
    setInsuranceApplications(res.data);
  };

  useEffect(() => {
    if (selectedAgent === "all") {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(
        applications.filter(a => a.agentId === selectedAgent)
      );
    }
  }, [selectedAgent, applications]);

  const handleExportLoans = async () => {
    try {
      const response = await axios.get(
        `${API}/loan-applications/export`,
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `loan_applications_${Date.now()}.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Loan export error:", error);
      alert("Failed to export loan applications");
    }
  };

  const handleExportInsurance = async () => {
    try {
      const response = await axios.get(
        `${API}/insurance-applications/export`,
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `insurance_applications_${Date.now()}.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Insurance export error:", error);
      alert("Failed to export insurance applications");
    }
  };
  const handleUpdateApplication = async (appId, updates) => {
    try {
      await axios.patch(`${API}/applications/${appId}`, updates);
      fetchLoanApplications();
      fetchInsuranceApplications();
    } catch (err) {
      console.error(err);
      alert("Failed to update application");
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-8">
      {/* Loan Applications */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Loan Applications ({filteredApplications.length})</CardTitle>

          <Button onClick={handleExportLoans}>
            Export Loans
          </Button>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-left">
                  <th className="px-4 py-3">Agent</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Loan</th>
                  <th className="px-4 py-3">Mobile</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Disbursed</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>

              <tbody>
                {filteredApplications.map((app, idx) => (
                  <tr key={app.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs">{app.agentId}</td>
                    <td className="px-4 py-3">{app.fullName}</td>
                    <td className="px-4 py-3">{app.loanType}</td>
                    <td className="px-4 py-3">{app.mobile}</td>
                    {/* STATUS */}
                    <td className="px-4 py-3">
                      <select
                        value={app.status ?? "none"}
                        onChange={(e) =>
                          handleUpdateApplication(app.id, { status: e.target.value === "none" ? null : e.target.value })
                        }
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="none">No Status</option>
                        <option value="logged">Logged</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    {/* DISBURSED */}
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        defaultValue={app.disbursedAmount || ""}
                        disabled={app.status !== "approved"}
                        onBlur={(e) => {
                          const value = e.target.value;
                          if (value !== "") {
                            handleUpdateApplication(app.id, {
                              disbursedAmount: Number(value),
                            });
                          }
                        }}
                        className="border rounded px-2 py-1 w-28 text-sm"
                      />
                    </td>
                    <td className="px-4 py-3">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Insurance Applications */}
      <Card className="mt-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Insurance Applications ({insuranceApplications.length})</CardTitle>

          <Button onClick={handleExportInsurance}>
            Export Insurance
          </Button>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-left">
                  <th className="px-4 py-3">Agent</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Mobile</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Disbursed</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>

              <tbody>
                {insuranceApplications.map((app, idx) => (
                  <tr key={app.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs">{app.agentId}</td>
                    <td className="px-4 py-3">{app.fullName}</td>
                    <td className="px-4 py-3">{app.insuranceType}</td>
                    <td className="px-4 py-3">{app.mobile}</td>
                    {/* STATUS */}
                    <td className="px-4 py-3">
                      <select
                        value={app.status ?? "none"}
                        onChange={(e) =>
                          handleUpdateApplication(app.id, { status: e.target.value === "none" ? null : e.target.value })
                        }
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="none">No Status</option>
                        <option value="logged">Logged</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>

                    {/* DISBURSED */}
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        defaultValue={app.disbursedAmount || ""}
                        disabled={app.status !== "approved"}
                        onBlur={(e) => {
                          const value = e.target.value;
                          if (value !== "") {
                            handleUpdateApplication(app.id, {
                              disbursedAmount: Number(value),
                            });
                          }
                        }}
                        className="border rounded px-2 py-1 w-28 text-sm"
                      />
                    </td>

                    <td className="px-4 py-3">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminApplications;
