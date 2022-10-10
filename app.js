require('colors');
const {
    inquireMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer');

const Tareas = require("./models/Tareas");
const {guardarDB, leerDB} = require("./helpers/guardarArchivo");

console.clear();

const main = async () => {
    let opcion = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasDesdeArray(tareasDB);
    }

    do {
        // imprimir el menú
        opcion = await inquireMenu();

        // dependiendo de la opción elegida del menú, hacer:
        switch (opcion) {
            case '1': // Crear tarea
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
                break;
            case '2': // Listar tareas
                tareas.listadoCompletado();
                break;
            case '3': // Listar tareas completadas
                tareas.listarPendientesCompletadas(true);
                break;
            case '4': // Listar tareas pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case '5': // Completar tarea(s)
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6': // Borrar tarea
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('¿Está seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada'.blue);
                    }
                }
                break;
            // case 0: // Salir
            //     break;
        }

        guardarDB(tareas.listadoArr);

        // hace una pausa para esperar decisión del usuario
        await pausa();

    } while (opcion !== '0');
}

main();