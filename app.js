require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
//const { mostrarMenu,pausa } = require('./helpers/mensajes');
const { inquireMenu, pausa,leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

const main = async() =>{

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){//cargar tareas
        tareas.cargarTareasFromArray(tareasDB);
    }
    do{
        opt = await inquireMenu();

        switch(opt){
            case '1':
                //crear opcion
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
            break;
            case '2':
                console.log(tareas.listadoCompleto());
            break;
            case '3':
                console.log(tareas.listarPendientesCompletadas(true));
            break;
            case '4':
                console.log(tareas.listarPendientesCompletadas(false));
            break;
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;
            case '6': //Borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== '0'){
                    const ok = await confirmar('¿Estas seguro?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
            break;
        }
        guardarDB(tareas.listadoArr);
        await pausa();
    }while(opt !== '0');

    //pausa();
    //console.clear();
    //console.log('Hola mundo');
}

main();