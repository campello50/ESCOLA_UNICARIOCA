import React from 'react';

export default function Hero() {
  return (
    <div className="bg-blue-500 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Bem-vindo à Central do Brasil</h1>
        <p className="text-xl md:text-2xl mb-8">Capacitando os alunos a alcançar seu pleno potencial</p>
        <button className="bg-white text-blue-500 px-6 py-2 rounded-md text-lg font-semibold hover:bg-blue-100 transition-colors">
          Saiba Mais
        </button>
      </div>
    </div>
  );
}