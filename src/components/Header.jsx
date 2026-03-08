import React from 'react';
import { Calculator } from 'lucide-react';

export function Header() {
    return (
        <header className="w-full flex justify-center py-6 px-4 pb-4">
            <div className="flex items-center gap-3">
                <div className="bg-electricBlue text-[#0b0f19] p-2 rounded-xl shadow-[0_0_15px_rgba(0,210,255,0.5)]">
                    <Calculator size={28} />
                </div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Astra<span className="text-electricBlue">Contable</span>
                </h1>
            </div>
        </header>
    );
}
