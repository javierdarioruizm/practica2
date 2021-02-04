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


/////////// Función para pintar no hay tareas pendientes ///////////

const pintarNoTareas = function () {


    section.innerHTML = "";
    let divRow = document.createElement('div');
    divRow.classList.add('row');

    let divNoTarea = document.createElement('div');
    divNoTarea.classList.add('notarea');
    divNoTarea.classList.add('col-12');
    divNoTarea.innerText = "No hay tareas pendientes";

    divRow.appendChild(divNoTarea);
    section.appendChild(divRow);

}



/////////// Función para pintar alertas ///////////

const pintarAlerta = function (alerta) {

    let p1 = document.querySelector('#alertas');
    let p2 = document.querySelector('#nohaytarea');

    switch (alerta) {

        case 'campovacio':
            p1.innerText = "Debes completar todos los campos";
            p1.style.backgroundColor = "#d81333";
            p1.style.color = "white";
            break;

        case 'duplicada':
            p1.innerText = "Tarea duplicada";
            p1.style.backgroundColor = "#d81333";
            p1.style.color = "white";
            break;

        case 'tareacreada':
            p1.innerText = "Tarea creada";
            p1.style.backgroundColor = "#0a7913";
            p1.style.color = "white";
            break;

        case 'notarea':
            p2.innerText = "Tarea no existe";
            p2.style.backgroundColor = "#d81333";
            p2.style.color = "white";
            break;

        case 'off':
            p1.innerText = "";
            p1.style.backgroundColor = "lightseagreen";
            p1.style.color = "lightseagreen";
            p2.innerText = "";
            p2.style.backgroundColor = "#030444";
            p2.style.color = "#030444";
            break;

    }

}



/////////// Función para guardar una tarea ///////////

function guardarTarea(pTarea) {


    let duplicada = listaTareas.some(tarea => {
        return tarea.titulo === pTarea.titulo && tarea.prioridad === pTarea.prioridad;
    })

    if (!duplicada) {

        listaTareas.push(pTarea);
        pintarUnaTarea(pTarea);
        pintarAlerta('tareacreada');
        setTimeout(() => pintarAlerta('off'), 1500);

    } else {

        pintarAlerta('duplicada');
        setTimeout(() => pintarAlerta('off'), 1500);
    }

}


/////////// Función para filtrar tareas por prioridad ///////////

function filtrarPorPrioridad(pPrioridad, pListaTareas) {

    const listaFiltrada = pListaTareas.filter(tarea =>
        tarea.prioridad == pPrioridad)

    return listaFiltrada;
}