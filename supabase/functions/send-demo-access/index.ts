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
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fffe;">
          <div style="background: linear-gradient(135deg, hsl(82, 64%, 45%), hsl(152, 45%, 15%)); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">¡Bienvenido a BeeOne Manager!</h1>
          </div>
          
          <div style="background: white; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 8px 25px -5px hsl(82, 64%, 45%, 0.15);">
            <h2 style="color: hsl(152, 45%, 15%); margin-bottom: 25px; font-size: 24px; font-weight: 600;">Tus Credenciales de Demo</h2>
            
            <div style="background: hsl(82, 20%, 95%); padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 4px solid hsl(82, 64%, 45%);">
              <p style="margin: 8px 0; color: hsl(152, 45%, 15%); font-size: 16px;"><strong>URL de Acceso:</strong> <a href="${demoCredentials.loginUrl}" style="color: hsl(82, 64%, 45%); text-decoration: none; font-weight: 600;">${demoCredentials.loginUrl}</a></p>
              <p style="margin: 8px 0; color: hsl(152, 45%, 15%); font-size: 16px;"><strong>Usuario:</strong> <span style="font-family: 'Courier New', monospace; background: hsl(82, 30%, 92%); padding: 2px 6px; border-radius: 4px;">${demoCredentials.username}</span></p>
              <p style="margin: 8px 0; color: hsl(152, 45%, 15%); font-size: 16px;"><strong>Contraseña:</strong> <span style="font-family: 'Courier New', monospace; background: hsl(82, 30%, 92%); padding: 2px 6px; border-radius: 4px;">${demoCredentials.password}</span></p>
            </div>

            <div style="background: hsl(82, 30%, 92%); padding: 20px; border-radius: 10px; border-left: 4px solid hsl(82, 64%, 45%); margin: 25px 0;">
              <p style="margin: 0; color: hsl(152, 45%, 15%); font-size: 14px; line-height: 1.5;"><strong>🌱 Consejo:</strong> Estas credenciales son válidas por 7 días. Explora todas las funcionalidades de BeeOne Manager durante este período.</p>
            </div>

            <p style="color: hsl(152, 25%, 45%); line-height: 1.7; font-size: 16px; margin: 25px 0;">
              ¡Gracias por tu interés en BeeOne Manager! Estas credenciales te permiten acceder a una demo completa de nuestra plataforma de gestión.
            </p>

            <div style="text-align: center; margin: 35px 0;">
              <a href="${demoCredentials.loginUrl}" style="background: linear-gradient(135deg, hsl(82, 64%, 45%), hsl(152, 45%, 15%)); color: white; padding: 16px 35px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 15px hsl(82, 64%, 45%, 0.3); transition: all 0.3s ease;">Acceder al Demo</a>
            </div>

            <hr style="border: none; height: 1px; background: hsl(82, 20%, 90%); margin: 35px 0;">
            
            <p style="color: hsl(152, 25%, 45%); font-size: 13px; text-align: center; line-height: 1.5;">
              Si tienes alguna pregunta, no dudes en contactarnos.<br>
              <strong style="color: hsl(152, 45%, 15%);">Equipo BeeOne Manager</strong>
            </p>
          </div>
        </div>
      `
    } : {
      subject: "Demo Access - BeeOne Manager",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fffe;">
          <div style="background: linear-gradient(135deg, hsl(82, 64%, 45%), hsl(152, 45%, 15%)); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">Welcome to BeeOne Manager!</h1>
          </div>
          
          <div style="background: white; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 8px 25px -5px hsl(82, 64%, 45%, 0.15);">
            <h2 style="color: hsl(152, 45%, 15%); margin-bottom: 25px; font-size: 24px; font-weight: 600;">Your Demo Credentials</h2>
            
            <div style="background: hsl(82, 20%, 95%); padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 4px solid hsl(82, 64%, 45%);">
              <p style="margin: 8px 0; color: hsl(152, 45%, 15%); font-size: 16px;"><strong>Login URL:</strong> <a href="${demoCredentials.loginUrl}" style="color: hsl(82, 64%, 45%); text-decoration: none; font-weight: 600;">${demoCredentials.loginUrl}</a></p>
              <p style="margin: 8px 0; color: hsl(152, 45%, 15%); font-size: 16px;"><strong>Username:</strong> <span style="font-family: 'Courier New', monospace; background: hsl(82, 30%, 92%); padding: 2px 6px; border-radius: 4px;">${demoCredentials.username}</span></p>
              <p style="margin: 8px 0; color: hsl(152, 45%, 15%); font-size: 16px;"><strong>Password:</strong> <span style="font-family: 'Courier New', monospace; background: hsl(82, 30%, 92%); padding: 2px 6px; border-radius: 4px;">${demoCredentials.password}</span></p>
            </div>

            <div style="background: hsl(82, 30%, 92%); padding: 20px; border-radius: 10px; border-left: 4px solid hsl(82, 64%, 45%); margin: 25px 0;">
              <p style="margin: 0; color: hsl(152, 45%, 15%); font-size: 14px; line-height: 1.5;"><strong>🌱 Tip:</strong> These credentials are valid for 7 days. Explore all BeeOne Manager features during this period.</p>
            </div>

            <p style="color: hsl(152, 25%, 45%); line-height: 1.7; font-size: 16px; margin: 25px 0;">
              Thank you for your interest in BeeOne Manager! These credentials give you access to a full demo of our management platform.
            </p>

            <div style="text-align: center; margin: 35px 0;">
              <a href="${demoCredentials.loginUrl}" style="background: linear-gradient(135deg, hsl(82, 64%, 45%), hsl(152, 45%, 15%)); color: white; padding: 16px 35px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 15px hsl(82, 64%, 45%, 0.3); transition: all 0.3s ease;">Access Demo</a>
            </div>

            <hr style="border: none; height: 1px; background: hsl(82, 20%, 90%); margin: 35px 0;">
            
            <p style="color: hsl(152, 25%, 45%); font-size: 13px; text-align: center; line-height: 1.5;">
              If you have any questions, don't hesitate to contact us.<br>
              <strong style="color: hsl(152, 45%, 15%);">BeeOne Manager Team</strong>
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