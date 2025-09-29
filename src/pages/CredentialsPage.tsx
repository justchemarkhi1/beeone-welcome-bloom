import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CredentialsDisplay from "@/components/onboarding/CredentialsDisplay";

interface DemoCredentials {
  username: string;
  password: string;
  loginUrl: string;
}

const CredentialsPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<DemoCredentials | null>(null);

  useEffect(() => {
    // Get credentials from localStorage
    const storedCredentials = localStorage.getItem('demoCredentials');
    
    if (!storedCredentials) {
      // If no credentials found, redirect to email collection
      navigate('/email');
      return;
    }

    try {
      const parsedCredentials = JSON.parse(storedCredentials);
      setCredentials(parsedCredentials);
    } catch (error) {
      console.error('Error parsing credentials:', error);
      navigate('/email');
    }
  }, [navigate]);

  if (!credentials) {
    return null; // Loading state while checking credentials
  }

  return <CredentialsDisplay credentials={credentials} />;
};

export default CredentialsPage;