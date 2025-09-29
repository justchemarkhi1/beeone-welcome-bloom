import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

const supabase = createClient(supabaseUrl, supabaseKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailValidationRequest {
  email: string;
  language: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, language }: EmailValidationRequest = await req.json();

    console.log(`Validating email: ${email}, language: ${language}`);

    // Internal email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email.trim()) && email.length <= 255;
    
    console.log("Email validation result:", { email, isValid });

    if (!isValid) {
      return new Response(JSON.stringify({ 
        success: false, 
        valid: false,
        message: "Please enter a valid, existing email address" 
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    // Generate demo credentials
    const demoCredentials = {
      username: `demo_${Date.now()}`,
      password: `BeeOne${Math.random().toString(36).substring(2, 8)}`,
      loginUrl: "https://demo.beeone-manager.com/login"
    };

    // Store the validated email and credentials in the database
    const { data: demoRequest, error: dbError } = await supabase
      .from('demo_requests')
      .insert({
        email,
        language,
        status: 'credentials_generated',
        demo_username: demoCredentials.username,
        demo_password: demoCredentials.password
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to store demo request");
    }

    return new Response(JSON.stringify({ 
      success: true, 
      valid: true,
      credentials: demoCredentials,
      requestId: demoRequest.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in validate-email function:", error);

    return new Response(
      JSON.stringify({ 
        success: false, 
        valid: false,
        error: error.message || "Failed to validate email" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);