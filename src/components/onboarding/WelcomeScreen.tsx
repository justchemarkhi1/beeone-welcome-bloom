import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

const WelcomeScreen = () => {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/language");
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => {
      handleNext();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      {...handlers}
      className="min-h-screen flex flex-col items-center justify-center px-8 py-12 text-white relative font-montserrat bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 overflow-hidden"
    >
      {/* Flowing Lines Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-50 100C100 80 200 120 350 100C400 95 450 90 500 85" stroke="currentColor" strokeWidth="2"/>
          <path d="M-50 150C100 130 200 170 350 150C400 145 450 140 500 135" stroke="currentColor" strokeWidth="2"/>
          <path d="M-50 200C100 180 200 220 350 200C400 195 450 190 500 185" stroke="currentColor" strokeWidth="2"/>
          <path d="M-50 250C100 230 200 270 350 250C400 245 450 240 500 235" stroke="currentColor" strokeWidth="2"/>
          <path d="M-50 300C100 280 200 320 350 300C400 295 450 290 500 285" stroke="currentColor" strokeWidth="2"/>
          <path d="M-50 350C100 330 200 370 350 350C400 345 450 340 500 335" stroke="currentColor" strokeWidth="2"/>
          <path d="M-50 400C100 380 200 420 350 400C400 395 450 390 500 385" stroke="currentColor" strokeWidth="2"/>
          <path d="M-50 450C100 430 200 470 350 450C400 445 450 440 500 435" stroke="currentColor" strokeWidth="2"/>
          <path d="M-50 500C100 480 200 520 350 500C400 495 450 490 500 485" stroke="currentColor" strokeWidth="2"/>
          <path d="M-50 550C100 530 200 570 350 550C400 545 450 540 500 535" stroke="currentColor" strokeWidth="2"/>
          <path d="M-50 600C100 580 200 620 350 600C400 595 450 590 500 585" stroke="currentColor" strokeWidth="2"/>
          <circle cx="300" cy="650" r="80" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
          <circle cx="300" cy="650" r="100" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2"/>
          <circle cx="300" cy="650" r="120" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.1"/>
        </svg>
      </div>
      
      <div className={`text-center transition-all duration-1200 relative z-10 max-w-xs ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* BeeOne Brand */}
        <div className="mb-16">
          <h1 className="text-4xl font-light mb-8 tracking-wide">
            BeeOne<sup className="text-sm">®</sup>
          </h1>
        </div>
        
        {/* Main Content */}
        <div className="space-y-4 mb-16">
          <p className="text-xl font-light tracking-wider">NEXT GEN</p>
          <p className="text-xl font-light tracking-wider">FARM MANAGEMENT</p>
          <p className="text-2xl font-bold tracking-wider mb-8">SOFTWARE</p>
          
          {/* Feature Points */}
          <div className="space-y-4 mb-8">
            <p className="text-lg font-light tracking-wider">AGILE</p>
            <p className="text-lg font-light tracking-wider">PLUG AND PLAY</p>
            <p className="text-lg font-light tracking-wider">IMMEDIATE IMPACT</p>
          </div>
        </div>
        
        {/* Forward Arrows */}
        <div className="flex justify-center space-x-8 mb-8">
          <div className="flex space-x-1">
            <span className="text-2xl">▶</span>
            <span className="text-2xl">▶</span>
            <span className="text-2xl">▶</span>
          </div>
          <div className="flex space-x-1">
            <span className="text-2xl">▶</span>
            <span className="text-2xl">▶</span>
            <span className="text-2xl">▶</span>
          </div>
        </div>
        
        {/* Swipe Indicator */}
        <div className="text-center opacity-70">
          <p className="text-sm font-light mb-2">Swipe left to continue</p>
          <div className="flex justify-center space-x-1">
            <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;