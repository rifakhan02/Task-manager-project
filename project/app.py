from flask import Flask, render_template, request, jsonify

app = Flask(__name__, template_folder='templates')

# Temporary storage for tasks
tasks = []

@app.route('/')
def index():
    return render_template('index.html', tasks=tasks)

@app.route('/add_task', methods=['POST'])
def add_task():
    task_content = request.form.get('task')
    if task_content:
        tasks.append(task_content)
    return jsonify({'tasks': tasks})

@app.route('/delete_task', methods=['POST'])
def delete_task():
    task_to_delete = request.form.get('task')
    
    if task_to_delete in tasks:
        tasks.remove(task_to_delete)

    return jsonify({'tasks': tasks})



if __name__ == '__main__':
    app.run(debug=True)