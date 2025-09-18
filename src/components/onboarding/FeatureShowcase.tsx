import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FeatureShowcase = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      icon: "📊",
      title: "Real-Time KPIs",
      description: "Access instant insights into your farm's performance with live data visualization and comprehensive analytics.",
      details: "Monitor yield, efficiency, and productivity metrics in real-time to make informed decisions quickly."
    },
    {
      icon: "🗺️",
      title: "Interactive Map Views",
      description: "Visualize your entire farm operation with detailed, interactive maps showing field conditions and activities.",
      details: "Track equipment, monitor field conditions, and plan operations with precision mapping technology."
    },
    {
      icon: "👥",
      title: "Team Collaboration",
      description: "Seamlessly collaborate with your team members, share updates, and coordinate farm activities efficiently.",
      details: "Assign tasks, share notes, and maintain communication across all farm operations in one platform."
    },
    {
      icon: "🎤",
      title: "AI Voice Assistant",
      description: "Get instant answers about your farm's performance using our intelligent voice assistant powered by BeeOne data.",
      details: "Simply ask questions about your crops, weather, tasks, or any farm data and get immediate insights."
    }
  ];

  const nextSlide = () => {
    if (currentSlide < features.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/email");
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              BeeOne Manager Features
            </h1>
            <p className="text-muted-foreground text-sm">
              Discover what makes us the perfect solution for modern farm management
            </p>
          </div>

          <Card className="p-6 shadow-medium animate-fade-in-up mb-6" style={{ minHeight: "400px" }}>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-6 shadow-soft">
                <span className="text-3xl">{features[currentSlide].icon}</span>
              </div>
              
              <h2 className="text-xl font-bold text-foreground mb-4">
                {features[currentSlide].title}
              </h2>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {features[currentSlide].description}
              </p>
              
              <div className="bg-accent p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {features[currentSlide].details}
                </p>
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            <div className="flex space-x-2">
              {features.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-smooth ${
                    index === currentSlide ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextSlide}
              size="sm"
              className="flex items-center space-x-2 bg-gradient-primary hover:opacity-90"
            >
              <span>{currentSlide === features.length - 1 ? 'Get Demo' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              {currentSlide + 1} of {features.length} • Powered by BeeOne
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;