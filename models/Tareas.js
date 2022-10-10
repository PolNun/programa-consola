const Tarea = require("./Tarea");

class Tareas {
    listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this.listado).forEach(key => {
            const tarea = this.listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this.listado = {};
    }

    cargarTareasDesdeArray(tareas = []) {
        tareas.forEach(tarea => {
            this.listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc)
        this.listado[tarea.id] = tarea;
    }

    listadoCompletado() {
        this.listadoArr.forEach((tarea, i) => {
            console.log()
            const index = `${i + 1}`;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${index} ${desc} :: ${estado}`);
        });
    }

    listarPendientesCompletadas(completadas) {
        console.log()
        let contador = 0;
        this.listadoArr.forEach(tarea => {
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            if (completadas) {
                if (completadoEn) {
                    contador++;
                    console.log(`${contador.toString().green} ${desc} :: ${completadoEn.blue}`);
                }
            } else {
                if (!completadoEn) {
                    contador++;
                    console.log(`${contador.toString().green} ${desc} :: ${estado}`);
                }
            }
        });
    }

    borrarTarea(id) {
        if (this.listado[id]) {
            delete this.listado[id];
        }
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this.listado[id];
            if (!tarea.completadoEn) tarea.completadoEn = new Date().toISOString();
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this.listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;