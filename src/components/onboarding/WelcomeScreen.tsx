import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Plug, Target } from "lucide-react";
import beeOneLogo from "@/assets/logo_beeone_white.png";
import backgroundImage from "@/assets/background_green.png";
const WelcomeScreen = () => {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => {
      navigate("/language");
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return <div className="min-h-screen flex flex-col items-center justify-center p-8 text-white relative font-montserrat" style={{
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}>
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-black/5"></div>
      
      <div className={`text-left transition-all duration-1200 relative z-10 max-w-sm ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Clean BeeOne Logo */}
        <div className="mb-12">
          <img src={beeOneLogo} alt="BeeOne" className="h-16 mb-12 opacity-90" />
        </div>
        
        {/* Main Title */}
        <h1 className="text-3xl font-medium mb-6 tracking-tight leading-tight">
          BeeOne Manager
        </h1>
        
        {/* Subtitle */}
        <div className="mb-8">
          <p className="font-medium text-sm tracking-wider uppercase mb-6 opacity-90 text-slate-50">
            Next Gen Farm Management Software
          </p>
          
          {/* Feature Points */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3 opacity-95">
              <Zap className="w-4 h-4 text-white" />
              <p className="text-base font-light tracking-wide">AGILE</p>
            </div>
            
            <div className="flex items-center space-x-3 opacity-95">
              <Plug className="w-4 h-4 text-white" />
              <p className="text-base font-light tracking-wide">PLUG AND PLAY</p>
            </div>
            
            <div className="flex items-center space-x-3 opacity-95">
              <Target className="w-4 h-4 text-white" />
              <p className="text-base font-light tracking-wide">IMMEDIATE IMPACT</p>
            </div>
          </div>
        </div>
        
        {/* Loading Indicator */}
        <div className="flex justify-start space-x-2 opacity-70">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{
          animationDelay: "0.2s"
        }}></div>
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{
          animationDelay: "0.4s"
        }}></div>
        </div>
      </div>
    </div>;
};
export default WelcomeScreen;