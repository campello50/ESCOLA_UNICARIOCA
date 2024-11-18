import React from 'react';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold">Central do Brasil</a>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/sobre" className="hover:underline">Sobre</a></li>
              <li><a href="/academico" className="hover:underline">Acadêmico</a></li>
              <li><a href="/esportes" className="hover:underline">Esportes</a></li>
              <li><a href="/contato" className="hover:underline">Contato</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}