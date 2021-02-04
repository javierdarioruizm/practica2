/////////// Recogemos todos los elementos que vamos a pintar en pantalla ///////////

let section = document.querySelector('section');


/////////// Función para pintar en pantalla una tarea ///////////

const pintarUnaTarea = function (pTarea) {

    let divRow = document.createElement('div');
    divRow.classList.add('row');

    let divTarea = document.createElement('div');
    divTarea.classList.add(`${pTarea.prioridad}`);
    divTarea.classList.add('tarea');
    divTarea.classList.add('col-10');

    divTarea.innerHTML = `${pTarea.titulo}`

    let divEliminar = document.createElement('div');
    divEliminar.classList.add('eliminar');
    divEliminar.classList.add('col-2');
    divEliminar.id = `${pTarea.idTarea}`;

    divEliminar.innerText = "Eliminar";

    divRow.appendChild(divTarea);
    divRow.appendChild(divEliminar);

    section.appendChild(divRow);

    // Añadimos la acción de borrar al hacer click sobre el botón Eliminar

    divEliminar.addEventListener('click', borrarTarea);

}


/////////// Función para pintar todas las tareas del array ///////////


const pintarTareas = function (pListaTareas) {

    section.innerHTML = ""; // vaciamos la lista de la sección tareas
    pListaTareas.forEach(tarea => pintarUnaTarea(tarea));

}