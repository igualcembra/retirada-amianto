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

// Handler del endpoint - VERSIÓN PROTOTIPO (sin envío real)
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

    // SIMULACIÓN: Registrar en consola (en producción lo verías en los logs de Vercel)
    console.log('📧 NUEVO LEAD RECIBIDO:');
    console.log('━'.repeat(50));
    console.log(`👤 Nombre: ${sanitizedData.nombre}`);
    console.log(`📧 Email: ${sanitizedData.email}`);
    console.log(`📱 Teléfono: ${sanitizedData.telefono}`);
    console.log(`📍 Ubicación: ${sanitizedData.ubicacion}`);
    console.log(`🔧 Servicio: ${sanitizedData.servicio}`);
    if (sanitizedData.mensaje) {
      console.log(`💬 Mensaje: ${sanitizedData.mensaje}`);
    }
    console.log(`🕐 Fecha: ${new Date().toLocaleString('es-ES')}`);
    console.log('━'.repeat(50));

    // Simular delay de red (más realista)
    await new Promise(resolve => setTimeout(resolve, 500));

    // Responder con éxito
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Formulario enviado correctamente (modo demo)',
        data: sanitizedData,
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
      message: 'Contact API endpoint is working (DEMO MODE)',
      timestamp: new Date().toISOString(),
      note: 'Este es un prototipo. Los datos se muestran en los logs de consola.'
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );
};
