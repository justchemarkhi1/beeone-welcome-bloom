import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md animate-fade-in-up">
        <Card className="p-8 shadow-medium">
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4 shadow-soft">
              <Mail className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Get Your Demo Access
            </h1>
            
            <p className="text-muted-foreground text-sm">
              Enter your email to receive your BeeOne Manager demo credentials
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 text-base"
                required
              />
            </div>

            <div className="bg-accent p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <span className="text-lg">🔐</span>
                <div>
                  <h3 className="text-sm font-medium text-foreground">Secure Demo Access</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your login credentials will be sent securely to your email within minutes.
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !email}
              className="w-full bg-gradient-primary hover:opacity-90 transition-smooth shadow-soft text-lg py-6"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
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
            <p className="text-xs text-muted-foreground">
              By providing your email, you agree to receive demo access information from BeeOne.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmailCollection;