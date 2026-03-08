import React, { useState } from 'react';
import { Percent, FileText } from 'lucide-react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AdContainer } from './components/AdContainer';

import { IvaCalculator } from './components/IvaCalculator';
import { HonorariosCalculator } from './components/HonorariosCalculator';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('iva');

  return (
    <div className="min-h-screen bg-darkBackground text-white flex flex-col font-sans w-full">
      <AdContainer slotType="sticky" />
      <Header />

      <main className="flex-1 w-full px-4 pt-4 pb-24">
        <div className="animate-in fade-in duration-300">
          {activeTab === 'iva' && <IvaCalculator />}
          {activeTab === 'honorarios' && <HonorariosCalculator />}
        </div>

        <AdContainer slotType="native" />
      </main>

      <Footer />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-cardBackground/90 backdrop-blur-md border-t border-border z-50">
        <div className="flex justify-around items-center h-20 px-2 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('iva')}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${activeTab === 'iva' ? 'text-electricBlue' : 'text-gray-500 hover:text-gray-300'
              }`}
          >
            <Percent size={24} className={activeTab === 'iva' ? 'drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]' : ''} />
            <span className="text-xs font-medium">IVA</span>
          </button>

          <button
            onClick={() => setActiveTab('honorarios')}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${activeTab === 'honorarios' ? 'text-electricBlue' : 'text-gray-500 hover:text-gray-300'
              }`}
          >
            <FileText size={24} className={activeTab === 'honorarios' ? 'drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]' : ''} />
            <span className="text-xs font-medium">Honorarios</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default App;
