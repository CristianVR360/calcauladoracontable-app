import React, { useState } from 'react';
import { ResultCard } from './ResultCard';
import { useAccounting } from '../hooks/useAccounting';

const formatCurrency = (val) =>
    new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    }).format(val || 0);

export function HonorariosCalculator() {
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('liquido'); // 'liquido' or 'bruto'
    const { calculateHonorarios, honorariosResult, RETENTION_RATES } = useAccounting();

    // Fixed year logic to 2026 based on requirements
    const year = 2026;
    const rateLabel = (RETENTION_RATES[year] * 100).toFixed(2) + '%';

    const handleAmountChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        setAmount(rawValue);
    };

    const displayAmount = amount ? new Intl.NumberFormat('es-CL').format(amount) : '';

    const handleCalculate = (e) => {
        e.preventDefault();
        calculateHonorarios(amount, type, year);
    };

    const results = honorariosResult
        ? [
            { label: 'Calculado para el año', value: year, rawValue: year },
            { label: 'Bruto', value: formatCurrency(honorariosResult.bruto), rawValue: Math.round(honorariosResult.bruto) },
            { label: `Retención (${rateLabel})`, value: formatCurrency(honorariosResult.retencion), rawValue: Math.round(honorariosResult.retencion) },
            { label: 'Líquido a Recibir', value: formatCurrency(honorariosResult.liquido), rawValue: Math.round(honorariosResult.liquido), highlight: true },
        ]
        : null;

    return (
        <section id="honorarios" className="flex flex-col items-center w-full pb-20">
            <div className="w-full max-w-md px-4">
                <h2 className="text-2xl font-bold mb-6 text-white tracking-wide">
                    Boleta de Honorarios
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
                            className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all ${type === 'liquido' ? 'bg-electricBlue text-[#0b0f19] shadow-lg shadow-electricBlue/20' : 'text-gray-400 hover:text-white'
                                }`}
                            onClick={() => setType('liquido')}
                        >
                            Quiero líquido
                        </button>
                        <button
                            type="button"
                            className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all ${type === 'bruto' ? 'bg-electricBlue text-[#0b0f19] shadow-lg shadow-electricBlue/20' : 'text-gray-400 hover:text-white'
                                }`}
                            onClick={() => setType('bruto')}
                        >
                            Monto Bruto
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-electricBlue text-[#0b0f19] font-bold py-4 rounded-xl text-lg hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all"
                    >
                        Calcular
                    </button>
                </form>

                <ResultCard title="Desglose" items={results} />
            </div>
        </section>
    );
}
