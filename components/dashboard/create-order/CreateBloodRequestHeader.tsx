import React from 'react';

export default function CreateBloodRequestHeader() {
  return (
    <div className="mb-12">
      <span className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-primary mb-2 block">
        Logística Clínica
      </span>
      <h2 className="text-5xl font-extrabold tracking-tight leading-tight">
        Criar Pedido de Sangue
      </h2>
      <p className="text-secondary mt-4 max-w-2xl text-lg">
        Inicie uma requisição formal para unidades de sangue. Certifique-se de que todos os dados clínicos estejam corretos para a prioridade de triagem.
      </p>
    </div>
  );
}