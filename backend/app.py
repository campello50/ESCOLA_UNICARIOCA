from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

# Mock databases
students = [
    {"id": 1, "name": "Ana Silva", "grade": 10},
    {"id": 2, "name": "João Santos", "grade": 11},
    {"id": 3, "name": "Maria Oliveira", "grade": 9},
]

events = [
    {
        "id": 1,
        "name": "Feira de Ciências",
        "date": (datetime.now() + timedelta(days=7)).isoformat(),
        "description": "Apresentação de projetos científicos dos alunos.",
        "registered": 0
    },
    {
        "id": 2,
        "name": "Torneio de Esportes",
        "date": (datetime.now() + timedelta(days=14)).isoformat(),
        "description": "Competições esportivas entre as turmas.",
        "registered": 0
    }
]

assignments = [
    {
        "id": 1,
        "title": "Redação sobre o Meio Ambiente",
        "description": "Escreva uma redação de 500 palavras sobre a importância da preservação ambiental.",
        "due_date": (datetime.now() + timedelta(days=7)).isoformat(),
        "submissions": []
    },
    {
        "id": 2,
        "title": "Resolução de Problemas de Matemática",
        "description": "Resolva os problemas 1-10 da página 45 do livro didático.",
        "due_date": (datetime.now() + timedelta(days=3)).isoformat(),
        "submissions": []
    }
]

# Diretório de Pesquisa dos Estudantes
@app.route('/api/students', methods=['GET'])
def search_students():
    search_term = request.args.get('search', '').lower()
    filtered_students = [
        student for student in students
        if search_term in student['name'].lower()
    ]
    return jsonify(filtered_students)

# Calendário do Evento
# GET (Listar) - Lista todos os eventos
@app.route('/api/events', methods=['GET'])
def get_events():
    return jsonify(events)

# POST (Registrar) - Registrar-se para um evento
@app.route('/api/events/<int:event_id>/register', methods=['POST'])
def register_for_event(event_id):
    event = next((e for e in events if e['id'] == event_id), None)
    if event:
        event['registrado'] += 1
        return jsonify({"message": "Registrado"}), 200
    return jsonify({"message": "Evento nao encontrado"}), 404


# GET /projects/:id (Ver detalhes) - Vê detalhes para um evento específico
@app.route('/api/events/<int:event_id>', methods=['GET'])
def get_event_details(event_id):
    event = next((e for e in events if e['id'] == event_id), None)
    if event:
        return jsonify(event), 200
    return jsonify({"message": "Evento nao encontrado"}), 404

# DELETE - Deleta um evento
@app.route('/api/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    global events
    event = next((e for e in events if e['id'] == event_id), None)
    if event:
        events = [e for e in events if e['id'] != event_id]
        return jsonify({"message": "Evento deletado"}), 200
    return jsonify({"message": "Evento nao encontrado"}), 404

# PUT - Atualiza um evento
@app.route('/api/events/<int:event_id>', methods=['PUT'])
def update_event(event_id):
    event = next((e for e in events if e['id'] == event_id), None)
    if event:
        data = request.json
        event.update({
            "name": data.get('name', event['name']),
            "date": data.get('date', event['date']),
            "description": data.get('description', event['description'])
        })
        return jsonify({"message": "Evento atualizado", "event": event}), 200
    return jsonify({"message": "Evento nao encontrado"}), 404

# Envio de Tarefas
@app.route('/api/assignments', methods=['GET'])
def get_assignments():
    return jsonify(assignments)

@app.route('/api/assignments/<int:assignment_id>/submit', methods=['POST'])
def submit_assignment(assignment_id):
    assignment = next((a for a in assignments if a['id'] == assignment_id), None)
    if assignment:
        content = request.json.get('content')
        if content:
            assignment['submissions'].append({
                "id": len(assignment['submissions']) + 1,
                "content": content,
                "submitted_at": datetime.now().isoformat()
            })
            return jsonify({"message": "Homework submitted successfully"}), 200
        return jsonify({"message": "No content provided"}), 400
    return jsonify({"message": "Assignment not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)