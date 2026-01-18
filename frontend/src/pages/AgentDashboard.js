// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import {
//   LogOut,
//   ArrowUpRight,
//   CheckCircle2,
//   XCircle,
//   Clock
// } from "lucide-react";

// const API = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

// /* Partner Logos */
// const logos = [
//   "/logos/bandhan-bank.png",
//   "/logos/chola-finance.png",
//   "/logos/fibe.png",
//   "/logos/finnable.png",
//   "/logos/godrej-capital.png",
//   "/logos/hdfc-bank.png",
//   "/logos/icici-bank.png",
//   "/logos/indusind-bank.png",
//   "/logos/kissht-finance.png",
//   "/logos/kotak-mahindra-bank.png",
//   "/logos/kreditbee.png",
//   "/logos/lt-finance.png",
//   "/logos/money-view.png",
//   "/logos/muthoot-finance.png",
//   "/logos/piramal-finance.png",
//   "/logos/poonawalla-fincorp.png",
//   "/logos/prefer.png",
//   "/logos/sbi-bank.png",
//   "/logos/smartcoin.png"
// ];

// const mid = Math.ceil(logos.length / 2);
// const topRow = logos.slice(0, mid);
// const bottomRow = logos.slice(mid);

// const AgentDashboard = () => {
//   const [applications, setApplications] = useState([]);
//   const [agentName, setAgentName] = useState("");
//   const navigate = useNavigate();

//   /* AUTH + FETCH */
//   useEffect(() => {
//     let mounted = true;

//     const agentId = localStorage.getItem("agentId");
//     const name = localStorage.getItem("agentName");

//     if (!agentId) {
//       navigate("/agent-login", { replace: true });
//       return;
//     }

//     setAgentName(name || "Agent");

//     axios
//       .get(`${API}/applications/agent/${agentId}`)
//       .then((res) => mounted && setApplications(res.data))
//       .catch(console.error);

//     /* Prevent back navigation */
//     const handler = () => {
//       navigate("/agent-login", { replace: true });
//     };

//     window.history.pushState(null, "", window.location.href);
//     window.addEventListener("popstate", handler);

//     return () => {
//       mounted = false;
//       window.removeEventListener("popstate", handler);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/agent-login", { replace: true });
//   };

//   const total = applications.length;
//   const approved = applications.filter(a => a.status === "approved").length;
//   const rejected = applications.filter(a => a.status === "rejected").length;

//   return (
//     <div className="min-h-screen bg-black text-white overflow-x-hidden">
      
//       {/* NAVBAR */}
//       <nav
//         aria-label="Agent navigation"
//         className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur px-6 py-5"
//       >
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <div>
//             <span className="text-xl font-bold tracking-tight">RUPYA.</span>
//             <span className="ml-3 text-xs font-mono text-zinc-500 bg-zinc-900 px-2 py-1 rounded">
//               AGENT PORTAL
//             </span>
//           </div>

//           <div className="flex items-center gap-5">
//             <span className="hidden sm:inline text-sm text-zinc-400">
//               {agentName}
//             </span>
//             <Button
//               variant="ghost"
//               onClick={handleLogout}
//               className="text-zinc-400 hover:text-white hover:bg-white/10 rounded-full"
//             >
//               <LogOut className="w-4 h-4 mr-2" />
//               Logout
//             </Button>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto px-6 py-14 space-y-16">

//         {/* HEADER */}
//         <div>
//           <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
//             Dashboard Overview
//           </h1>
//           <p className="text-zinc-400 text-lg mt-2">
//             Track your applications in real-time
//           </p>
//         </div>

//         {/* STATS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <StatCard label="Total Applications" value={total} />
//           <StatCard label="Approved" value={approved} type="success" />
//           <StatCard label="Rejected" value={rejected} type="danger" />
//         </div>

//         {/* TABLE */}
//         <section className="space-y-6">
//           <div className="flex justify-between items-center border-b border-white/10 pb-4">
//             <h2 className="text-2xl font-semibold">Recent Applications</h2>
//             <span className="text-xs text-zinc-500 uppercase">Live</span>
//           </div>

//           {applications.length === 0 ? (
//             <div className="border border-dashed border-zinc-800 rounded-xl py-20 text-center text-zinc-500">
//               No applications submitted yet
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="text-xs uppercase tracking-widest text-zinc-500 border-b border-zinc-800">
//                     <th className="px-4 py-4 text-left">Applicant</th>
//                     <th className="px-4 py-4 text-left">Type</th>
//                     <th className="px-4 py-4 text-right">Income</th>
//                     <th className="px-4 py-4 text-right">Status</th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-zinc-800/50">
//                   {applications.map((app, i) => {
//                     const status =
//                       !app.status || app.status === "logged"
//                         ? "pending"
//                         : app.status;

//                     return (
//                       <tr
//                         key={app.id || i}
//                         className="hover:bg-white/5 transition"
//                       >
//                         <td className="px-4 py-5">
//                           <div className="font-medium">{app.fullName}</div>
//                           <div className="text-sm text-zinc-500">{app.mobile}</div>
//                         </td>

//                         <td className="px-4 py-5 capitalize text-zinc-300">
//                           {app.loanType || app.type}
//                         </td>

//                         <td className="px-4 py-5 text-right font-mono">
//                           {app.monthlyIncome
//                             ? `₹${app.monthlyIncome.toLocaleString()}`
//                             : "-"}
//                           {app.disbursedAmount && (
//                             <div className="text-xs text-green-500 mt-1">
//                               Disbursed ₹{app.disbursedAmount.toLocaleString()}
//                             </div>
//                           )}
//                         </td>

//                         <td className="px-4 py-5 text-right">
//                           <StatusBadge status={status} />
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </section>
//       </main>

//       {/* PARTNERS */}
//       <div className="bg-white text-black py-12 mt-24 overflow-hidden">
//         <div className="max-w-7xl mx-auto px-6 mb-8">
//           <p className="text-xs font-bold tracking-widest uppercase border-b border-black pb-2 inline-block">
//             Our Banking Partners
//           </p>
//         </div>

//         <div className="flex flex-col gap-8 grayscale hover:grayscale-0 transition">
//           <div className="flex w-max gap-16 animate-marquee-ltr">
//             {[...topRow, ...topRow].map((logo, i) => (
//               <img
//                 key={i}
//                 src={logo}
//                 alt="Bank partner logo"
//                 className="h-10 object-contain"
//               />
//             ))}
//           </div>

//           <div className="flex w-max gap-16 animate-marquee-rtl">
//             {[...bottomRow, ...bottomRow].map((logo, i) => (
//               <img
//                 key={i}
//                 src={logo}
//                 alt="Bank partner logo"
//                 className="h-10 object-contain"
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* MARQUEE CSS */}
//       <style>{`
//         @keyframes marquee-ltr {
//           0% { transform: translateX(-50%); }
//           100% { transform: translateX(0); }
//         }
//         @keyframes marquee-rtl {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//         .animate-marquee-ltr { animation: marquee-ltr 40s linear infinite; }
//         .animate-marquee-rtl { animation: marquee-rtl 40s linear infinite; }
//       `}</style>
//     </div>
//   );
// };

// /* ---------------- HELPER COMPONENTS ---------------- */

// const StatCard = ({ label, value, type = "default" }) => {
//   const accent =
//     type === "success"
//       ? "text-green-400"
//       : type === "danger"
//       ? "text-red-400"
//       : "text-zinc-500";

//   return (
//     <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-zinc-600 transition">
//       <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">
//         {label}
//       </p>
//       <div className="flex items-center gap-3">
//         <span className="text-5xl font-bold">{value}</span>
//         {type === "success" && (
//           <ArrowUpRight className={`w-5 h-5 ${accent}`} />
//         )}
//       </div>
//     </div>
//   );
// };

// const StatusBadge = ({ status }) => {
//   const map = {
//     approved: {
//       label: "Approved",
//       icon: CheckCircle2,
//       color: "text-green-400",
//       bg: "bg-green-400/10"
//     },
//     rejected: {
//       label: "Rejected",
//       icon: XCircle,
//       color: "text-red-400",
//       bg: "bg-red-400/10"
//     },
//     pending: {
//       label: "Pending",
//       icon: Clock,
//       color: "text-yellow-400",
//       bg: "bg-yellow-400/10"
//     }
//   };

//   const cfg = map[status] || map.pending;
//   const Icon = cfg.icon;

//   return (
//     <span
//       className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${cfg.bg}`}
//     >
//       <Icon className={`w-3 h-3 ${cfg.color}`} />
//       <span className={`text-xs font-medium ${cfg.color}`}>
//         {cfg.label}
//       </span>
//     </span>
//   );
// };

// export default AgentDashboard;



// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// const logos = [
//   "/logos/bandhan-bank.png",
//   "/logos/chola-finance.png",
//   "/logos/fibe.png",
//   "/logos/finnable.png",
//   "/logos/godrej-capital.png",
//   // "/logos/godrej-finance.png",
//   "/logos/hdfc-bank.png",
//   "/logos/icici-bank.png",
//   // "/logos/incred-finance.png",
//   "/logos/indusind-bank.png",
//   "/logos/kissht-finance.png",
//   "/logos/kotak-mahindra-bank.png",
//   "/logos/kreditbee.png",
//   "/logos/lt-finance.png",
//   "/logos/money-view.png",
//   "/logos/muthoot-finance.png",
//   "/logos/piramal-finance.png",
//   "/logos/poonawalla-fincorp.png",
//   "/logos/prefer.png",
//   "/logos/sbi-bank.png",
//   "/logos/smartcoin.png",
//   // "/logos/tata-capital.png",
// ];

// const mid = Math.ceil(logos.length / 2);
// const topRow = logos.slice(0, mid);
// const bottomRow = logos.slice(mid);



// const API = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

// const AgentDashboard
//  = () => {
//   const [applications, setApplications] = useState([]);
//   const navigate = useNavigate();
//   const [agentName, setAgentName] = useState("");

//   useEffect(() => {
//     const agentId = localStorage.getItem("agentId");
//     const name = localStorage.getItem("agentName");

//     if (!agentId) {
//       navigate("/agent-login");
//       return;
//     }

//     setAgentName(name || "Agent");
//     fetchApplications(agentId);
//   }, []);


//   const fetchApplications = async (agentId) => {
//     try {
//       const res = await axios.get(`${API}/applications/agent/${agentId}`);
//       setApplications(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("agentId");
//     localStorage.removeItem("agentName");

//     navigate("/agent-login", { replace: true });
//   };
  
//   useEffect(() => {
//   window.history.pushState(null, "", window.location.href);
//   window.onpopstate = () => {
//     navigate("/agent-login", { replace: true });
//   };
//  }, []);


//   const totalCount = applications.length;
//   const approvedCount = applications.filter(a => a.status === "approved").length;
//   const rejectedCount = applications.filter(a => a.status === "rejected").length;

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-7xl mx-auto space-y-8">

//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">
//               Welcome, {agentName}
//             </h1>
//             <p className="text-gray-500">
//               Here’s an overview of your submitted applications
//             </p>
//           </div>
          
//           <Button
//             variant="outline"
//             onClick={handleLogout}
//             className="text-red-600 border-red-200 hover:bg-red-50 self-start sm:self-center"
//           >
//             Logout
//           </Button>
//         </div>


//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
//           <div className="rounded-2xl bg-white/70 backdrop-blur border shadow-sm p-6">
//             <p className="text-sm text-gray-500">Total Applications</p>
//             <p className="text-4xl font-bold mt-2">{totalCount}</p>
//           </div>

//           <div className="rounded-2xl bg-green-50/70 backdrop-blur border border-green-100 shadow-sm p-6">
//             <p className="text-sm text-green-700">Approved</p>
//             <p className="text-4xl font-bold text-green-800 mt-2">
//               {approvedCount}
//             </p>
//           </div>

//           <div className="rounded-2xl bg-red-50/70 backdrop-blur border border-red-100 shadow-sm p-6">
//             <p className="text-sm text-red-700">Rejected</p>
//             <p className="text-4xl font-bold text-red-800 mt-2">
//               {rejectedCount}
//             </p>
//           </div>
//         </div>
//         {/* Applications Table */}
//         <Card className="shadow-lg">
//           <CardHeader>
//             <CardTitle>My Applications</CardTitle>
//           </CardHeader>

//           <CardContent>
//             {applications.length === 0 ? (
//               <p className="text-center text-gray-500 py-10">
//                 No applications found
//               </p>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full border-collapse text-sm">
//                   <thead className="bg-gray-100 sticky top-0 z-10">
//                     <tr>
//                       <th className="px-4 py-3 text-left">#</th>
//                       <th className="px-4 py-3 text-left">Name</th>
//                       <th className="px-4 py-3 text-left">Mobile</th>
//                       <th className="px-4 py-3 text-right">Amount</th>
//                       <th className="px-4 py-3 text-right">Disbursed</th>
//                       <th className="px-4 py-3 text-center">Type</th>
//                       <th className="px-4 py-3 text-center">Status</th>
//                     </tr>
//                   </thead>

//                   <tbody className="divide-y">
//                     {applications.map((app, index) => (
//                       <tr key={app.id} className="hover:bg-gray-50">
//                         <td className="px-4 py-3">{index + 1}</td>
//                         <td className="px-4 py-3 truncate">{app.fullName}</td>
//                         <td className="px-4 py-3">{app.mobile}</td>
//                         <td className="px-4 py-3 text-right">
//                           ₹{app.monthlyIncome?.toLocaleString() || "-"}
//                         </td>
//                         <td className="px-4 py-3 text-right">
//                           {app.disbursedAmount
//                             ? `₹${app.disbursedAmount.toLocaleString()}`
//                             : "-"}
//                         </td>
//                         <td className="px-4 py-3 text-center capitalize">
//                           {app.type}
//                         </td>
//                         <td className="px-4 py-3 text-center">
//                           <span
//                             className={`px-3 py-1 rounded-full text-xs font-semibold
//                               ${
//                                 app.status === "approved"
//                                   ? "bg-green-100 text-green-700"
//                                   : app.status === "rejected"
//                                   ? "bg-red-100 text-red-700"
//                                   : "bg-yellow-100 text-yellow-700"
//                               }`}
//                           >
//                             {app.status}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </CardContent>
//         </Card>


//         {/* Dual Infinite Logo Carousel */}
//         {/* Partner Logos */}
//         <div className="bg-white rounded-xl shadow py-6 space-y-6 overflow-hidden">

//           {/* TOP ROW – Left to Right */}
//           {/* <div className="relative overflow-hidden">
//             <div className="flex gap-10 animate-marquee-ltr whitespace-nowrap px-6">
//               {[...topRow, ...topRow].map((logo, i) => (
//                 <img
//                   key={`top-${i}`}
//                   src={logo}
//                   alt="Partner"
//                   className="h-12 w-auto object-contain opacity-80 hover:opacity-100 transition"
//                 />
//               ))}
//             </div>
//           </div> */}
//           <div className="overflow-hidden w-full">
//           <div className="flex w-max gap-10 animate-marquee-ltr">
//             {[...topRow, ...topRow].map((logo, i) => (
//               <img
//                 key={i}
//                 src={logo}
//                 alt=""
//                 className="h-12 object-contain flex-shrink-0"
//               />
//             ))}
//           </div>
//           </div>
         
//           {/* BOTTOM ROW – Right to Left */}
//           {/* <div className="relative overflow-hidden">
//             <div className="flex gap-10 animate-marquee-rtl whitespace-nowrap px-6">
//               {[...bottomRow, ...bottomRow].map((logo, i) => (
//                 <img
//                   key={`bottom-${i}`}
//                   src={logo}
//                   alt="Partner"
//                   className="h-12 w-auto object-contain opacity-80 hover:opacity-100 transition"
//                 />
//               ))}
//             </div>
//           </div> */}
//             <div className="overflow-hidden w-full mt-6">
//             <div className="flex w-max gap-10 animate-marquee-rtl">
//               {[...bottomRow, ...bottomRow].map((logo, i) => (
//                 <img
//                   key={i}
//                   src={logo}
//                   alt=""
//                   className="h-12 object-contain flex-shrink-0"
//                 />
//               ))}
//             </div>
//             </div>
            
//         </div>

//         <style>
//           {`
//           @keyframes marquee-ltr {
//             0% {
//               transform: translateX(-50%);
//             }
//             100% {
//               transform: translateX(0);
//             }
//           }

//           @keyframes marquee-rtl {
//             0% {
//               transform: translateX(0);
//             }
//             100% {
//               transform: translateX(-50%);
//             }
//           }

//           .animate-marquee-ltr {
//             animation: marquee-ltr 30s linear infinite;
//           }

//           .animate-marquee-rtl {
//             animation: marquee-rtl 30s linear infinite;
//           }
//           `}
//           </style>


//       </div>
//     </div>
//   );
// };
//  export default AgentDashboard;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { LogOut, ArrowUpRight, CheckCircle2, XCircle, Clock } from "lucide-react";

// const logos = [
//   "/logos/bandhan-bank.png", "/logos/chola-finance.png", "/logos/fibe.png",
//   "/logos/finnable.png", "/logos/godrej-capital.png", "/logos/hdfc-bank.png",
//   "/logos/icici-bank.png", "/logos/indusind-bank.png", "/logos/kissht-finance.png",
//   "/logos/kotak-mahindra-bank.png", "/logos/kreditbee.png", "/logos/lt-finance.png",
//   "/logos/money-view.png", "/logos/muthoot-finance.png", "/logos/piramal-finance.png",
//   "/logos/poonawalla-fincorp.png", "/logos/prefer.png", "/logos/sbi-bank.png",
//   "/logos/smartcoin.png"
// ];

// const mid = Math.ceil(logos.length / 2);
// const topRow = logos.slice(0, mid);
// const bottomRow = logos.slice(mid);

// const API = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

// const AgentDashboard = () => {
//   const [applications, setApplications] = useState([]);
//   const navigate = useNavigate();
//   const [agentName, setAgentName] = useState("");

//   useEffect(() => {
//     const agentId = localStorage.getItem("agentId");
//     const name = localStorage.getItem("agentName");

//     if (!agentId) {
//       navigate("/agent-login");
//       return;
//     }

//     setAgentName(name || "Agent");
//     fetchApplications(agentId);
    
//     // Setup back button prevention
//     window.history.pushState(null, "", window.location.href);
//     window.onpopstate = () => {
//         navigate("/agent-login", { replace: true });
//     };
//   }, []);

//   const fetchApplications = async (agentId) => {
//     try {
//       const res = await axios.get(`${API}/applications/agent/${agentId}`);
//       setApplications(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("agentId");
//     localStorage.removeItem("agentName");
//     navigate("/agent-login", { replace: true });
//   };

//   const totalCount = applications.length;
//   const approvedCount = applications.filter(a => a.status === "approved").length;
//   const rejectedCount = applications.filter(a => a.status === "rejected").length;

//   return (
//     <div className="min-h-screen bg-black text-white font-sans selection:bg-zinc-800 overflow-x-hidden">
      
//       {/* Top Navigation */}
//       <nav className="border-b border-white/10 px-6 py-6 sticky top-0 bg-black/80 backdrop-blur-md z-40">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//             <div>
//                 <span className="text-xl font-bold tracking-tighter">RUPYA.</span>
//                 <span className="ml-3 text-xs font-mono text-zinc-500 bg-zinc-900 px-2 py-1 rounded">AGENT PORTAL</span>
//             </div>
//             <div className="flex items-center gap-6">
//                 <span className="hidden sm:inline-block text-zinc-400 text-sm">Logged in as <span className="text-white font-medium">{agentName}</span></span>
//                 <Button 
//                     variant="ghost" 
//                     onClick={handleLogout}
//                     className="text-zinc-400 hover:text-white hover:bg-white/10 rounded-full px-4 h-10"
//                 >
//                     <LogOut className="w-4 h-4 mr-2" />
//                     Logout
//                 </Button>
//             </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        
//         {/* Welcome Section */}
//         <div className="space-y-2">
//             <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Dashboard Overview</h1>
//             <p className="text-zinc-400 text-lg">Track your performance and application status in real-time.</p>
//         </div>

//         {/* Stats Grid - High Impact Numbers */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <StatCard label="Total Applications" value={totalCount} delay={0} />
//             <StatCard label="Approved" value={approvedCount} type="success" delay={100} />
//             <StatCard label="Rejected" value={rejectedCount} type="danger" delay={200} />
//         </div>

//         {/* Applications List */}
//         <div className="space-y-6">
//             <div className="flex items-center justify-between border-b border-white/10 pb-4">
//                 <h2 className="text-2xl font-semibold">Recent Applications</h2>
//                 <span className="text-xs text-zinc-500 uppercase tracking-wider">Live Data</span>
//             </div>

//             {applications.length === 0 ? (
//                  <div className="py-20 text-center border border-dashed border-zinc-800 rounded-2xl">
//                     <p className="text-zinc-500">No applications submitted yet.</p>
//                  </div>
//             ) : (
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-left border-collapse">
//                         <thead>
//                             <tr className="text-xs text-zinc-500 uppercase tracking-widest border-b border-zinc-800">
//                                 <th className="px-4 py-4 font-medium">Applicant</th>
//                                 <th className="px-4 py-4 font-medium">Details</th>
//                                 <th className="px-4 py-4 font-medium text-right">Income</th>
//                                 <th className="px-4 py-4 font-medium text-right">Status</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-zinc-800/50">
//                             {applications.map((app, index) => (
//                                 <tr key={app.id || index} className="group hover:bg-white/5 transition-colors">
//                                     <td className="px-4 py-6">
//                                         <div className="font-medium text-lg">{app.fullName}</div>
//                                         <div className="text-zinc-500 text-sm">{app.mobile}</div>
//                                     </td>
//                                     <td className="px-4 py-6">
//                                         <div className="text-zinc-300">{app.loanType || app.type}</div>
//                                         <div className="text-xs text-zinc-600 font-mono mt-1">ID: #{index + 1}</div>
//                                     </td>
//                                     <td className="px-4 py-6 text-right">
//                                         <div className="font-mono text-zinc-300">₹{app.monthlyIncome?.toLocaleString()}</div>
//                                         {app.disbursedAmount && (
//                                             <div className="text-xs text-green-500 mt-1">Disbursed: ₹{app.disbursedAmount.toLocaleString()}</div>
//                                         )}
//                                     </td>
//                                     <td className="px-4 py-6 text-right">
//                                         <StatusBadge status={app.status} />
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//       </main>

//       {/* High Contrast Marquee Section */}
//       <div className="w-full bg-white text-black py-12 mt-20 overflow-hidden">
//          <div className="max-w-7xl mx-auto px-6 mb-8">
//             <p className="text-sm font-bold tracking-widest uppercase border-b border-black pb-2 inline-block">Our Banking Partners</p>
//          </div>
         
//          {/* Marquee Container */}
//          <div className="flex flex-col gap-8 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
//             <div className="flex w-max gap-16 animate-marquee-ltr">
//                 {[...topRow, ...topRow].map((logo, i) => (
//                   <img key={i} src={logo} alt="" className="h-10 object-contain flex-shrink-0" />
//                 ))}
//             </div>
//             <div className="flex w-max gap-16 animate-marquee-rtl">
//                 {[...bottomRow, ...bottomRow].map((logo, i) => (
//                   <img key={i} src={logo} alt="" className="h-10 object-contain flex-shrink-0" />
//                 ))}
//             </div>
//          </div>
//       </div>

//       <style>{`
//           @keyframes marquee-ltr { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
//           @keyframes marquee-rtl { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
//           .animate-marquee-ltr { animation: marquee-ltr 40s linear infinite; }
//           .animate-marquee-rtl { animation: marquee-rtl 40s linear infinite; }
//       `}</style>
//     </div>
//   );
// };

// // Helper Components for Cleaner Main Code
// const StatCard = ({ label, value, type = "default", delay }) => {
//     const colors = {
//         default: "bg-zinc-900 border-zinc-800 text-white",
//         success: "bg-zinc-900 border-zinc-800 text-white", // Keeping bg dark, changing accent text only for elegance
//         danger: "bg-zinc-900 border-zinc-800 text-white"
//     };
    
//     const textColors = {
//         default: "text-zinc-500",
//         success: "text-green-500",
//         danger: "text-red-500"
//     };

//     return (
//         <div 
//             className={`p-8 rounded-2xl border ${colors[type]} hover:border-zinc-600 transition-all duration-500`}
//             style={{ animationDelay: `${delay}ms` }}
//         >
//             <p className="text-xs uppercase tracking-widest font-semibold text-zinc-500 mb-4">{label}</p>
//             <div className="flex items-baseline gap-2">
//                 <span className="text-5xl font-bold tracking-tighter">{value}</span>
//                 {type === 'success' && <ArrowUpRight className="w-5 h-5 text-green-500" />}
//             </div>
//         </div>
//     );
// };

// const StatusBadge = ({ status }) => {
//     const styles = {
//         approved: { icon: CheckCircle2, color: "text-green-400", bg: "bg-green-400/10", label: "Approved" },
//         rejected: { icon: XCircle, color: "text-red-400", bg: "bg-red-400/10", label: "Rejected" },
//         pending: { icon: Clock, color: "text-yellow-400", bg: "bg-yellow-400/10", label: "Pending" }
//     };

//     const config = styles[status] || styles.pending;
//     const Icon = config.icon;

//     return (
//         <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bg} border border-white/5`}>
//             <Icon className={`w-3 h-3 ${config.color}`} />
//             <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
//         </div>
//     );
// };

// export default AgentDashboard;

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowUpRight, CheckCircle2, XCircle, Clock, Wallet, Users, LayoutGrid } from "lucide-react";

// Banking Partners Logos
const logos = [
  "/logos/bandhan-bank.png", "/logos/chola-finance.png", "/logos/fibe.png",
  "/logos/finnable.png", "/logos/godrej-capital.png", "/logos/hdfc-bank.png",
  "/logos/icici-bank.png", "/logos/indusind-bank.png", "/logos/kissht-finance.png",
  "/logos/kotak-mahindra-bank.png", "/logos/kreditbee.png", "/logos/lt-finance.png",
  "/logos/money-view.png", "/logos/muthoot-finance.png", "/logos/piramal-finance.png",
  "/logos/poonawalla-fincorp.png", "/logos/prefer.png", "/logos/sbi-bank.png",
  "/logos/smartcoin.png"
];

const mid = Math.ceil(logos.length / 2);
const topRow = logos.slice(0, mid);
const bottomRow = logos.slice(mid);

const API = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

const AgentDashboard = () => {
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
    
    // Prevent back navigation
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
        navigate("/agent-login", { replace: true });
    };
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

  const totalCount = applications.length;
  const approvedCount = applications.filter(a => a.status === "approved").length;
  const rejectedCount = applications.filter(a => a.status === "rejected").length;

  return (
    <div className="min-h-screen bg-rupya-50/30 text-rupya-950 font-sans selection:bg-rupya-200">
      
      {/* Navbar */}
      <nav className="border-b border-rupya-200/50 bg-white/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-rupya-700 rounded-lg flex items-center justify-center text-white font-bold">R</div>
                <span className="text-xl font-bold tracking-tight text-rupya-950">RUPYA.</span>
            </div>
            <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end mr-2">
                    <span className="text-sm font-semibold text-rupya-900">{agentName}</span>
                    <span className="text-xs text-rupya-500 uppercase tracking-wider">Authorized Agent</span>
                </div>
                <Button 
                    variant="ghost" 
                    onClick={handleLogout}
                    className="text-rupya-600 hover:text-rupya-900 hover:bg-rupya-100 rounded-full h-10 w-10 p-0"
                >
                    <LogOut className="w-5 h-5" />
                </Button>
            </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
                <h1 className="text-4xl font-bold tracking-tight text-rupya-950">Overview</h1>
                <p className="text-rupya-600 mt-1">Real-time application metrics.</p>
            </div>
            <Button className="bg-rupya-700 hover:bg-rupya-800 text-white rounded-full px-6 shadow-lg shadow-rupya-700/20">
                <LayoutGrid className="w-4 h-4 mr-2" /> View Reports
            </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
                label="Total Applications" 
                value={totalCount} 
                icon={Users}
                color="text-rupya-700"
                delay={0} 
            />
            <StatCard 
                label="Approved Loans" 
                value={approvedCount} 
                icon={CheckCircle2}
                color="text-rupya-700" 
                trend="positive"
                delay={100} 
            />
            <StatCard 
                label="Rejected" 
                value={rejectedCount} 
                icon={XCircle}
                color="text-red-600"
                delay={200} 
            />
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-3xl border border-rupya-100 shadow-xl shadow-rupya-900/5 overflow-hidden">
            <div className="px-8 py-6 border-b border-rupya-50 flex items-center justify-between bg-rupya-50/30">
                <h2 className="text-lg font-bold text-rupya-900">Recent Activity</h2>
                <div className="flex gap-2">
                     <span className="w-3 h-3 bg-rupya-500 rounded-full animate-pulse"></span>
                     <span className="text-xs font-medium text-rupya-600">Live Updates</span>
                </div>
            </div>

            {applications.length === 0 ? (
                 <div className="py-24 text-center">
                    <div className="w-16 h-16 bg-rupya-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Wallet className="w-8 h-8 text-rupya-300" />
                    </div>
                    <p className="text-rupya-400 font-medium">No applications found.</p>
                 </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-rupya-50/50">
                            <tr className="text-xs text-rupya-500 uppercase tracking-wider">
                                <th className="px-8 py-4 font-bold">Applicant</th>
                                <th className="px-8 py-4 font-bold">Loan Type</th>
                                <th className="px-8 py-4 font-bold text-right">Income (₹)</th>
                                <th className="px-8 py-4 font-bold text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-rupya-50">
                            {applications.map((app, index) => (
                                <tr key={app.id || index} className="group hover:bg-rupya-50/30 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="font-bold text-rupya-900">{app.fullName}</div>
                                        <div className="text-rupya-400 text-sm font-medium">{app.mobile}</div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-white border border-rupya-100 text-xs font-medium text-rupya-600 shadow-sm">
                                            {app.loanType || app.type}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="font-mono font-semibold text-rupya-800">
                                            {app.monthlyIncome?.toLocaleString()}
                                        </div>
                                        {app.disbursedAmount && (
                                            <div className="text-xs text-rupya-600 mt-1">
                                                Disbursed: ₹{app.disbursedAmount.toLocaleString()}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <StatusBadge status={app.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
      </main>

      {/* Partners Marquee */}
      <div className="mt-20 border-t border-rupya-200 bg-white py-10 overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 mb-6">
            <p className="text-xs font-bold tracking-widest uppercase text-rupya-400">Trusted By Leading Banks</p>
         </div>
         <div className="flex flex-col gap-8 opacity-70 hover:opacity-100 transition-opacity duration-500">
            <div className="flex w-max gap-16 animate-marquee-ltr">
                {[...topRow, ...topRow].map((logo, i) => (
                  <img key={i} src={logo} alt="" className="h-8 object-contain flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300" />
                ))}
            </div>
            <div className="flex w-max gap-16 animate-marquee-rtl">
                {[...bottomRow, ...bottomRow].map((logo, i) => (
                  <img key={i} src={logo} alt="" className="h-8 object-contain flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300" />
                ))}
            </div>
         </div>
      </div>

      <style>{`
          @keyframes marquee-ltr { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
          @keyframes marquee-rtl { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-marquee-ltr { animation: marquee-ltr 40s linear infinite; }
          .animate-marquee-rtl { animation: marquee-rtl 40s linear infinite; }
      `}</style>
    </div>
  );
};

// Helper Components
const StatCard = ({ label, value, icon: Icon, color, trend, delay }) => (
    <div 
        className="bg-white p-6 rounded-2xl border border-rupya-100 shadow-sm hover:shadow-lg hover:shadow-rupya-200/50 transition-all duration-300"
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl bg-rupya-50 ${color}`}>
                <Icon className="w-6 h-6" />
            </div>
            {trend === 'positive' && (
                <span className="flex items-center text-xs font-bold text-rupya-600 bg-rupya-100 px-2 py-1 rounded-full">
                    <ArrowUpRight className="w-3 h-3 mr-1" /> +12%
                </span>
            )}
        </div>
        <div>
            <p className="text-sm font-medium text-rupya-500">{label}</p>
            <h3 className="text-3xl font-bold text-rupya-950 mt-1">{value}</h3>
        </div>
    </div>
);

const StatusBadge = ({ status }) => {
    // Exact palette mapping for badges
    const styles = {
        approved: { 
            icon: CheckCircle2, 
            text: "text-rupya-800", 
            bg: "bg-rupya-100", 
            border: "border-rupya-200", 
            label: "Approved" 
        },
        rejected: { 
            icon: XCircle, 
            text: "text-red-700", 
            bg: "bg-red-50", 
            border: "border-red-100", 
            label: "Rejected" 
        },
        pending: { 
            icon: Clock, 
            text: "text-amber-700", 
            bg: "bg-amber-50", 
            border: "border-amber-100", 
            label: "Pending" 
        }
    };

    const config = styles[status] || styles.pending;
    const Icon = config.icon;

    return (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${config.bg} ${config.border} border shadow-sm`}>
            <Icon className={`w-3.5 h-3.5 ${config.text}`} />
            <span className={`text-xs font-bold ${config.text}`}>{config.label}</span>
        </div>
    );
};

export default AgentDashboard;