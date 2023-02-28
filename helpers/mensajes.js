require('colors');

const mostrarMenu = () => {

    return new Promise(resolve => {
        console.clear();
        console.log('======================');
        console.log(' Seleccion una opcion ');
        console.log('======================');

        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea`);
        console.log(`${'6.'.green} Borrar tarea`);
        console.log(`${'0.'.green} Salir`);

        const readline = require('readline').createInterface({
            input:process.stdin,
            output:process.stdout
        });

        readline.question('Seleccion una opcion: ',(opt) =>{
            //console.log({opt});
            readline.close();
            resolve(opt);
        });
        });

    
}

const pausa = () =>{
    return new Promise(resolve =>{
        const readline = require('readline').createInterface({
            input:process.stdin,
            output:process.stdout
        });
    
        readline.question(`Presiona ${ 'ENTER'.green } para continuar`,(opt) =>{
            readline.close();
            resolve();
        });
    });
}

module.exports = {
    mostrarMenu,
    pausa
}