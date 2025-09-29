import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Mail, Smartphone, Clock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import beeOneLogo from "@/assets/logo_beeone_white.png";
import backgroundImage from "@/assets/background_green.png";
import loginScreenGuide from "@/assets/login_screen_guide.png";
import accessKeyGuide from "@/assets/access_key_guide.png";

const Confirmation = () => {
  const [animate, setAnimate] = useState(false);
  const isMobile = useIsMobile();
  const selectedLanguage = localStorage.getItem('selectedLanguage') || 'english';

  const translations = {
    english: {
      title: "Demo Access Sent!",
      subtitle: "Check your email for your BeeOne Manager demo credentials",
      button: "Continue to BeeOne Manager",
      footer: "Need help? Contact our support team anytime.",
      instructionsTitle: "How to Use Your Access Key:",
      step1: "1. Open BeeOne Manager app and tap the settings icon",
      step2: "2. Enter the access key from your email when prompted"
    },
    spanish: {
      title: "¡Acceso de Demo Enviado!",
      subtitle: "Revisa tu correo electrónico para tus credenciales de demo de BeeOne Manager",
      button: "Continuar a BeeOne Manager",
      footer: "¿Necesitas ayuda? Contacta a nuestro equipo de soporte en cualquier momento.",
      instructionsTitle: "Cómo Usar tu Clave de Acceso:",
      step1: "1. Abre la app BeeOne Manager y toca el ícono de configuración",
      step2: "2. Ingresa la clave de acceso de tu correo cuando se te solicite"
    }
  };

  const t = translations[selectedLanguage as keyof typeof translations];

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleClose = () => {
    if (isMobile) {
      // Try to open Gmail app on mobile, fallback to web if not available
      window.location.href = "googlegmail://";
      // Fallback to web Gmail after a short delay if app doesn't open
      setTimeout(() => {
        window.location.href = "https://mail.google.com";
      }, 1000);
    } else {
      // Open Gmail in browser on desktop
      window.open("https://gmail.com", "_blank");
    }
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

          {/* Instructions Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-center">
              {t.instructionsTitle}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <img 
                  src={loginScreenGuide} 
                  alt="Settings icon location" 
                  className="w-16 h-20 rounded-md border object-cover"
                />
                <p className="text-sm text-muted-foreground flex-1 pt-2">
                  {t.step1}
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <img 
                  src={accessKeyGuide} 
                  alt="Access key dialog" 
                  className="w-16 h-20 rounded-md border object-cover"
                />
                <p className="text-sm text-muted-foreground flex-1 pt-2">
                  {t.step2}
                </p>
              </div>
            </div>
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