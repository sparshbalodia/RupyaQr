// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { toast } from "sonner";
// import { ArrowRight, Lock } from "lucide-react";

// const API = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

// const AgentLogin = () => {
//   const [agentId, setAgentId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault(); // Prevent form submission refresh
//     if (!agentId) {
//       toast.error("Enter Agent ID");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await axios.post(`${API}/agents/login`, { agentId });

//       localStorage.setItem("agentId", res.data.agentId);
//       localStorage.setItem("agentName", res.data.name);

//       toast.success("Welcome back");
//       navigate("/agent/dashboard");
//     } catch (err) {
//       let message = "Unable to login";

//       if (!err.response) {
//         message = "Server unreachable. Please try again.";
//       } else if (Array.isArray(err.response.data?.detail)) {
//         message = err.response.data.detail[0]?.msg;
//       } else if (typeof err.response.data?.detail === "string") {
//         message = err.response.data.detail;
//       }
    
//       toast.error(message);
//     }finally {
//         setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden selection:bg-white selection:text-black">
      
//       {/* Ambient Background Effects */}
//       <div className="absolute top-[-20%] left-[-20%] w-[50vw] h-[50vw] bg-zinc-900 rounded-full blur-[120px] opacity-40 animate-pulse" />
//       <div className="absolute bottom-[-20%] right-[-20%] w-[50vw] h-[50vw] bg-zinc-800 rounded-full blur-[120px] opacity-30" />

//       {/* Login Card */}
//       <div className="relative z-10 w-full max-w-md p-8 md:p-12">
//         <div className="mb-12">
//             <h1 className="text-5xl font-bold tracking-tighter mb-4">Agent Access.</h1>
//             <p className="text-zinc-500 text-lg">Enter your unique ID to access the dashboard.</p>
//         </div>

//         <form onSubmit={handleLogin} className="space-y-10">
//             {/* Minimalist Input Group */}
//             <div className="group relative">
//                 <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2 block group-focus-within:text-white transition-colors">
//                     Agent ID
//                 </label>
//                 <div className="relative flex items-center">
//                     {/* <Lock className="absolute left-0 w-5 h-5 text-zinc-600 group-focus-within:text-white transition-colors" /> */}
//                     <Input
//                         required
//                         autoComplete="off"
//                         spellCheck={false}
//                         inputMode="text"
//                         aria-label="Agent ID"
//                         enterKeyHint="done"
//                         placeholder="Eg: VNDxxxxxxxx"
//                         value={agentId}
//                         onChange={(e) => setAgentId(e.target.value.toUpperCase().trim())}
//                         className="pl-8 bg-transparent border-0 border-b border-zinc-800 rounded-none px-0 py-4 text-2xl font-medium placeholder:text-zinc-800 focus-visible:ring-0 focus-visible:border-white transition-all h-auto shadow-none"
//                     />
//                 </div>
//             </div>

//             {/* Action Button */}
//             <Button 
//                 type="submit" 
//                 disabled={loading}
//                 className="w-full bg-white text-black hover:bg-zinc-200 h-16 rounded-xl text-lg font-bold tracking-tight transition-all hover:scale-[1.02] active:scale-[0.98] group"
//             >
//                 {loading ? "Verifying..." : "Access Dashboard"}
//                 {!loading && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
//             </Button>
//         </form>

//         <div className="mt-12 text-center">
//             <p className="text-zinc-600 text-sm">Restricted access. Authorized personnel only.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AgentLogin;




// // import { useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { toast } from "sonner";

// // const API = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

// // const AgentLogin = () => {
// //   const [agentId, setAgentId] = useState("");
// //   const navigate = useNavigate();

// //   const handleLogin = async () => {
// //     if (!agentId) {
// //       toast.error("Enter Agent ID");
// //       return;
// //     }

// //     try {
// //       const res = await axios.post(
// //       `${API}/agents/login`,
// //       { agentId }
// //     );


// //       localStorage.setItem("agentId", res.data.agentId);
// //       localStorage.setItem("agentName", res.data.name);

// //       navigate("/agent/dashboard");
// //     } catch (err) {
// //       let message = "Login failed";

// //       if (Array.isArray(err.response?.data?.detail)) {
// //         message = err.response.data.detail[0]?.msg;
// //       } else if (typeof err.response?.data?.detail === "string") {
// //         message = err.response.data.detail;
// //       }

// //       toast.error(message);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center">
// //       <div className="space-y-4 w-80">
// //         <Input
// //           placeholder="Enter Agent ID"
// //           value={agentId}
// //           onChange={(e) => setAgentId(e.target.value.trim())}
// //         />

// //         <Button onClick={handleLogin} className="w-full">
// //           Login
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AgentLogin;


// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { toast } from "sonner";
// import { ArrowRight, Lock } from "lucide-react";

// const API = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

// const AgentLogin = () => {
//   const [agentId, setAgentId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!agentId) {
//       toast.error("Enter Agent ID");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await axios.post(`${API}/agents/login`, { agentId });
//       localStorage.setItem("agentId", res.data.agentId);
//       localStorage.setItem("agentName", res.data.name);
//       toast.success("Welcome back");
//       navigate("/agent/dashboard");
//     } catch (err) {
//       let message = "Login failed";
//       if (Array.isArray(err.response?.data?.detail)) {
//         message = err.response.data.detail[0]?.msg;
//       } else if (typeof err.response?.data?.detail === "string") {
//         message = err.response.data.detail;
//       }
//       toast.error(message);
//     } finally {
//         setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white text-zinc-950 flex items-center justify-center relative overflow-hidden selection:bg-rupya-100 selection:text-rupya-900">
      
//       {/* Ambient Light Effects - Pastel Olive */}
//       <div className="absolute top-[-20%] left-[-20%] w-[50vw] h-[50vw] bg-rupya-100/60 rounded-full blur-[120px] mix-blend-multiply animate-pulse" />
//       <div className="absolute bottom-[-20%] right-[-20%] w-[50vw] h-[50vw] bg-rupya-50/80 rounded-full blur-[120px] mix-blend-multiply" />

//       {/* Login Card */}
//       <div className="relative z-10 w-full max-w-md p-8 md:p-12">
//         <div className="mb-12">
//             <h1 className="text-5xl font-bold tracking-tighter mb-4 text-black">Agent Access.</h1>
//             <p className="text-zinc-500 text-lg">Enter your unique ID to access the dashboard.</p>
//         </div>

//         <form onSubmit={handleLogin} className="space-y-10">
//             {/* Minimalist Input Group */}
//             <div className="group relative">
//                 <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 block group-focus-within:text-rupya-600 transition-colors">
//                     Agent ID
//                 </label>
//                 <div className="relative flex items-center">
//                     <Lock className="absolute left-0 w-5 h-5 text-zinc-400 group-focus-within:text-black transition-colors" />
//                     <Input
//                         placeholder="Ex: AGENT-007"
//                         value={agentId}
//                         onChange={(e) => setAgentId(e.target.value.trim())}
//                         className="pl-8 bg-transparent border-0 border-b border-zinc-200 rounded-none px-0 py-4 text-2xl font-medium placeholder:text-zinc-300 text-black focus-visible:ring-0 focus-visible:border-black transition-all h-auto shadow-none"
//                     />
//                 </div>
//             </div>

//             {/* Action Button - High Contrast Black */}
//             <Button 
//                 type="submit" 
//                 disabled={loading}
//                 className="w-full bg-black text-white hover:bg-zinc-800 h-16 rounded-xl text-lg font-bold tracking-tight transition-all hover:scale-[1.02] active:scale-[0.98] group shadow-xl shadow-black/5"
//             >
//                 {loading ? "Verifying..." : "Access Dashboard"}
//                 {!loading && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
//             </Button>
//         </form>

//         <div className="mt-12 text-center">
//             <p className="text-zinc-400 text-sm">Restricted access. Authorized personnel only.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AgentLogin;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";

const API = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

const AgentLogin = () => {
  const [agentId, setAgentId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!agentId) {
      toast.error("Enter Agent ID");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API}/agents/login`, { agentId });
      localStorage.setItem("agentId", res.data.agentId);
      localStorage.setItem("agentName", res.data.name);
      toast.success("Welcome back");
      navigate("/agent/dashboard");
    } catch (err) {
      let message = "Login failed";
      if (Array.isArray(err.response?.data?.detail)) {
        message = err.response.data.detail[0]?.msg;
      } else if (typeof err.response?.data?.detail === "string") {
        message = err.response.data.detail;
      }
      toast.error(message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-rupya-50/50 flex items-center justify-center relative overflow-hidden selection:bg-rupya-200 selection:text-rupya-950">
      
      {/* Background Ambience: Using your palette's lighter tones */}
      <div className="absolute top-[-20%] left-[-20%] w-[50vw] h-[50vw] bg-rupya-200/40 rounded-full blur-[120px] mix-blend-multiply animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[50vw] h-[50vw] bg-rupya-300/30 rounded-full blur-[120px] mix-blend-multiply" />

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white/60 backdrop-blur-xl border border-white shadow-2xl shadow-rupya-900/5 rounded-3xl">
        <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-rupya-100 rounded-xl mb-6 text-rupya-700">
               <ShieldCheck size={24} />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-rupya-950 mb-2">Agent Portal</h1>
            <p className="text-rupya-900/60">Secure access for authorized partners.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-2">
                <label className="text-xs font-bold text-rupya-700 uppercase tracking-widest ml-1">
                    Agent ID
                </label>
                <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rupya-400 group-focus-within:text-rupya-700 transition-colors" />
                    <Input
                        placeholder="Ex: VNDxxxxxxxx"
                        value={agentId}
                        onChange={(e) => setAgentId(e.target.value.trim())}
                        className="pl-12 h-14 bg-white border-rupya-200 focus-visible:ring-rupya-500 focus-visible:border-rupya-500 text-lg rounded-xl shadow-sm transition-all"
                    />
                </div>
            </div>

            <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-rupya-700 hover:bg-rupya-800 text-white h-14 rounded-xl text-lg font-semibold tracking-wide shadow-lg shadow-rupya-700/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
                {loading ? "Verifying..." : "Access Dashboard"}
                {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
            </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-rupya-100 text-center">
            {/* <p className="text-xs text-rupya-400 font-medium">Protected by Rupya Secure v2.0</p> */}
        </div>
      </div>
    </div>
  );
};

export default AgentLogin;