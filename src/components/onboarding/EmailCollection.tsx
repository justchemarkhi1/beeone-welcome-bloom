import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Shield, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import backgroundImage from "@/assets/background_green.png";

const EmailCollection = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/confirmation");
    }, 2000);
  };

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
      
      <div className="w-full max-w-sm animate-fade-in-up relative z-10">
        <Card className="bg-white rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-8">
            {/* Mail Icon */}
            <div className="w-20 h-20 mx-auto bg-primary rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Mail className="w-10 h-10 text-white" strokeWidth={2} />
            </div>
            
            <h1 className="text-xl font-bold text-gray-800 mb-2">
              Get Your Demo Access
            </h1>
            
            <p className="text-gray-600 text-sm font-light">
              Enter your email to receive your BeeOne Manager demo credentials
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            {/* Security Info */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800 mb-1">Secure Demo Access</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Your login credentials will be sent securely to your email within minutes.
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !email}
              className="w-full bg-primary hover:bg-primary-dark text-white rounded-xl py-4 text-base font-medium shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Send Demo Access</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 leading-relaxed">
              By providing your email, you agree to receive demo access information from BeeOne.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmailCollection;