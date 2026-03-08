import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function ResultCard({ title, items }) {
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [copiedAll, setCopiedAll] = useState(false);

    if (!items) return null;

    const handleCopy = (val, index) => {
        navigator.clipboard.writeText(val.toString());
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const handleCopyAll = () => {
        const textToCopy = items.map(item => `${item.label}: ${item.value}`).join('\n');
        navigator.clipboard.writeText(textToCopy);
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2000);
    };

    return (
        <div className="bg-cardBackground border border-border rounded-xl p-6 shadow-lg shadow-black/50 mt-6 w-full max-w-md mx-auto animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-electricBlue/90">{title}</h3>
                <button
                    onClick={handleCopyAll}
                    className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition-colors bg-darkBackground/80 hover:bg-darkBackground px-3 py-1.5 rounded-lg border border-border"
                >
                    {copiedAll ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    {copiedAll ? 'Copiado' : 'Copiar todo'}
                </button>
            </div>

            <div className="space-y-5">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="group/row flex flex-col sm:flex-row sm:justify-between sm:items-center text-lg relative"
                    >
                        <span className="text-gray-400 mb-2 sm:mb-0 text-left">{item.label}</span>

                        <div className="flex flex-row-reverse sm:flex-row justify-between items-center sm:gap-4 w-full sm:w-auto">
                            <button
                                onClick={() => handleCopy(item.rawValue !== undefined ? item.rawValue : item.value, index)}
                                className="opacity-100 sm:opacity-0 sm:group-hover/row:opacity-100 transition-opacity flex items-center gap-1 text-xs font-semibold text-electricBlue bg-electricBlue/10 hover:bg-electricBlue/20 px-2 py-1.5 rounded-md"
                                title="Copiar monto"
                            >
                                {copiedIndex === index ? <Check size={14} /> : <Copy size={14} />}
                                {copiedIndex === index ? 'Copiado' : 'Copiar'}
                            </button>

                            <span className={`font-mono font-bold text-right ${item.highlight ? 'text-electricBlue text-2xl' : 'text-white'}`}>
                                {item.value}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
