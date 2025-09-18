import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import beeOneLogo from "@/assets/logo_beeone_white.png";
import fruitAttractionLogo from "@/assets/fruit_attraction_logo.png";
import backgroundImage from "@/assets/background_green.png";

const WelcomeMessage = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="w-full max-w-md animate-fade-in-up relative z-10">
        <Card className="p-8 shadow-medium bg-white/95 backdrop-blur-sm">
          <div className="text-center mb-6">
            {/* Fruit Attraction Logo */}
            <div className="w-full max-w-48 h-16 mx-auto mb-4 flex items-center justify-center">
              <img 
                src={fruitAttractionLogo} 
                alt="Fruit Attraction 2025" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4 shadow-soft p-2">
              <img 
                src={beeOneLogo} 
                alt="BeeOne Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Welcome from Fruit Attraction 2025!
            </h1>
            
            <div className="space-y-4 text-left mb-6">
              <div className="p-4 bg-accent rounded-lg border-l-4 border-primary">
                <h3 className="font-semibold text-foreground mb-2">🎯 About BeeOne Manager</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>BeeOne Manager</strong> is the dedicated output platform specifically designed for farm managers who need quick access to critical insights and data.
                </p>
              </div>
              
              <div className="p-4 bg-accent rounded-lg border-l-4 border-secondary">
                <h3 className="font-semibold text-foreground mb-2">🌾 Powered by BeeOne</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  All data comes from <strong>BeeOne</strong> - the comprehensive, all-inclusive farm management system that handles every aspect of your agricultural operations.
                </p>
              </div>
              
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🚀</span>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">Ready to Experience BeeOne Manager?</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your personalized demo showcases real farm management capabilities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => navigate("/features")}
            className="w-full bg-gradient-primary hover:opacity-90 transition-smooth shadow-soft text-lg py-6"
          >
            Explore BeeOne Manager Features
          </Button>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Thank you for visiting us at Fruit Attraction 2025
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WelcomeMessage;