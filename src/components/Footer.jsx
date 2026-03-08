import React from 'react';

export function Footer() {
    return (
        <footer className="w-full text-center py-6 text-sm text-gray-500 pb-28">
            <div className="flex justify-center gap-4 mb-2">
                <a href="#iva" className="hover:text-electricBlue transition-colors">Calculadora IVA</a>
                <a href="#honorarios" className="hover:text-electricBlue transition-colors">Boleta Honorarios</a>
            </div>
            <p>&copy; {new Date().getFullYear()} AstraContable Chile. Todos los derechos reservados.</p>
            <p className="text-xs mt-1">Herramienta contable gratuita y de rápido acceso.</p>
        </footer>
    );
}
