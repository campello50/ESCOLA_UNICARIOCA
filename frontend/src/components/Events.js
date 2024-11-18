import React from 'react';

export default function Events() {
  const events = [
    { id: 1, date: "15 Mai", title: "Feira de Ciências", location: "Ginásio" },
    { id: 2, date: "22 Mai", title: "Campeonato de Basquete", location: "Complexo Esportivo" },
    { id: 3, date: "1 Jun", title: "Concerto de Inverno", location: "Auditório" },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Próximos Eventos</h2>
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="flex items-center">
            <div className="bg-blue-500 text-white font-semibold p-2 rounded mr-4 text-center">
              <div>{event.date.split(' ')[0]}</div>
              <div>{event.date.split(' ')[1]}</div>
            </div>
            <div>
              <h3 className="font-semibold">{event.title}</h3>
              <p>{event.location}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}