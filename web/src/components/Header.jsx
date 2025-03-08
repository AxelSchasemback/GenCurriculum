import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '../utils/supabase';

export default function Header({ session, onSessionChange }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        console.error('Error al cerrar sesión:', error);
        return;
      }
      
      // Actualizar el estado de la sesión
      onSessionChange(null);
      
      // Redirigir al usuario a la página de inicio
      navigate('/');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            CV Builder
          </Link>
          
          {/* Menú para escritorio */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-neutral-700 hover:text-primary-600 font-medium">Inicio</Link>
            
            {session ? (
              <>
                <Link to="/dashboard" className="text-neutral-700 hover:text-primary-600 font-medium">Mis Currículums</Link>
                <Link to="/templates" className="text-neutral-700 hover:text-primary-600 font-medium">Plantillas</Link>
                <button 
                  onClick={handleLogout}
                  className="btn-outline text-sm"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-neutral-700 hover:text-primary-600 font-medium">Iniciar Sesión</Link>
                <Link 
                  to="/register" 
                  className="btn-primary text-sm"
                >
                  Registrarse
                </Link>
              </>
            )}
          </nav>
          
          {/* Botón de menú móvil */}
          <button 
            className="md:hidden text-neutral-700 hover:text-primary-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Menú móvil */}
        {mobileMenuOpen && (
          <nav className="md:hidden pt-4 pb-3 space-y-3">
            <Link 
              to="/" 
              className="block text-neutral-700 hover:text-primary-600 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            
            {session ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block text-neutral-700 hover:text-primary-600 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Mis Currículums
                </Link>
                <Link 
                  to="/templates" 
                  className="block text-neutral-700 hover:text-primary-600 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Plantillas
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-neutral-700 hover:text-primary-600 font-medium py-2"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block text-neutral-700 hover:text-primary-600 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  to="/register" 
                  className="block btn-primary w-full text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Registrarse
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
} 