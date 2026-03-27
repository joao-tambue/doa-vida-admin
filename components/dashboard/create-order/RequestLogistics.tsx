'use client';

import React, { useState } from 'react';

export default function RequestLogisticsSection() {
  const [selectedBloodType, setSelectedBloodType] = useState('A+');
  const [units, setUnits] = useState(2);
  const [urgency, setUrgency] = useState<'normal' | 'critico'>('critico');

  const bloodTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

  const handleIncrement = () => setUnits((prev) => prev + 1);
  const handleDecrement = () => setUnits((prev) => Math.max(1, prev - 1));

  return (
    <section className="bg-surface-container-lowest p-8 rounded-xl space-y-8">
      <div className="flex items-center gap-3 border-l-4 border-primary pl-4">
        <h3 className="text-xl font-bold">Logística do Pedido</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tipo Sanguíneo */}
        <div className="space-y-2">
          <label className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-secondary block">
            Tipo Sanguíneo
          </label>
          <div className="grid grid-cols-4 gap-2">
            {bloodTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedBloodType(type)}
                className={`py-2 text-xs font-bold border border-outline-variant/30 rounded-lg transition-all ${
                  selectedBloodType === type
                    ? 'bg-primary text-on-primary'
                    : 'hover:bg-primary hover:text-on-primary'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Unidades Necessárias */}
        <div className="space-y-2">
          <label className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-secondary block">
            Unidades Necessárias
          </label>
          <div className="flex items-center bg-surface rounded-lg p-2">
            <button
              onClick={handleDecrement}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors"
            >
              <span className="material-symbols-outlined">remove</span>
            </button>
            <input
              type="number"
              value={units}
              onChange={(e) => setUnits(Math.max(1, Number(e.target.value)))}
              className="w-full bg-transparent border-none text-center font-bold focus:ring-0 text-sm"
            />
            <button
              onClick={handleIncrement}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>

        {/* Nível de Urgência */}
        <div className="space-y-2">
          <label className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-secondary block">
            Nível de Urgência
          </label>
          <div className="flex flex-col gap-2">
            {/* Normal */}
            <label
              className={`flex items-center gap-3 p-3 bg-surface rounded-lg cursor-pointer hover:bg-surface-container-high transition-all ${
                urgency === 'normal' ? 'ring-2 ring-primary' : ''
              }`}
            >
              <input
                type="radio"
                name="urgency"
                checked={urgency === 'normal'}
                onChange={() => setUrgency('normal')}
                className="text-primary focus:ring-primary accent-primary"
              />
              <span className="text-xs font-bold">Normal</span>
            </label>

            {/* Crítico */}
            <label
              className={`flex items-center gap-3 p-3 bg-error-container/20 border border-error/10 rounded-lg cursor-pointer hover:bg-error-container/30 transition-all ${
                urgency === 'critico' ? 'ring-2 ring-error' : ''
              }`}
            >
              <input
                type="radio"
                name="urgency"
                checked={urgency === 'critico'}
                onChange={() => setUrgency('critico')}
                className="text-error focus:ring-error accent-error"
              />
              <span className="text-xs font-bold text-on-error-container">Crítico (Triagem)</span>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}