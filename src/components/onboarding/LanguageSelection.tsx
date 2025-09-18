import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const LanguageSelection = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setTimeout(() => {
      navigate("/welcome");
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4 shadow-soft">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Welcome to BeeOne Manager
          </h1>
          <p className="text-muted-foreground">
            Please select your preferred language
          </p>
        </div>

        <div className="space-y-4">
          <Card 
            className={`p-6 cursor-pointer transition-smooth hover:shadow-medium ${
              selectedLanguage === 'english' ? 'ring-2 ring-primary bg-accent' : ''
            }`}
            onClick={() => handleLanguageSelect('english')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🇺🇸</span>
                <span className="text-lg font-medium">English</span>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 transition-smooth ${
                selectedLanguage === 'english' ? 'bg-primary border-primary' : 'border-muted-foreground'
              }`}>
                {selectedLanguage === 'english' && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card 
            className={`p-6 cursor-pointer transition-smooth hover:shadow-medium ${
              selectedLanguage === 'spanish' ? 'ring-2 ring-primary bg-accent' : ''
            }`}
            onClick={() => handleLanguageSelect('spanish')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🇪🇸</span>
                <span className="text-lg font-medium">Español</span>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 transition-smooth ${
                selectedLanguage === 'spanish' ? 'bg-primary border-primary' : 'border-muted-foreground'
              }`}>
                {selectedLanguage === 'spanish' && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;