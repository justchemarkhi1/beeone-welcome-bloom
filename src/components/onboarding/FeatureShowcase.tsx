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
  const selectedLanguage = localStorage.getItem('selectedLanguage') || 'english';

  const translations = {
    english: {
      title: "BeeOne Manager Features",
      subtitle: "Discover what makes us the perfect solution for modern farm management",
      features: [
        {
          title: "Real-Time KPIs",
          description: "Access instant insights into your farm's performance with live data visualization and comprehensive analytics.",
          details: "Monitor yield, efficiency, and productivity metrics in real-time to make informed decisions quickly."
        },
        {
          title: "Interactive Map Views",
          description: "Visualize your entire farm operation with detailed, interactive maps showing field conditions and activities.",
          details: "Track equipment, monitor field conditions, and plan operations with precision mapping technology."
        },
        {
          title: "Team Collaboration",
          description: "Seamlessly collaborate with your team members, share updates, and coordinate farm activities efficiently.",
          details: "Assign tasks, share notes, and maintain communication across all farm operations in one platform."
        },
        {
          title: "AI Voice Assistant",
          description: "Get instant answers about your farm's performance using our intelligent voice assistant powered by BeeOne data.",
          details: "Simply ask questions about your crops, weather, tasks, or any farm data and get immediate insights."
        }
      ],
      navigation: {
        previous: "Previous",
        next: "Next",
        getDemo: "Get Demo"
      },
      footer: {
        poweredBy: "Powered by BeeOne",
        autoScrolling: "Auto-scrolling..."
      }
    },
    spanish: {
      title: "Características de BeeOne Manager",
      subtitle: "Descubre lo que nos convierte en la solución perfecta para la gestión agrícola moderna",
      features: [
        {
          title: "KPIs en Tiempo Real",
          description: "Accede a información instantánea sobre el rendimiento de tu finca con visualización de datos en vivo y análisis integral.",
          details: "Monitorea métricas de rendimiento, eficiencia y productividad en tiempo real para tomar decisiones informadas rápidamente."
        },
        {
          title: "Vistas de Mapas Interactivos",
          description: "Visualiza toda tu operación agrícola con mapas detallados e interactivos que muestran condiciones del campo y actividades.",
          details: "Rastrea equipos, monitorea condiciones del campo y planifica operaciones con tecnología de mapeo de precisión."
        },
        {
          title: "Colaboración en Equipo",
          description: "Colabora sin problemas con los miembros de tu equipo, comparte actualizaciones y coordina actividades agrícolas de manera eficiente.",
          details: "Asigna tareas, comparte notas y mantén comunicación en todas las operaciones agrícolas en una sola plataforma."
        },
        {
          title: "Asistente de Voz IA",
          description: "Obtén respuestas instantáneas sobre el rendimiento de tu finca usando nuestro asistente de voz inteligente impulsado por datos de BeeOne.",
          details: "Simplemente haz preguntas sobre tus cultivos, clima, tareas o cualquier dato agrícola y obtén información inmediata."
        }
      ],
      navigation: {
        previous: "Anterior",
        next: "Siguiente",
        getDemo: "Obtener Demo"
      },
      footer: {
        poweredBy: "Desarrollado por BeeOne",
        autoScrolling: "Avance automático..."
      }
    }
  };

  const t = translations[selectedLanguage as keyof typeof translations];

  const features = [
    {
      icon: BarChart3,
      title: t.features[0].title,
      description: t.features[0].description,
      details: t.features[0].details,
      color: "bg-primary"
    },
    {
      icon: Map,
      title: t.features[1].title,
      description: t.features[1].description,
      details: t.features[1].details,
      color: "bg-blue-500"
    },
    {
      icon: Users,
      title: t.features[2].title,
      description: t.features[2].description,
      details: t.features[2].details,
      color: "bg-purple-500"
    },
    {
      icon: Mic,
      title: t.features[3].title,
      description: t.features[3].description,
      details: t.features[3].details,
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
            {t.title}
          </h1>
          <p className="text-white/80 text-sm font-light">
            {t.subtitle}
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
            {t.navigation.previous}
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
            {currentSlide === features.length - 1 ? t.navigation.getDemo : t.navigation.next}
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-white/60">
            {currentSlide + 1} of {features.length} • {t.footer.poweredBy}
          </p>
          {isAutoScrolling && (
            <p className="text-xs text-white/40 mt-1">
              {t.footer.autoScrolling}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;