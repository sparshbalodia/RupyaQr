import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
const logos = [
  "/logos/bandhan-bank.png",
  "/logos/chola-finance.png",
  "/logos/fibe.png",
  "/logos/finnable.png",
  "/logos/godrej-capital.png",
  // "/logos/godrej-finance.png",
  "/logos/hdfc-bank.png",
  "/logos/icici-bank.png",
  // "/logos/incred-finance.png",
  "/logos/indusind-bank.png",
  "/logos/kissht-finance.png",
  "/logos/kotak-mahindra-bank.png",
  "/logos/kreditbee.png",
  "/logos/lt-finance.png",
  "/logos/money-view.png",
  "/logos/muthoot-finance.png",
  "/logos/piramal-finance.png",
  "/logos/poonawalla-fincorp.png",
  "/logos/prefer.png",
  "/logos/sbi-bank.png",
  "/logos/smartcoin.png",
  // "/logos/tata-capital.png",
];

const mid = Math.ceil(logos.length / 2);
const topRow = logos.slice(0, mid);
const bottomRow = logos.slice(mid);



const API = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

const AgentDashboard
 = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const [agentName, setAgentName] = useState("");

  useEffect(() => {
    const agentId = localStorage.getItem("agentId");
    const name = localStorage.getItem("agentName");

    if (!agentId) {
      navigate("/agent-login");
      return;
    }

    setAgentName(name || "Agent");
    fetchApplications(agentId);
  }, []);


  const fetchApplications = async (agentId) => {
    try {
      const res = await axios.get(`${API}/applications/agent/${agentId}`);
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("agentId");
    localStorage.removeItem("agentName");

    navigate("/agent-login", { replace: true });
  };
  
  useEffect(() => {
  window.history.pushState(null, "", window.location.href);
  window.onpopstate = () => {
    navigate("/agent-login", { replace: true });
  };
 }, []);


  const totalCount = applications.length;
  const approvedCount = applications.filter(a => a.status === "approved").length;
  const rejectedCount = applications.filter(a => a.status === "rejected").length;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {agentName}
            </h1>
            <p className="text-gray-500">
              Here’s an overview of your submitted applications
            </p>
          </div>
          
          <Button
            variant="outline"
            onClick={handleLogout}
            className="text-red-600 border-red-200 hover:bg-red-50 self-start sm:self-center"
          >
            Logout
          </Button>
        </div>


        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-sm text-gray-500">Total Applications</p>
            <p className="text-4xl font-bold text-gray-900">{totalCount}</p>
          </div>

          <div className="bg-green-50 rounded-xl shadow p-6">
            <p className="text-sm text-green-700">Approved</p>
            <p className="text-4xl font-bold text-green-800">{approvedCount}</p>
          </div>

          <div className="bg-red-50 rounded-xl shadow p-6">
            <p className="text-sm text-red-700">Rejected</p>
            <p className="text-4xl font-bold text-red-800">{rejectedCount}</p>
          </div>
        </div>

        {/* Applications Table */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>My Applications</CardTitle>
          </CardHeader>

          <CardContent>
            {applications.length === 0 ? (
              <p className="text-center text-gray-500 py-10">
                No applications found
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3 text-left">#</th>
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">Mobile</th>
                      <th className="px-4 py-3 text-right">Amount</th>
                      <th className="px-4 py-3 text-right">Disbursed</th>
                      <th className="px-4 py-3 text-center">Type</th>
                      <th className="px-4 py-3 text-center">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {applications.map((app, index) => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3 truncate">{app.fullName}</td>
                        <td className="px-4 py-3">{app.mobile}</td>
                        <td className="px-4 py-3 text-right">
                          ₹{app.monthlyIncome?.toLocaleString() || "-"}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {app.disbursedAmount
                            ? `₹${app.disbursedAmount.toLocaleString()}`
                            : "-"}
                        </td>
                        <td className="px-4 py-3 text-center capitalize">
                          {app.type}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold
                              ${
                                app.status === "approved"
                                  ? "bg-green-100 text-green-700"
                                  : app.status === "rejected"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                          >
                            {app.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>


        {/* Dual Infinite Logo Carousel */}
        {/* Partner Logos */}
        <div className="bg-white rounded-xl shadow py-6 space-y-6 overflow-hidden">

          {/* TOP ROW – Left to Right */}
          {/* <div className="relative overflow-hidden">
            <div className="flex gap-10 animate-marquee-ltr whitespace-nowrap px-6">
              {[...topRow, ...topRow].map((logo, i) => (
                <img
                  key={`top-${i}`}
                  src={logo}
                  alt="Partner"
                  className="h-12 w-auto object-contain opacity-80 hover:opacity-100 transition"
                />
              ))}
            </div>
          </div> */}
          <div className="overflow-hidden w-full">
          <div className="flex w-max gap-10 animate-marquee-ltr">
            {[...topRow, ...topRow].map((logo, i) => (
              <img
                key={i}
                src={logo}
                alt=""
                className="h-12 object-contain flex-shrink-0"
              />
            ))}
          </div>
          </div>
         
          {/* BOTTOM ROW – Right to Left */}
          {/* <div className="relative overflow-hidden">
            <div className="flex gap-10 animate-marquee-rtl whitespace-nowrap px-6">
              {[...bottomRow, ...bottomRow].map((logo, i) => (
                <img
                  key={`bottom-${i}`}
                  src={logo}
                  alt="Partner"
                  className="h-12 w-auto object-contain opacity-80 hover:opacity-100 transition"
                />
              ))}
            </div>
          </div> */}
            <div className="overflow-hidden w-full mt-6">
            <div className="flex w-max gap-10 animate-marquee-rtl">
              {[...bottomRow, ...bottomRow].map((logo, i) => (
                <img
                  key={i}
                  src={logo}
                  alt=""
                  className="h-12 object-contain flex-shrink-0"
                />
              ))}
            </div>
            </div>
            
        </div>

        <style>
          {`
          @keyframes marquee-ltr {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0);
            }
          }

          @keyframes marquee-rtl {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-marquee-ltr {
            animation: marquee-ltr 30s linear infinite;
          }

          .animate-marquee-rtl {
            animation: marquee-rtl 30s linear infinite;
          }
          `}
          </style>


      </div>
    </div>
  );
};

export default AgentDashboard;
