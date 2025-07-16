import React from "react";
import { Shield, DollarSign, AlertTriangle } from "lucide-react";

const Header = () => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r  from-red-600 via-purple-600 to-blue-600 text-white">
      <div className="w-[94vw] mx-auto py-14 max-w-7xl  flex flex-col items-center justify-center ">
        <div className="flex items-center justify-center space-x-3">
          <div className="relative">
            <Shield size={64} className="text-yellow-300 animate-pulse" />
            <AlertTriangle
              size={32}
              className="text-red-400 absolute -top-2 -right-2 animate-bounce"
            />
          </div>

          <div className="h-12 w-px bg-white/30"></div>

          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-yellow-300">
              CYBER SICURITY
            </h1>
            <h2 className="text-2xl md:4xl font-semibold w-full">
              Team Builder
            </h2>
          </div>
        </div>
        <div className=" max-w-7xl space-y-4 mt-6 flex mx-auto w-full  border-white/20 rounded-2xl backdrop-blur-sm items-center justify-center flex-col  p-6 bg-black/40 border">
          <div className="flex items-center justify-center space-x-3 ">
            <AlertTriangle
              size={24}
              className="h-8 w-8 text-red-400 animate-pulse"
            />
            <h1 className="text-lg text-red-200 md:text-2xl font-semibold text-center">
              🚨 EMERGENCY ALERT 🚨
            </h1>
            <AlertTriangle
              size={24}
              className="h-8 w-8 text-red-400 animate-pulse"
            />
          </div>
          <h2 className="text-lg md:text-xl mx-2 font-monospace text-center">
            Our Server is Under Attack! We need to hire a special cyber security
            team
          </h2>

          <div className="flex items-center justify-center">
            <DollarSign size={36} className="text-green-400 " />
            <h3 className="text-2xl md:text-3xl text-green-400 font-bold text-center">
              Total Budget: $10,000,000
            </h3>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
