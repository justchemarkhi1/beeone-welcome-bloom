import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => {
      navigate("/language");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-center p-6 text-white">
      <div className={`text-center transition-all duration-1000 ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-glow animate-bounce-gentle">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">B</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 animate-fade-in-up">
          BeeOne Manager
        </h1>
        
        <p className="text-xl opacity-90 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          Farm Intelligence at Your Fingertips
        </p>
        
        <div className="mt-8 flex justify-center">
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