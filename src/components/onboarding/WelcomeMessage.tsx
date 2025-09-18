import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const WelcomeMessage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md animate-fade-in-up">
        <Card className="p-8 shadow-medium">
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4 shadow-soft">
              <span className="text-white font-bold text-2xl">🌱</span>
            </div>
            
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Welcome from Fruit Attraction 2025!
            </h1>
            
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
                <span className="text-2xl">🎉</span>
                <p className="text-sm text-muted-foreground">
                  Thank you for visiting us at Fruit Attraction 2025
                </p>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
                <span className="text-2xl">🚀</span>
                <p className="text-sm text-muted-foreground">
                  We're excited to show you BeeOne Manager
                </p>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
                <span className="text-2xl">📱</span>
                <p className="text-sm text-muted-foreground">
                  Your demo is ready to explore
                </p>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => navigate("/features")}
            className="w-full bg-gradient-primary hover:opacity-90 transition-smooth shadow-soft text-lg py-6"
          >
            Let's Get Started
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default WelcomeMessage;