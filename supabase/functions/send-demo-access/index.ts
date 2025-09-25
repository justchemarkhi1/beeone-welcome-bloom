import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(supabaseUrl, supabaseKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface DemoRequestData {
  email: string;
  language: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, language }: DemoRequestData = await req.json();

    console.log(`Processing demo request for: ${email}, language: ${language}`);

    // Store the demo request in the database
    const { data: demoRequest, error: dbError } = await supabase
      .from('demo_requests')
      .insert({
        email,
        language,
        status: 'pending'
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to store demo request");
    }

    // Generate demo credentials (in a real app, these would be unique)
    const demoCredentials = {
      username: `demo_${Date.now()}`,
      password: `BeeOne${Math.random().toString(36).substring(2, 8)}`,
      loginUrl: "https://demo.beeone-manager.com/login"
    };

    // Prepare email content based on language
    const emailContent = language === 'spanish' ? {
      subject: "Acceso de Demo - BeeOne Manager",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #8B5CF6, #3B82F6); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">¡Bienvenido a BeeOne Manager!</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">Tus Credenciales de Demo</h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>URL de Acceso:</strong> <a href="${demoCredentials.loginUrl}" style="color: #8B5CF6;">${demoCredentials.loginUrl}</a></p>
              <p><strong>Usuario:</strong> ${demoCredentials.username}</p>
              <p><strong>Contraseña:</strong> ${demoCredentials.password}</p>
            </div>

            <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
              <p style="margin: 0; color: #065f46;"><strong>💡 Consejo:</strong> Estas credenciales son válidas por 7 días. Explora todas las funcionalidades de BeeOne Manager durante este período.</p>
            </div>

            <p style="color: #666; line-height: 1.6;">
              ¡Gracias por tu interés en BeeOne Manager! Estas credenciales te permiten acceder a una demo completa de nuestra plataforma de gestión.
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${demoCredentials.loginUrl}" style="background: linear-gradient(135deg, #8B5CF6, #3B82F6); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">Acceder al Demo</a>
            </div>

            <hr style="border: none; height: 1px; background: #eee; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              Si tienes alguna pregunta, no dudes en contactarnos.<br>
              Equipo BeeOne Manager
            </p>
          </div>
        </div>
      `
    } : {
      subject: "Demo Access - BeeOne Manager",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #8B5CF6, #3B82F6); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to BeeOne Manager!</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">Your Demo Credentials</h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Login URL:</strong> <a href="${demoCredentials.loginUrl}" style="color: #8B5CF6;">${demoCredentials.loginUrl}</a></p>
              <p><strong>Username:</strong> ${demoCredentials.username}</p>
              <p><strong>Password:</strong> ${demoCredentials.password}</p>
            </div>

            <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
              <p style="margin: 0; color: #065f46;"><strong>💡 Tip:</strong> These credentials are valid for 7 days. Explore all BeeOne Manager features during this period.</p>
            </div>

            <p style="color: #666; line-height: 1.6;">
              Thank you for your interest in BeeOne Manager! These credentials give you access to a full demo of our management platform.
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${demoCredentials.loginUrl}" style="background: linear-gradient(135deg, #8B5CF6, #3B82F6); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">Access Demo</a>
            </div>

            <hr style="border: none; height: 1px; background: #eee; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              If you have any questions, don't hesitate to contact us.<br>
              BeeOne Manager Team
            </p>
          </div>
        </div>
      `
    };

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "BeeOne Manager <demo@resend.dev>",
      to: [email],
      subject: emailContent.subject,
      html: emailContent.html,
    });

    console.log("Email sent successfully:", emailResponse);

    // Update the demo request status to 'sent'
    await supabase
      .from('demo_requests')
      .update({ status: 'sent' })
      .eq('id', demoRequest.id);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Demo access sent successfully",
      requestId: demoRequest.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in send-demo-access function:", error);

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Failed to send demo access" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);