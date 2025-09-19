import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Mail, Smartphone, Clock } from "lucide-react";
import beeOneLogo from "@/assets/logo_beeone_white.png";
import backgroundImage from "@/assets/background_green.png";

const Confirmation = () => {
  const [animate, setAnimate] = useState(false);
  const selectedLanguage = localStorage.getItem('selectedLanguage') || 'english';

  const translations = {
    english: {
      title: "Demo Access Sent!",
      subtitle: "Check your email for your BeeOne Manager demo credentials",
      button: "Continue to BeeOne Manager",
      footer: "Need help? Contact our support team anytime."
    },
    spanish: {
      title: "¡Acceso de Demo Enviado!",
      subtitle: "Revisa tu correo electrónico para tus credenciales de demo de BeeOne Manager",
      button: "Continuar a BeeOne Manager",
      footer: "¿Necesitas ayuda? Contacta a nuestro equipo de soporte en cualquier momento."
    }
  };

  const t = translations[selectedLanguage as keyof typeof translations];

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
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-2xl font-bold mb-3">
              {t.title}
            </h1>
            
            <p className="text-muted-foreground">
              {t.subtitle}
            </p>
          </div>

          <Button
            onClick={handleClose}
            className="w-full bg-gradient-primary hover:opacity-90 transition-smooth text-lg py-4 mb-4"
          >
            {t.button}
          </Button>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              {t.footer}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Confirmation;