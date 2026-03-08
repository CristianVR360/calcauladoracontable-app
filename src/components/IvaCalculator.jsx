import React, { useState } from 'react';
import { ResultCard } from './ResultCard';
import { useAccounting } from '../hooks/useAccounting';

const formatCurrency = (val) =>
    new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    }).format(val || 0);

export function IvaCalculator() {
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('neto'); // 'neto' or 'bruto'
    const { calculateIva, ivaResult } = useAccounting();

    const handleAmountChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        setAmount(rawValue);
    };

    const displayAmount = amount ? new Intl.NumberFormat('es-CL').format(amount) : '';

    const handleCalculate = (e) => {
        e.preventDefault();
        calculateIva(amount, type);
    };

    const results = ivaResult
        ? [
            { label: 'Neto', value: formatCurrency(ivaResult.neto), rawValue: Math.round(ivaResult.neto) },
            { label: 'IVA (19%)', value: formatCurrency(ivaResult.iva), rawValue: Math.round(ivaResult.iva) },
            { label: 'Bruto (Total)', value: formatCurrency(ivaResult.total), rawValue: Math.round(ivaResult.total), highlight: true },
        ]
        : null;

    return (
        <div className="flex flex-col items-center w-full pb-20">
            <div className="w-full max-w-md px-4">
                <h2 className="text-2xl font-bold mb-6 text-white tracking-wide flex items-center gap-2">
                    Calculadora de IVA
                </h2>
                <form onSubmit={handleCalculate} className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-400 text-left uppercase tracking-wider">
                            Monto en Pesos (CLP)
                        </label>
                        <input
                            type="text"
                            inputMode="numeric"
                            className="w-full bg-cardBackground border border-border text-white px-4 py-4 rounded-xl text-xl outline-none focus:border-electricBlue focus:ring-1 focus:ring-electricBlue transition-all shadow-inner"
                            placeholder="0"
                            value={displayAmount}
                            onChange={handleAmountChange}
                        />
                    </div>

                    <div className="flex bg-cardBackground rounded-xl p-1 border border-border">
                        <button
                            type="button"
                            className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all ${type === 'neto' ? 'bg-electricBlue text-[#0b0f19] shadow-lg shadow-electricBlue/20' : 'text-gray-400 hover:text-white'
                                }`}
                            onClick={() => setType('neto')}
                        >
                            Agregar IVA (+19%)
                        </button>
                        <button
                            type="button"
                            className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all ${type === 'bruto' ? 'bg-electricBlue text-[#0b0f19] shadow-lg shadow-electricBlue/20' : 'text-gray-400 hover:text-white'
                                }`}
                            onClick={() => setType('bruto')}
                        >
                            Extraer IVA (-19%)
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-electricBlue text-[#0b0f19] font-bold py-4 rounded-xl text-lg hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all"
                    >
                        Calcular
                    </button>
                </form>

                <ResultCard title="Resultados" items={results} />
            </div>
        </div>
    );
}
