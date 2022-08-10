// Aquí genero el evento enlazando el botón de Save 
document.getElementById('formTask').addEventListener('submit', saveTask);

// Aquí inicio la función que se inicializará al ejecutar el evento
function saveTask(e) {

  // Librería Toastify
  Toastify({

    // Texto de el mensaje
    text: "You have added a task",

    // Duración del mensaje
    duration: 3000,
    // Posición de dónde viene
    gravity: "top",
    // Posición
    position: "left",
    // Método capaz de mantener el texto en el sitio siempre que esté haciéndole focus con el mouse (in true) 
    stopOnFocus: true,
    // Método para aplicarle estilos CSS
    style: {
      background: "rgba(0,0,0,1)",
    },
    onClick: function () { }
  }).showToast();

  // Enlazo el input de título y descripción (su valor)
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;


  // Creo un objeto para guardar las tasks, cuales variables dentro de éste son los input con sus respectivos valores (Título y descripción)
  let task = {
    title,
    description
  };


  if (localStorage.getItem('tasks') === null) {
    // Creo un array para guardar las tasks
    let tasks = [];
    // Pusheo al array el contenido del objeto
    tasks.push(task);
    // Paso a string el contenido del array "tasks" con JSON y al mismo tiempo lo guardo en el local storage con la key "tasks"
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    // Creo una variable tasks y su contenido es el array "tasks" el cual pasé de string a su estado original cuya key en el localStorage es "tasks"
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    // Pusheo nuevamente al array el contenido del objeto
    tasks.push(task);
    // Nuevamente paso a string el contenido del array "tasks" con JSON y al mismo tiempo lo guardo en el local storage con la key "tasks"
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  // Ejecuto la función
  getTasks();
  document.getElementById('formTask').reset();
  // Utilizo el método preventDefault para cambiar los estados predeterminados del navegador
  e.preventDefault();
}

function deleteTask(title) {
  Toastify({
    // Texto de el mensaje
    text: "The task has been deleted",
    // Duración del mensaje
    duration: 3000,
    // Posición de dónde viene
    gravity: "top",
    // Posición
    position: "left",
    // Método capaz de mantener el texto en el sitio siempre que esté haciéndole focus con el mouse (in true)
    stopOnFocus: true,
    // Método para aplicarle estilos CSS
    style: {
      background: "rgba(0,0,0,1)",
    },
    onClick: function () { }
  }).showToast();
  // Creo una variable tasks y su contenido es el array "tasks" el cual pasé de string a su estado original cuya key en el localStorage es "tasks"
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  // Creo un bucle for, el cuál no terminará hasta que el número de la variable (i) sea mayor a tasks.lenght
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].title == title) {
      tasks.splice(i, 1);
    }
  }
  // Nuevamente paso a string el contenido del array "tasks" con JSON y al mismo tiempo lo guardo en el local storage con la key "tasks"
  localStorage.setItem('tasks', JSON.stringify(tasks));
  // Ejecuto la función
  getTasks();
}

function getTasks() {
  // Creo una variable tasks y su contenido es el array "tasks" el cual pasé de string a su estado original cuya key en el localStorage es "tasks"
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  // Creo una variable que hará de display, ya que su contenido será el elemento (o etiqueta) cuya id es tasks y es donde almacenaré las tareas.
  let tasksView = document.getElementById('tasks');
  tasksView.innerHTML = '';
  // Creo un bucle for, el cual crea la variable (i), para luego decir que si i es menor a tasks.lenght, i aumentará +1
  for (let i = 0; i < tasks.length; i++) {
    let title = tasks[i].title;
    let description = tasks[i].description;
    // DOM
    tasksView.innerHTML += `<div class="card mb-3 d-flex justify-content-center">
    <div class="loader"><span></span><span></span><span></span><span></span><span></span></div>
        <div class="appear-an card-body d-flex justify-content-between">
          <p class="md-4">${title} - ${description}
          <a href="#" onclick="deleteTask('${title}')" class="btn btn-primary ml-5">Delete</a>
          </p>
        </div>
      </div>`;
    // DOM
  }
}
getTasks();

