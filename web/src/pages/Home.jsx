import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-b-2xl">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none text-primary-900">
                Crea tu Currículum Profesional
              </h1>
              <p className="text-lg text-neutral-700 md:text-xl">
                Diseña un currículum que destaque tus habilidades y experiencia con nuestras plantillas profesionales.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link
                  to="/templates"
                  className="btn-primary"
                >
                  Elegir Plantilla
                </Link>
                <Link
                  to="/dashboard"
                  className="btn-outline"
                >
                  Mis Currículums
                </Link>
                <Link
                  to="/import-cv"
                  className="btn-secondary"
                >
                  Importar CV de Axel
                </Link>
              </div>
            </div>
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -right-6 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
              <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-secondary-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
              <div className="relative shadow-2xl rounded-2xl overflow-hidden border border-neutral-200">
                <img 
                  src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="CV Example" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Características Principales
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Todo lo que necesitas para crear un currículum profesional que destaque entre la multitud.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="card flex flex-col items-center text-center">
              <div className="bg-primary-100 p-4 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary-600"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Plantillas Profesionales</h3>
              <p className="text-neutral-600">
                Elige entre una variedad de plantillas diseñadas por profesionales para destacar tu perfil.
              </p>
            </div>
            
            <div className="card flex flex-col items-center text-center">
              <div className="bg-primary-100 p-4 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary-600"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Personalización Total</h3>
              <p className="text-neutral-600">
                Personaliza cada sección de tu currículum según tus necesidades y preferencias.
              </p>
            </div>
            
            <div className="card flex flex-col items-center text-center">
              <div className="bg-primary-100 p-4 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary-600"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Exportación a PDF</h3>
              <p className="text-neutral-600">
                Descarga tu currículum en formato PDF listo para enviar a empleadores.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 bg-primary-900 text-white">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            ¿Listo para destacar entre la multitud?
          </h2>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto mb-8">
            Crea tu currículum profesional hoy mismo y aumenta tus posibilidades de conseguir el trabajo de tus sueños.
          </p>
          <Link
            to="/register"
            className="btn bg-white text-primary-900 hover:bg-primary-50 focus:ring-white"
          >
            Crear mi CV Ahora
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 