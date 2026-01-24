// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowRight, User, Shield, CheckCircle2, TrendingUp } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// const LandingPage = () => {
//   const navigate = useNavigate();
//   const [mounted, setMounted] = useState(false);
//   const [formData, setFormData] = useState({ fullName: '', mobile: '' });

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const handleStart = (e) => {
//     e.preventDefault();
//     navigate('/form', { state: formData });
//   };

//   return (
//     <div className="min-h-screen bg-white text-rupya-950 font-sans relative overflow-hidden selection:bg-rupya-200 selection:text-rupya-950">
      
//       {/* Background Ambience - Rupya Light Palette */}
//       <div className="fixed inset-0 z-0 pointer-events-none">
//         <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-rupya-100/40 rounded-full blur-[120px] mix-blend-multiply animate-pulse" />
//         <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-rupya-200/30 rounded-full blur-[120px] mix-blend-multiply" />
//         <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] bg-rupya-50/60 rounded-full blur-[100px] mix-blend-multiply" />
//       </div>

//       {/* Navigation */}
//       <nav className={`fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
//         <div className="flex items-center gap-2">
//             <div className="w-3 h-3 bg-rupya-600 rounded-full" />
//             <span className="text-2xl font-bold tracking-tighter text-black">RUPYA.</span>
//         </div>
//         <Button 
//           variant="ghost" 
//           className="text-rupya-700 hover:text-black hover:bg-rupya-50 transition-colors rounded-full px-6 font-medium"
//           onClick={() => navigate('/agent-login')}
//         >
//           Agent Login
//         </Button>
//       </nav>

//       <div className="relative z-10 container mx-auto px-6 min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-16 py-20 lg:py-0">
        
//         {/* Left Side: Typography & Brand */}
//         <div className="flex-1 text-center lg:text-left space-y-8 mt-10 lg:mt-0">
//           <div className={`transition-all duration-1000 delay-300 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
//             <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-black">
//               FINANCE <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-rupya-700 via-rupya-500 to-rupya-800">
//                 SIMPLIFIED.
//               </span>
//             </h1>
//           </div>
          
//           <p className={`text-rupya-800/60 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 transition-all duration-1000 delay-500 font-medium ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
//             Aapki har jarurat ka sathi. 
//           </p>

//         </div>

//         {/* Right Side: The "Get Started" Card */}
//         <div className={`w-full max-w-md transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
//           <div className="relative group">
            
//             <div className="relative bg-white/60 backdrop-blur-xl border border-white shadow-2xl shadow-rupya-900/10 p-8 rounded-3xl">
              
//               <div className="mb-8 space-y-2">
//                 <div className="w-10 h-10 bg-rupya-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-rupya-600/30 text-white">
//                     <Shield size={20} />
//                 </div>
//                 <h3 className="text-2xl font-bold text-black tracking-tight">Get Started</h3>
//                 <p className="text-rupya-600 text-sm">Enter your details to begin the instant application.</p>
//               </div>

//               <form onSubmit={handleStart} className="space-y-6">
//                 <div className="space-y-2 group/input">
//                   <label className="text-xs font-bold text-rupya-400 uppercase tracking-widest group-focus-within/input:text-rupya-700 transition-colors">Full Name</label>
//                   <Input 
//                     required
//                     className="bg-transparent border-0 border-b border-rupya-200 rounded-none px-0 py-2 text-lg text-black placeholder:text-rupya-300 focus-visible:ring-0 focus-visible:border-rupya-700 transition-all h-auto shadow-none"
//                     placeholder="Enter your name"
//                     value={formData.fullName}
//                     onChange={(e) => setFormData({...formData, fullName: e.target.value})}
//                   />
//                 </div>

//                 <div className="space-y-2 group/input">
//                   <label className="text-xs font-bold text-rupya-400 uppercase tracking-widest group-focus-within/input:text-rupya-700 transition-colors">Mobile Number</label>
//                   <Input 
//                     required
//                     type="tel"
//                     className="bg-transparent border-0 border-b border-rupya-200 rounded-none px-0 py-2 text-lg text-black placeholder:text-rupya-300 focus-visible:ring-0 focus-visible:border-rupya-700 transition-all h-auto shadow-none"
//                     placeholder="98765 43210"
//                     value={formData.mobile}
//                     onChange={(e) => setFormData({...formData, mobile: e.target.value})}
//                   />
//                 </div>

//                 <Button 
//                   type="submit" 
//                   className="w-full bg-rupya-900 hover:bg-black text-white h-14 text-lg font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] mt-6 shadow-xl shadow-rupya-900/20 group"
//                 >
//                   Continue Application
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//               </form>

//               <div className="mt-8 pt-6 border-t border-rupya-100 flex items-center justify-between text-xs text-rupya-500 font-medium">
//                 <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-rupya-600" /> No hidden fees</span>
//                 <span>Rupya Inc. © 2026</span>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default LandingPage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-green-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-bold tracking-tight cursor-pointer text-green-700"
        >
          RUPYA<span className="text-green-400">.</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-600">

          {/* Loans Dropdown */}
          <div className="group relative cursor-pointer">
            <div className="flex items-center gap-1 group-hover:text-green-700">
              Loans <ChevronDown className="w-4 h-4" />
            </div>
            <div className="absolute left-0 top-full
              w-52 rounded-xl
              bg-white border border-green-100 shadow-lg
              opacity-0 invisible
              group-hover:opacity-100 group-hover:visible
              transition-all duration-200
              pointer-events-auto">
              <button onClick={() => navigate("/loan-form")} className="block w-full px-4 py-3 text-left hover:bg-green-50">
                Personal Loan
              </button>
              <button onClick={() => navigate("/loan-form")} className="block w-full px-4 py-3 text-left hover:bg-green-50">
                Business Loan
              </button>
            </div>
          </div>

          {/* Insurance Dropdown */}
          <div className="group relative cursor-pointer">
            <div className="flex items-center gap-1 group-hover:text-green-700">
              Insurance <ChevronDown className="w-4 h-4" />
            </div>
            <div className="absolute left-0 top-full
              w-52 rounded-xl
              bg-white border border-green-100 shadow-lg
              opacity-0 invisible
              group-hover:opacity-100 group-hover:visible
              transition-all duration-200
              pointer-events-auto">
              <button onClick={() => navigate("/insurance-form")} className="block w-full px-4 py-3 text-left hover:bg-green-50">
                Health Insurance
              </button>
              <button onClick={() => navigate("/insurance-form")} className="block w-full px-4 py-3 text-left hover:bg-green-50">
                Life Insurance
              </button>
            </div>
          </div>

          <button className="hover:text-green-700">How It Works</button>
          <button className="hover:text-green-700">Partners</button>
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate("/agent-login")}
            className="text-sm text-gray-500 hover:text-green-700 transition"
          >
            Agent Login
          </button>
          <Button
            onClick={() => navigate("/loan-form")}
            className="bg-green-600 text-white hover:bg-green-700 rounded-xl px-6"
          >
            Apply Now
          </Button>
        </div>

        </div>
      </nav>
      {/* ================= END NAVBAR ================= */}


      {/* ================= HERO SECTION ================= */}
      <section className="pt-24 relative min-h-[90vh] flex items-center bg-white overflow-hidden">

        {/* Soft Green Background Blobs */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-green-100 rounded-full blur-[140px] opacity-60" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-green-200 rounded-full blur-[160px] opacity-50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-tight text-gray-900">
              Smarter Loans. <br />
              Faster Insurance. <br />
              <span className="text-green-600">Built for India.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-xl">
              Rupya helps customers apply for loans and insurance seamlessly —
              powered by trusted agents and managed through a real-time admin system.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => navigate("/loan-form")}
                className="h-14 px-8 text-lg font-semibold rounded-xl bg-green-600 text-white hover:bg-green-700 group"
              >
                Apply for Loan
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate("/insurance-form")}
                className="h-14 px-8 text-lg font-semibold rounded-xl border-green-600 text-green-700 hover:bg-green-50"
              >
                Get Insurance
              </Button>
            </div>

            {/* Agent CTA */}
            <div className="pt-4">
              <button
                onClick={() => navigate("/agent-login")}
                className="text-sm text-gray-500 hover:text-green-700 transition underline underline-offset-4"
              >
                Are you an agent? Login here →
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden lg:block">
            <div className="relative w-full h-[420px] rounded-3xl bg-gradient-to-br from-green-50 to-white border border-green-100 flex items-center justify-center shadow-xl">
              <div className="text-center space-y-3">
                <p className="text-green-500 text-sm uppercase tracking-widest">
                  Live Approval Flow
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  Apply → Verify → Approve
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
      {/* ================= END HERO ================= */}

    </div>
  );
};

export default LandingPage;
