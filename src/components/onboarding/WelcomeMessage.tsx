import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import beeOneLogo from "@/assets/logo_beeone_white.png";
import fruitAttractionLogo from "@/assets/fruit_attraction_logo.png";
import backgroundImage from "@/assets/background_green.png";

const WelcomeMessage = () => {
  const navigate = useNavigate();
  const selectedLanguage = localStorage.getItem('selectedLanguage') || 'english';
  
  const translations = {
    english: {
      title: "Welcome from Fruit Attraction 2025!",
      aboutTitle: "About BeeOne Manager",
      aboutText: "BeeOne Manager is the dedicated output platform specifically designed for farm managers who need quick access to critical insights and data.",
      poweredTitle: "Powered by BeeOne",
      poweredText: "All data comes from BeeOne - the comprehensive, all-inclusive farm management system that handles every aspect of your agricultural operations.",
      readyTitle: "Ready to Experience BeeOne Manager?",
      readyText: "Your personalized demo showcases real farm management capabilities",
      button: "Explore BeeOne Manager Features",
      footer: "Thank you for visiting us at Fruit Attraction 2025"
    },
    spanish: {
      title: "¡Bienvenido desde Fruit Attraction 2025!",
      aboutTitle: "Sobre BeeOne Manager",
      aboutText: "BeeOne Manager es la plataforma de salida dedicada específicamente diseñada para gerentes de finca que necesitan acceso rápido a información crítica y datos.",
      poweredTitle: "Desarrollado por BeeOne",
      poweredText: "Todos los datos provienen de BeeOne - el sistema integral de gestión agrícola que maneja cada aspecto de sus operaciones agrícolas.",
      readyTitle: "¿Listo para Experimentar BeeOne Manager?",
      readyText: "Su demo personalizado muestra capacidades reales de gestión agrícola",
      button: "Explorar las Características de BeeOne Manager",
      footer: "Gracias por visitarnos en Fruit Attraction 2025"
    }
  };
  
  const t = translations[selectedLanguage as keyof typeof translations];

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
        <Card className="p-6 shadow-medium bg-white/95 backdrop-blur-sm">
          <div className="text-center mb-6">
            {/* Fruit Attraction Logo */}
            <div className="w-full max-w-40 h-12 mx-auto mb-6 flex items-center justify-center">
              <img 
                src={fruitAttractionLogo} 
                alt="Fruit Attraction 2025" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            <h1 className="text-xl font-bold text-foreground mb-6">
              {t.title}
            </h1>
          </div>
            
          <div className="space-y-4 mb-6">
            <div className="flex items-start space-x-3 p-3 bg-accent rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <img 
                  src={beeOneLogo} 
                  alt="BeeOne" 
                  className="w-5 h-5 object-contain"
                />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground mb-1">{t.aboutTitle}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t.aboutText}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-accent rounded-lg">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">🌾</span>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground mb-1">{t.poweredTitle}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t.poweredText}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm">🚀</span>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground mb-1">{t.readyTitle}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t.readyText}
                </p>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => navigate("/features")}
            className="w-full bg-gradient-primary hover:opacity-90 transition-smooth shadow-soft text-base py-5 mb-4"
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

export default WelcomeMessage;