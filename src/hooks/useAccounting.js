import { useState, useCallback } from 'react';

const IVA_RATE = 0.19;

// Retention rates per year in Chile
const RETENTION_RATES = {
    2024: 0.1375,
    2025: 0.145,
    2026: 0.1525,
    2027: 0.16,
    2028: 0.17
};

export function useAccounting() {
    const [ivaResult, setIvaResult] = useState(null);
    const [honorariosResult, setHonorariosResult] = useState(null);

    const calculateIva = useCallback((amount, type) => {
        // type can be 'neto' or 'bruto'
        const value = parseFloat(amount) || 0;

        if (value === 0) {
            setIvaResult(null);
            return;
        }

        if (type === 'neto') {
            const iva = value * IVA_RATE;
            const total = value + iva;
            setIvaResult({ neto: value, iva, total });
        } else {
            const neto = value / (1 + IVA_RATE);
            const iva = value - neto;
            setIvaResult({ neto, iva, total: value });
        }
    }, []);

    const calculateHonorarios = useCallback((amount, type, year = 2026) => {
        // type can be 'liquido' or 'bruto'
        const value = parseFloat(amount) || 0;
        const rate = RETENTION_RATES[year] || 0.1525; // Default 2026

        if (value === 0) {
            setHonorariosResult(null);
            return;
        }

        if (type === 'bruto') {
            const retencion = value * rate;
            const liquido = value - retencion;
            setHonorariosResult({ bruto: value, retencion, liquido, rate });
        } else {
            // type === 'liquido'
            // liquido = bruto - (bruto * rate) = bruto * (1 - rate)
            // bruto = liquido / (1 - rate)
            const bruto = value / (1 - rate);
            const retencion = bruto - value;
            setHonorariosResult({ bruto, retencion, liquido: value, rate });
        }
    }, []);

    return {
        calculateIva,
        ivaResult,
        calculateHonorarios,
        honorariosResult,
        RETENTION_RATES
    };
}
