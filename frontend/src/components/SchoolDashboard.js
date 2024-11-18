import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SchoolDashboard() {
  // State for Student Directory
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);

  // Estado para o Calendário de Eventos
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedEvent, setEditedEvent] = useState({});

  // State for Homework Submission
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submission, setSubmission] = useState('');

  useEffect(() => {
    fetchEvents();
    fetchAssignments();
  }, []);

  // Funções do diretório de estudantes
  const searchStudents = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/students?search=${searchTerm}`);
      setStudents(response.data);
    } catch (error) {
      console.error('Erro em buscar estudantes:', error);
    }
  };

  // Event Calendar functions
  // GET (Listar) - Busca os eventos
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Erro em buscar eventos:', error);
    }
  };

 // POST (Registrar) - Registrar-se para um evento
  const registerForEvent = async (eventId) => {
    try {
      await axios.post(`http://localhost:5000/api/events/${eventId}/register`);
      fetchEvents();
    } catch (error) {
      console.error('Erro em registrar-se para um evento:', error);
    }
  };

// GET /projects/:id (Ver detalhes) - Busca detalhes de um evento específico
  const fetchEventDetails = async (eventId) => {
       try {
         const response = await axios.get(`http://localhost:5000/api/events/${eventId}`);
         setSelectedEvent(response.data);
       } catch (error) {
         console.error('Erro em buscar detalhes do evento:', error);
       }
     };

  const deleteEvent = async (eventId) => {
      if (window.confirm('Tem certeza que quer deletar este evento?')) {
        try {
          await axios.delete(`http://localhost:5000/api/events/${eventId}`);
          alert('Evento deletado');
          fetchEvents();
          setSelectedEvent(null);
        } catch (error) {
          console.error('Erro em deletar:', error);
        }
      }
    };

  const updateEvent = async () => {
      try {
        const response = await axios.put(`http://localhost:5000/api/events/${editedEvent.id}`, editedEvent);
        alert(response.data.message);
        setSelectedEvent(response.data.event);
        setEditMode(false);
        fetchEvents();
      } catch (error) {
        console.error('Erro em atualizar evento:', error);
      }
    };

  const handleEditChange = (e) => {
      setEditedEvent({ ...editedEvent, [e.target.name]: e.target.value });
    };

  // Homework Submission functions
  const fetchAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/assignments');
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const submitHomework = async () => {
    try {
      await axios.post(`http://localhost:5000/api/assignments/${selectedAssignment.id}/submit`, { content: submission });
      alert('Tarefa enviada com sucesso!');
      setSubmission('');
      setSelectedAssignment(null);
      fetchAssignments();
    } catch (error) {
      console.error('Error submitting homework:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Painel da Escola Central do Brasil</h1>

      {/* Student Directory */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Diretório de Estudantes</h2>
        <div className="flex mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-2 border rounded-l"
            placeholder="Pesquisar estudantes..."
          />
          <button
            onClick={searchStudents}
            className="bg-blue-500 text-white p-2 rounded-r"
          >
            Pesquisar
          </button>
        </div>
        <ul className="space-y-2">
          {students.map((student) => (
            <li key={student.id} className="border p-2 rounded">
              {student.name} - {student.grade}ª série
            </li>
          ))}
        </ul>
      </section>

      {/* Event Calendar */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Calendário de Eventos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Próximos Eventos</h3>
            <ul className="space-y-2">
              {events.map((event) => (
                <li
                  key={event.id}
                  className="border p-2 rounded cursor-pointer hover:bg-gray-100"
                  onClick={() => fetchEventDetails(event.id)}
                >
                  {event.name} - {new Date(event.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
          <div>
            {selectedEvent && !editMode && (
                          <div className="border p-4 rounded">
                            <h3 className="text-xl font-semibold mb-2">{selectedEvent.name}</h3>
                            <p className="mb-2">{new Date(selectedEvent.date).toLocaleString()}</p>
                            <p className="mb-4">{selectedEvent.description}</p>
                            <p className="mb-4">Registered: {selectedEvent.registered}</p>
                            <div className="space-x-2">
                              <button
                                onClick={() => registerForEvent(selectedEvent.id)}
                                className="bg-blue-500 text-white p-2 rounded"
                              >
                                Registrar-se
                              </button>
                              <button
                                onClick={() => setEditMode(true)}
                                className="bg-yellow-500 text-white p-2 rounded"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteEvent(selectedEvent.id)}
                                className="bg-red-500 text-white p-2 rounded"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                        {editMode && (
                          <div className="border p-4 rounded">
                            <h3 className="text-xl font-semibold mb-2">Edit Event</h3>
                            <input
                              type="text"
                              name="name"
                              value={editedEvent.name}
                              onChange={handleEditChange}
                              className="w-full p-2 mb-2 border rounded"
                            />
                            <input
                              type="datetime-local"
                              name="date"
                              value={editedEvent.date.slice(0, 16)}
                              onChange={handleEditChange}
                              className="w-full p-2 mb-2 border rounded"
                            />
                            <textarea
                              name="description"
                              value={editedEvent.description}
                              onChange={handleEditChange}
                              className="w-full p-2 mb-2 border rounded"
                              rows="3"
                            ></textarea>
                            <div className="space-x-2">
                              <button
                                onClick={updateEvent}
                                className="bg-green-500 text-white p-2 rounded"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditMode(false)}
                                className="bg-gray-500 text-white p-2 rounded"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
      </section>

      {/* Homework Submission */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Sistema de Envio de Tarefas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Tarefas Pendentes</h3>
            <ul className="space-y-2">
              {assignments.map((assignment) => (
                <li
                  key={assignment.id}
                  className="border p-2 rounded cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedAssignment(assignment)}
                >
                  {assignment.title} - Prazo: {new Date(assignment.due_date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
          <div>
            {selectedAssignment && (
              <div className="border p-4 rounded">
                <h3 className="text-xl font-semibold mb-2">{selectedAssignment.title}</h3>
                <p className="mb-2">Prazo: {new Date(selectedAssignment.due_date).toLocaleString()}</p>
                <p className="mb-4">{selectedAssignment.description}</p>
                <textarea
                  value={submission}
                  onChange={(e) => setSubmission(e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                  rows="4"
                  placeholder="Digite sua resposta aqui..."
                ></textarea>
                <button
                  onClick={submitHomework}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Enviar Tarefa
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}