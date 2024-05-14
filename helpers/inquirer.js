
const inquirer = require('inquirer');

require('colors');


const preguntas = [

    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name:`${ '1'.green.bold} Ver cantidad de registros del archivo `
            },

            {
                value: '2',
                name:`${ '2'.green.bold} Obtener TOKEN `
            },

            {
                value: '3',
                name:`${ '3'.green.bold} Generar archivo JSON `
            },

            {
                value: '4',
                name:`${ '4'.green.bold} CLIENTES: Listado de clientes `
            },

            {
                value: '5',
                name:`${ '5'.green.bold} CLIENTES: Importar vía API `
            },

            {
                value: '6',
                name:`${ '6'.green.bold} Agregar funcionalidad `
            },

            {
                value: '7',
                name:`${ '7'.green.bold} Agregar funcionalidad `
            },

            {
                value: '8',
                name:`${ '8'.green.bold} PROVEEDORES: Listado de proveedores `
            },

            {
                value: '0',
                name:`${ '0'.red.bold} ${'SALIR'.red.bold} `
            },
        ]
    }
];



const inquirerMenu = async () => {

    console.clear();
    console.log('============================='.cyan);
    console.log('|  Seleccione una opción    |'.cyan);
    console.log('=============================\n'.cyan);

   const {opcion} = await inquirer.prompt(preguntas);
   return opcion;
}

const pausa = async () => {

    const question = [

        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'ENTER'.green } para continuar`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
}

const leerInput  = async ( message ) => {

    const question = [

        {
            type: 'input',
            name: 'desc',
            message,
            validate ( value ) {
                if (value.length === 0){

                    return ` ${ 'ERROR!'.red} Por favor ingrese un valor  `;

                }
                return true;

            }
        }

    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}


const listadoTareasBorrar = async (tareas = [] ) =>{

    //MAP = Retorna un arreglo transformando los hijos

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;
        
        return{
            value: tarea.id,
            name: `${ idx }  ${tarea.desc}`,
            
            
        }

    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    });

    const preguntas = [
        
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }

    ]

    const {id} = await inquirer.prompt(preguntas);

    return id;

}

const confirmar = async (message) => {

    const question =[

        {
            type: 'confirm',
            name: 'ok',
            message
        }

    ];

    const { ok } = await inquirer.prompt(question);

    return ok;
}

const mostrarListadoCheckList = async (tareas = [] ) =>{

    //MAP = Retorna un arreglo transformando los hijos

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;
        
        return{
            value: tarea.id,
            name: `${ idx }  ${tarea.desc}`,
            checked: ( tarea.completadoEn ) ? true : false
            
        }

    });


    const pregunta = [
        
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }

    ]

    const { ids } = await inquirer.prompt(pregunta);

    return ids;

}



module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}