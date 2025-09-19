import { useState } from "react";
import { useNavigate } from "react-router-dom";
import beeOneLogo from "@/assets/logo_beeone_white.png";
import backgroundImage from "@/assets/background_green.png";

const LanguageSelection = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    localStorage.setItem('selectedLanguage', language);
    setTimeout(() => {
      navigate("/welcome");
    }, 300);
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
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="w-full max-w-sm animate-fade-in-up relative z-10">
        <div className="text-center mb-12">
          {/* BeeOne Logo */}
          <div className="w-20 h-20 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-8 shadow-soft p-4">
            <img 
              src={beeOneLogo} 
              alt="BeeOne" 
              className="w-full h-full object-contain"
            />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-3">
            Welcome to BeeOne Manager
          </h1>
          <p className="text-white/80 text-sm font-light">
            Please select your preferred language
          </p>
        </div>

        <div className="space-y-3">
          <div 
            className={`bg-white rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedLanguage === 'english' ? 'shadow-lg ring-2 ring-white/50' : 'shadow-md'
            }`}
            onClick={() => handleLanguageSelect('english')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">US</span>
                </div>
                <span className="text-gray-800 font-medium">English</span>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                selectedLanguage === 'english' 
                  ? 'border-primary bg-primary' 
                  : 'border-gray-300'
              }`}>
                {selectedLanguage === 'english' && (
                  <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div 
            className={`bg-white rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedLanguage === 'spanish' ? 'shadow-lg ring-2 ring-white/50' : 'shadow-md'
            }`}
            onClick={() => handleLanguageSelect('spanish')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-6 bg-red-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">ES</span>
                </div>
                <span className="text-gray-800 font-medium">Español</span>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                selectedLanguage === 'spanish' 
                  ? 'border-primary bg-primary' 
                  : 'border-gray-300'
              }`}>
                {selectedLanguage === 'spanish' && (
                  <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;