import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">CV Builder</h3>
            <p className="text-gray-300 mt-2">Crea tu currículum profesional de forma fácil y rápida</p>
          </div>
          <div>
            <p className="text-gray-300">&copy; {new Date().getFullYear()} CV Builder. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 