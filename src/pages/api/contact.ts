import type { APIRoute } from 'astro';

// Tipos para el formulario
interface ContactFormData {
  nombre: string;
  email: string;
  telefono: string;
  ubicacion: string;
  servicio: string;
  mensaje?: string;
}

// Función para enviar email usando Resend
async function sendEmail(data: ContactFormData) {
  const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
  const EMAIL_TO = import.meta.env.EMAIL_TO || 'info@retirada-amianto.es';

  if (!RESEND_API_KEY) {
    console.warn('⚠️ RESEND_API_KEY no configurada. El email no se enviará.');
    return { success: false, message: 'API key not configured' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Retirada Amianto <onboarding@resend.dev>', // Cambiar cuando tengas dominio verificado
        to: EMAIL_TO,
        subject: `Nuevo lead: ${data.nombre} - ${data.servicio}`,
        html: `
          <h2>Nuevo contacto desde la web</h2>
          <p><strong>Nombre:</strong> ${data.nombre}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Teléfono:</strong> ${data.telefono}</p>
          <p><strong>Ubicación:</strong> ${data.ubicacion}</p>
          <p><strong>Servicio:</strong> ${data.servicio}</p>
          ${data.mensaje ? `<p><strong>Mensaje:</strong><br>${data.mensaje.replace(/\n/g, '<br>')}</p>` : ''}
          <hr>
          <p style="color: #666; font-size: 12px;">Recibido el ${new Date().toLocaleString('es-ES')}</p>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Error enviando email:', error);
      return { success: false, message: error };
    }

    return { success: true };
  } catch (error) {
    console.error('Error en sendEmail:', error);
    return { success: false, message: String(error) };
  }
}

// Función para guardar en Google Sheets
async function saveToGoogleSheets(data: ContactFormData) {
  const GOOGLE_SHEETS_URL = import.meta.env.GOOGLE_SHEETS_URL;

  if (!GOOGLE_SHEETS_URL) {
    console.warn('⚠️ GOOGLE_SHEETS_URL no configurada. No se guardará en Sheets.');
    return { success: false, message: 'Google Sheets URL not configured' };
  }

  try {
    const timestamp = new Date().toLocaleString('es-ES');

    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp,
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono,
        ubicacion: data.ubicacion,
        servicio: data.servicio,
        mensaje: data.mensaje || '',
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Error guardando en Google Sheets:', error);
      return { success: false, message: error };
    }

    return { success: true };
  } catch (error) {
    console.error('Error en saveToGoogleSheets:', error);
    return { success: false, message: String(error) };
  }
}

// Handler del endpoint
export const POST: APIRoute = async ({ request }) => {
  try {
    // Validar Content-Type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ error: 'Content-Type debe ser application/json' }),
        { status: 400 }
      );
    }

    // Parsear datos
    const data = await request.json() as ContactFormData;

    // Validar campos requeridos
    const requiredFields = ['nombre', 'email', 'telefono', 'ubicacion', 'servicio'];
    const missingFields = requiredFields.filter(field => !data[field as keyof ContactFormData]);

    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({
          error: 'Faltan campos requeridos',
          missing: missingFields
        }),
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ error: 'Email inválido' }),
        { status: 400 }
      );
    }

    // Sanitizar datos (prevenir XSS)
    const sanitizedData: ContactFormData = {
      nombre: data.nombre.trim().substring(0, 100),
      email: data.email.trim().toLowerCase().substring(0, 100),
      telefono: data.telefono.trim().substring(0, 20),
      ubicacion: data.ubicacion.trim().substring(0, 100),
      servicio: data.servicio.trim().substring(0, 100),
      mensaje: data.mensaje ? data.mensaje.trim().substring(0, 1000) : undefined,
    };

    // Enviar email (no bloquea si falla)
    const emailResult = await sendEmail(sanitizedData);

    // Guardar en Google Sheets (no bloquea si falla)
    const sheetsResult = await saveToGoogleSheets(sanitizedData);

    // Responder al cliente
    // Consideramos éxito si al menos uno de los dos funciona
    if (!emailResult.success && !sheetsResult.success) {
      console.error('Ambos servicios fallaron:', { emailResult, sheetsResult });
      return new Response(
        JSON.stringify({
          error: 'No se pudo procesar el formulario. Por favor, intenta de nuevo.'
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Formulario enviado correctamente',
        email: emailResult.success,
        sheets: sheetsResult.success,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

  } catch (error) {
    console.error('Error procesando formulario:', error);
    return new Response(
      JSON.stringify({
        error: 'Error interno del servidor'
      }),
      { status: 500 }
    );
  }
};

// Método GET para verificar que el endpoint está activo
export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      status: 'ok',
      message: 'Contact API endpoint is working',
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );
};
