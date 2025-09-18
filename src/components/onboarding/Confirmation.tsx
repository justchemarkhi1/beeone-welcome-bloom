import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Mail, Smartphone, Clock } from "lucide-react";
import beeOneLogo from "@/assets/logo_beeone_white.png";
import backgroundImage from "@/assets/background_green.png";

const Confirmation = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleClose = () => {
    window.location.href = "/";
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6 text-white relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className={`w-full max-w-md transition-all duration-1000 relative z-10 ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <Card className="p-8 shadow-glow bg-white text-foreground">
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4 shadow-soft animate-bounce-gentle">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-2xl font-bold mb-2">
              Demo Access Sent!
            </h1>
            
            <p className="text-muted-foreground text-sm">
              Check your email for your BeeOne Manager demo credentials
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-4 p-4 bg-accent rounded-lg">
              <Mail className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-medium text-sm">Email Sent</h3>
                <p className="text-xs text-muted-foreground">
                  Your demo login details are on their way
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-accent rounded-lg">
              <Smartphone className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-medium text-sm">Mobile Ready</h3>
                <p className="text-xs text-muted-foreground">
                  Access BeeOne Manager from any device
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-accent rounded-lg">
              <Clock className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-medium text-sm">24/7 Access</h3>
                <p className="text-xs text-muted-foreground">
                  Your demo is available anytime for the next 30 days
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-secondary p-4 rounded-lg mb-6 text-white text-center">
            <h3 className="font-medium mb-2">🌟 What's Next?</h3>
            <p className="text-sm opacity-90">
              Log in to explore real farm data, test our AI assistant, and see how BeeOne Manager transforms farm management.
            </p>
          </div>

          <Button
            onClick={handleClose}
            className="w-full bg-gradient-primary hover:opacity-90 transition-smooth shadow-soft text-lg py-6"
          >
            Continue to BeeOne Manager
          </Button>

          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Need help? Contact our support team anytime.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Confirmation;