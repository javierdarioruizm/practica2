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
