import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import beeOneLogo from "@/assets/logo_beeone_white.png";
import backgroundImage from "@/assets/background_green.png";

const WelcomeScreen = () => {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => {
      navigate("/language");
    }, 4000); // Extended time to read the new content
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6 text-white relative font-montserrat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className={`text-center transition-all duration-1000 relative z-10 ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-8 shadow-glow animate-bounce-gentle p-4">
            <img 
              src={beeOneLogo} 
              alt="BeeOne Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-6 animate-fade-in-up">
          BeeOne Manager
        </h1>
        
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <p className="text-lg font-semibold mb-4 text-primary-light">
            NEXT GEN FARM MANAGEMENT SOFTWARE
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <p className="text-base font-medium tracking-wider">AGILE</p>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <p className="text-base font-medium tracking-wider">PLUG AND PLAY</p>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <p className="text-base font-medium tracking-wider">IMMEDIATE IMPACT</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <div className="animate-pulse-soft">
            <div className="w-2 h-2 bg-white rounded-full mx-1 inline-block"></div>
            <div className="w-2 h-2 bg-white rounded-full mx-1 inline-block" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-white rounded-full mx-1 inline-block" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;