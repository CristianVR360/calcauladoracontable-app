import React from 'react';

export function AdContainer({ slotType }) {
    // slotType can be 'sticky', 'native', etc.
    const height = slotType === 'sticky' ? 'h-16' : 'h-64';
    const label = slotType === 'sticky' ? 'Ad Slot (Sticky Banner)' : 'Ad Slot (Native)';

    return (
        <div className={`w-full max-w-md mx-auto ${height} bg-[#1a2235] border border-border/50 text-gray-500 flex items-center justify-center rounded-lg my-6`}>
            <span className="text-sm uppercase tracking-wide">{label}</span>
        </div>
    );
}
