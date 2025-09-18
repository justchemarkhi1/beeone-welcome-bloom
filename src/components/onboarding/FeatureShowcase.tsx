import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, Map, Users, Mic } from "lucide-react";
import backgroundImage from "@/assets/background_green.png";

const FeatureShowcase = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const features = [
    {
      icon: BarChart3,
      title: "Real-Time KPIs",
      description: "Access instant insights into your farm's performance with live data visualization and comprehensive analytics.",
      details: "Monitor yield, efficiency, and productivity metrics in real-time to make informed decisions quickly.",
      color: "bg-primary"
    },
    {
      icon: Map,
      title: "Interactive Map Views",
      description: "Visualize your entire farm operation with detailed, interactive maps showing field conditions and activities.",
      details: "Track equipment, monitor field conditions, and plan operations with precision mapping technology.",
      color: "bg-blue-500"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Seamlessly collaborate with your team members, share updates, and coordinate farm activities efficiently.",
      details: "Assign tasks, share notes, and maintain communication across all farm operations in one platform.",
      color: "bg-purple-500"
    },
    {
      icon: Mic,
      title: "AI Voice Assistant",
      description: "Get instant answers about your farm's performance using our intelligent voice assistant powered by BeeOne data.",
      details: "Simply ask questions about your crops, weather, tasks, or any farm data and get immediate insights.",
      color: "bg-emerald-500"
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev === features.length - 1) {
          setIsAutoScrolling(false);
          return prev;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSlide, isAutoScrolling, features.length]);

  const nextSlide = () => {
    setIsAutoScrolling(false);
    if (currentSlide < features.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/email");
    }
  };

  const prevSlide = () => {
    setIsAutoScrolling(false);
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setIsAutoScrolling(false);
    setCurrentSlide(index);
  };

  const CurrentIcon = features[currentSlide].icon;

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6 relative font-montserrat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="w-full max-w-sm relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">
            BeeOne Manager Features
          </h1>
          <p className="text-white/80 text-sm font-light">
            Discover what makes us the perfect solution for modern farm management
          </p>
        </div>

        {/* Feature Card */}
        <Card className="bg-white rounded-3xl p-8 shadow-xl mb-6 min-h-[420px] flex flex-col justify-between">
          <div className="flex-1">
            {/* Icon */}
            <div className={`w-20 h-20 mx-auto ${features[currentSlide].color} rounded-full flex items-center justify-center mb-6 shadow-lg`}>
              <CurrentIcon className="w-10 h-10 text-white" strokeWidth={2} />
            </div>
            
            {/* Title */}
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              {features[currentSlide].title}
            </h2>
            
            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed text-center text-sm">
              {features[currentSlide].description}
            </p>
            
            {/* Details */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-xs text-gray-600 leading-relaxed">
                {features[currentSlide].details}
              </p>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="text-white border-white/30 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
          >
            Previous
          </Button>

          {/* Progress Indicators */}
          <div className="flex space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white w-6' : 'bg-white/40'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={nextSlide}
            size="sm"
            className="bg-white text-gray-800 hover:bg-white/90"
          >
            {currentSlide === features.length - 1 ? 'Get Demo' : 'Next'}
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-white/60">
            {currentSlide + 1} of {features.length} • Powered by BeeOne
          </p>
          {isAutoScrolling && (
            <p className="text-xs text-white/40 mt-1">
              Auto-scrolling...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;