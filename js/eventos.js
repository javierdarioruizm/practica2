/////////// Pintar todas la tareas al inicio ///////////

pintarTareas(listaTareas);


/////////// Introducir una nueva tarea ///////////

// Primero capturamos los elementos del HTML

let introTarea = document.querySelector('#intarea');
let selecPrioridad = document.querySelector('#inprioridad');
let guardar = document.querySelector('button');
let nuevoId = listaTareas.length;

// Ahora asociamos al evento click la función de introducir la nueva tarea

guardar.addEventListener('click', obtenerTarea);

function obtenerTarea(event) {

    event.preventDefault();

    // Si no hay ninguna tarea, se muestra la fila de "No hay tareas pendientes" pero queremos borrarla cuando introduzcamos una nueva tarea. Así que comprobamos que el array esté vacío y limpiamos el contenido de la sección.

    if (listaTareas.length == 0) {
        section.innerHTML = "";
    }

    let nuevoNombreTarea = introTarea.value;
    let nuevaPrioridad = selecPrioridad.value;

    pintarAlerta('off');

    if (nuevoNombreTarea != "" && nuevaPrioridad != "") {

        const nuevaTarea = {
            idTarea: ++nuevoId,
            titulo: nuevoNombreTarea,
            prioridad: nuevaPrioridad,
        }

        guardarTarea(nuevaTarea);

    } else {

        pintarAlerta('campovacio');
        setTimeout(() => pintarAlerta('off'), 1500);

    }

}


/////////// Mostrar tareas filtradas por prioridad ///////////


let buscarPorPrioridad = document.querySelector('#buscarprioridad');

// vamos a mostrar diferentes prioridades cuando cambiemos la opción del selector

// Filtro por tipo de prioridad

buscarPorPrioridad.addEventListener('change', obtenerPrioridad);

function obtenerPrioridad(event) {

    pintarAlerta('off');

    let prioridad = event.target.value;

    listaPorCategoria = filtrarPorPrioridad(prioridad, listaTareas);


    if (prioridad != "" && listaPorCategoria.length != 0) {

        pintarTareas(listaPorCategoria);

    } else if (prioridad != "" && listaPorCategoria.length == 0) {

        pintarNoTareas();

    } else {

        pintarTareas(listaTareas);
    }

}



/////////// Mostrar tareas filtradas por nombre ///////////


// Capturamos el input

let introNombreTarea = document.querySelector('#buscartarea');


// Asignamos el evento al input

introNombreTarea.addEventListener('input', obtenerNombre);

function obtenerNombre(event) {

    pintarAlerta('off');

    let tareaBuscar = introNombreTarea.value;

    let listaTareaBuscada = filtrarPorNombre(tareaBuscar, listaTareas);

    if (listaTareaBuscada.length == 0) {
        pintarNoTareas();
        pintarAlerta('notarea');
        setTimeout(() => pintarAlerta('off'), 1500);
    } else {
        pintarTareas(listaTareaBuscada);
    }


}



/////////// Borrar tareas del array y de la pantalla ///////////


function borrarTarea(event) {

    pintarAlerta('off');

    // capturamos el id de la tarea que quiero borrar

    let id = parseInt(event.target.id);

    // Primero borramos la fila de la tarea que quiero borrar del HTML

    let divRow = event.target.parentNode;
    // el divRow es el elemento que quiero borrar y es el padre del divEliminar

    divRow.parentNode.removeChild(divRow);
    // aquí borramos la fila del HTML


    // Ahora para borrar del array tengo que tener la posición del elemento. Para encontrarla utilizamos el identidicador id de cada elemento del array.

    let posicion = listaTareas.findIndex(tarea => tarea.idTarea === id);

    // usamos un splice para borrar el elemento del array
    // el primer parametro es la posición desde la que quiero borrar y el segundo parámetro indica el número de elementos que quiero borrar

    listaTareas.splice(posicion, 1);

    // Ahora pintamos la fila de "No hay tareas pendientes" si el array de tareas está vacío o si la lista filtrada por tipo o nombre de tarea está vacía.

    let prioridadBuscada = buscarPorPrioridad.value;

    listaPorPrioridad = filtrarPorPrioridad(prioridadBuscada, listaTareas);

    let tareaBuscada = introNombreTarea.value;

    let listaPorNombre = filtrarPorNombre(tareaBuscada, listaTareas);


    if (listaTareas.length == 0) {
        pintarNoTareas();
    } else if (prioridadBuscada != "" && listaPorPrioridad.length == 0) {
        pintarNoTareas();
    } else if (listaPorNombre.length == 0) {
        pintarNoTareas();
    }
}

