import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Copy, Eye, EyeOff, Smartphone, Monitor } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import beeOneLogo from "@/assets/logo_beeone_white.png";
import backgroundImage from "@/assets/background_green.png";

interface DemoCredentials {
  username: string;
  password: string;
  loginUrl: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
}

interface CredentialsDisplayProps {
  credentials: DemoCredentials;
}

const CredentialsDisplay: React.FC<CredentialsDisplayProps> = ({ credentials }) => {
  const [animate, setAnimate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const selectedLanguage = localStorage.getItem('selectedLanguage') || 'english';

  const translations = {
    english: {
      title: "Your Login Credentials",
      subtitle: "Save these credentials to access BeeOne Manager",
      loginUrl: "Login URL",
      username: "Username",
      password: "Password",
      showPassword: "Show Password",
      hidePassword: "Hide Password",
      copyUsername: "Copy Username",
      copyPassword: "Copy Password",
      copyUrl: "Copy URL",
      copied: "Copied to clipboard!",
      proceedMobile: "Open on Mobile",
      proceedDesktop: "Open on Desktop",
      downloadApp: "Download App",
      playStore: "Google Play Store",
      appStore: "Apple App Store",
      note: "These credentials are valid for 7 days. Please save them securely.",
      footer: "BeeOne Manager - Your Digital Solution"
    },
    spanish: {
      title: "Tus Credenciales de Acceso",
      subtitle: "Guarda estas credenciales para acceder a BeeOne Manager",
      loginUrl: "URL de Acceso",
      username: "Usuario",
      password: "Contraseña",
      showPassword: "Mostrar Contraseña",
      hidePassword: "Ocultar Contraseña",
      copyUsername: "Copiar Usuario",
      copyPassword: "Copiar Contraseña",
      copyUrl: "Copiar URL",
      copied: "¡Copiado al portapapeles!",
      proceedMobile: "Abrir en Móvil",
      proceedDesktop: "Abrir en Escritorio",
      downloadApp: "Descargar Aplicación",
      playStore: "Google Play Store",
      appStore: "Apple App Store",
      note: "Estas credenciales son válidas por 7 días. Por favor guárdalas de forma segura.",
      footer: "BeeOne Manager - Tu Solución Digital"
    }
  };

  const t = translations[selectedLanguage as keyof typeof translations];

  useEffect(() => {
    setAnimate(true);
  }, []);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: t.copied,
      description: `${type} ${t.copied.toLowerCase()}`,
    });
  };

  const handleProceed = (platform: 'mobile' | 'desktop') => {
    // Open the login URL
    if (platform === 'mobile') {
      window.location.href = credentials.loginUrl;
    } else {
      window.open(credentials.loginUrl, '_blank');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <Card className={`w-full max-w-md p-8 space-y-6 relative z-10 bg-white/95 backdrop-blur-sm transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {/* Logo */}
        <div className="text-center">
          <img src={beeOneLogo} alt="BeeOne Logo" className="w-24 h-24 mx-auto mb-4 bg-primary rounded-full p-3" />
        </div>

        {/* Success Icon */}
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {/* Credentials */}
        <div className="space-y-4">
          {/* Login URL */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">{t.loginUrl}</label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(credentials.loginUrl, t.loginUrl)}
                className="h-8 w-8 p-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-blue-600 break-all">{credentials.loginUrl}</p>
          </div>

          {/* Username */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">{t.username}</label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(credentials.username, t.username)}
                className="h-8 w-8 p-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm font-mono">{credentials.username}</p>
          </div>

          {/* Password */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">{t.password}</label>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="h-8 w-8 p-0"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(credentials.password, t.password)}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm font-mono">
              {showPassword ? credentials.password : '•'.repeat(credentials.password.length)}
            </p>
          </div>
        </div>

        {/* App Download Links */}
        {(credentials.playStoreUrl || credentials.appStoreUrl) && (
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-primary">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">{t.downloadApp}</h3>
            <div className="space-y-2">
              {credentials.playStoreUrl && (
                <a
                  href={credentials.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-primary hover:underline"
                >
                  📱 {t.playStore}
                </a>
              )}
              {credentials.appStoreUrl && (
                <a
                  href={credentials.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-primary hover:underline"
                >
                  🍎 {t.appStore}
                </a>
              )}
            </div>
          </div>
        )}

        {/* Note */}
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
          <p className="text-sm text-blue-800">{t.note}</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={() => handleProceed('mobile')}
            className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg font-semibold flex items-center justify-center gap-3"
          >
            <Smartphone className="h-6 w-6" />
            {t.proceedMobile}
          </Button>
          
          <Button 
            onClick={() => handleProceed('desktop')}
            variant="outline"
            className="w-full py-6 text-lg font-semibold flex items-center justify-center gap-3"
          >
            <Monitor className="h-6 w-6" />
            {t.proceedDesktop}
          </Button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          {t.footer}
        </p>
      </Card>
    </div>
  );
};

export default CredentialsDisplay;