import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, User, Shield, ArrowUpRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LandingPage = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', mobile: '' });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStart = (e) => {
    e.preventDefault();
    // Navigate to the full form, passing data via state if needed
    navigate('/form', { state: formData });
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden font-sans relative">
      
      {/* Background Ambience - Subtle Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-zinc-900 rounded-full blur-[120px] opacity-40 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-zinc-800 rounded-full blur-[120px] opacity-30" />
      </div>

      {/* Navigation / Header */}
      <nav className={`fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="text-2xl font-bold tracking-tighter">RUPYA.</div>
        <Button 
          variant="ghost" 
          className="text-zinc-400 hover:text-white hover:bg-white/10 transition-colors rounded-full px-6"
          onClick={() => navigate('/admin')} // Assuming admin is on /admin route now
        >
          Agent Login
        </Button>
      </nav>

      <div className="relative z-10 container mx-auto px-6 h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12">
        
        {/* Left Side: Typography & Brand */}
        <div className="flex-1 text-center lg:text-left space-y-8 mt-20 lg:mt-0">
          <div className={`transition-all duration-1000 delay-300 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9]">
              FINANCE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-600">SIMPLIFIED.</span>
            </h1>
          </div>
          
          <p className={`text-zinc-400 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Aapki har jarurat ka sathi. Experience instant loan approvals with our AI-powered verification engine.
          </p>

          {/* Social Proof / Trust Badge */}
          <div className={`flex items-center justify-center lg:justify-start gap-4 pt-4 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex -space-x-3">
              {[1,2,3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border border-black bg-zinc-800 flex items-center justify-center">
                  <User size={16} className="text-zinc-400" />
                </div>
              ))}
            </div>
            <div className="text-sm text-zinc-500">
              Trusted by <span className="text-white font-semibold">10,000+</span> users
            </div>
          </div>
        </div>

        {/* Right Side: The "Get Started" Card */}
        <div className={`w-full max-w-md transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
          <div className="relative group">
            {/* Glassmorphism Card */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-white/30 to-white/0 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
              
              <div className="mb-8 space-y-2">
                <h3 className="text-2xl font-semibold text-white">Get Started</h3>
                <p className="text-zinc-500 text-sm">Enter your details to begin the application.</p>
              </div>

              <form onSubmit={handleStart} className="space-y-6">
                <div className="space-y-2 group/input">
                  <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider group-focus-within/input:text-white transition-colors">Full Name</label>
                  <Input 
                    required
                    className="bg-transparent border-0 border-b border-zinc-800 rounded-none px-0 py-2 text-lg text-white placeholder:text-zinc-700 focus-visible:ring-0 focus-visible:border-white transition-colors h-auto"
                    placeholder="Enter your name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>

                <div className="space-y-2 group/input">
                  <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider group-focus-within/input:text-white transition-colors">Mobile Number</label>
                  <Input 
                    required
                    type="tel"
                    className="bg-transparent border-0 border-b border-zinc-800 rounded-none px-0 py-2 text-lg text-white placeholder:text-zinc-700 focus-visible:ring-0 focus-visible:border-white transition-colors h-auto"
                    placeholder="98765 43210"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-white text-black hover:bg-zinc-200 h-14 text-lg font-medium rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] mt-4 group"
                >
                  Continue Application
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500">
                <span className="flex items-center gap-1"><Shield size={12} /> Secure 256-bit Encryption</span>
                <span>Rupya Inc. © 2026</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;