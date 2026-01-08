export interface Provincia {
  nombre: string;
  slug: string;
  comunidad: string;
  descripcion: string;
  title: string;
  metaDescription: string;
  keywords: string[];
  keywordsSecundarias: string[];
  provinciasLimitrofes: string[];
  coordenadas: {
    lat: number;
    lng: number;
  };
}

export const provincias: Record<string, Provincia> = {
  madrid: {
    nombre: 'Madrid',
    slug: 'madrid',
    comunidad: 'Comunidad de Madrid',
    descripcion: 'Empresa especializada en retirada de amianto en Madrid y toda la Comunidad de Madrid. Ofrecemos servicios profesionales de desamiantado con certificación RERA.',
    title: 'Retirada de Amianto en Madrid | Presupuesto Sin Compromiso',
    metaDescription: 'Expertos en retirada de amianto en Madrid y provincia. Certificados RERA. Presupuesto sin compromiso en 24h. Servicio profesional con todas las garantías.',
    keywords: [
      'retirada de amianto madrid',
      'retirada amianto madrid',
      'amianto madrid',
      'retirada de uralita madrid',
      'retirar uralita madrid',
      'quitar amianto madrid',
      'retirada de fibrocemento madrid'
    ],
    keywordsSecundarias: [
      'retirar uralita gratis madrid',
      'subvenciones para quitar uralita 2023 madrid',
      'retirada de amianto comunidad de madrid',
      'gestión amianto madrid',
      'análisis de amianto madrid',
      'retirada de uralita precio madrid'
    ],
    provinciasLimitrofes: ['toledo', 'avila', 'segovia', 'guadalajara', 'cuenca'],
    coordenadas: {
      lat: 40.4168,
      lng: -3.7038
    }
  }
};

export const getProvinciaNombre = (slug: string): string => {
  const provincia = provincias[slug];
  return provincia ? provincia.nombre : '';
};

export const getProvinciaData = (slug: string): Provincia | null => {
  return provincias[slug] || null;
};
