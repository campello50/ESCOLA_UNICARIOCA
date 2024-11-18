import React from 'react';

export default function Announcements() {
  const announcements = [
    { id: 1, title: "Reuniões de Pais e Mestres", content: "Agendadas para a próxima semana. Faça sua inscrição online." },
    { id: 2, title: "Férias de Inverno", content: "A escola estará fechada de 3 a 7 de julho." },
    { id: 3, title: "Cerimônia de Formatura", content: "Reserve a data: 15 de dezembro às 14h." },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Avisos</h2>
      <ul className="space-y-4">
        {announcements.map((announcement) => (
          <li key={announcement.id}>
            <h3 className="font-semibold">{announcement.title}</h3>
            <p>{announcement.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}