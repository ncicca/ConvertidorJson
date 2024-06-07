
const inquirer = require('inquirer');

require('colors');


const preguntas = [

    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        pageSize:20,
        choices: [
            {
                value: '1',
                name:`${ '1'.green.bold} Clientes » `
            },

            {
                value: '2',
                name:`${ '2'.green.bold} Proveedores » `
            },

            {
                value: '3',
                name:`${ '3'.green.bold} Comprobantes » `
            },

            {
                value: '4',
                name:`${ '4'.green.bold} VACIO `
            },

            {
                value: '5',
                name:`${ '5'.green.bold} VACIO `
            },

            {
                value: '6',
                name:`${ '6'.green.bold} VACIO `
            },

            {
                value: '7',
                name:`${ '7'.green.bold} JSON `
            },

            {
                value: '8',
                name:`${ '8'.green.bold} TOKEN `
            },

            {
                value: '0',
                name:`${ '0'.red} ${'SALIR'.red.bold} `
            },
        ]
    }
];



const inquirerMenu = async () => {

    console.clear();
    console.log('============================='.green);
    console.log('|  Seleccione una opción    |'.green);
    console.log('=============================\n'.green);

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

const preguntasSubMenuClientes = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Seleccione una opción del submenú:',
        choices: [
            {
                value: '1',
                name: `${'■.'.green} Listar Clientes`
            },
            {
                value: '2',
                name: `${'■.'.green} Listar Clientes por ID`
            },
            {
                value: '3',
                name: `${'■.'.green} Importar Clientes`
            },
            {
                value: '4',
                name: `${'■.'.green} Leer cantidad de registros del Excel`
            },
            {
                value: '0',
                name: `${'0.'.red} Salir del submenú`
            }
        ]
    }
];

const inquirerSubMenuClientes = async () => {
    console.clear();
    console.log('============================='.green);
    console.log('   Seleccione una subopción   '.white);
    console.log('=============================\n'.green);

    const { opcion } = await inquirer.prompt(preguntasSubMenuClientes);
    return opcion;
};


const preguntasSubMenuProveedores = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Seleccione una opción del submenú:',
        choices: [
            {
                value: '1',
                name: `${'■.'.green} Listar Proveedores`
            },
            {
                value: '2',
                name: `${'■.'.green} Listar Proveedores por ID`
            },
            {
                value: '3',
                name: `${'■.'.green} Importar Proveedores`
            },
            {
                value: '4',
                name: `${'■.'.green} Leer cantidad de registros del Excel`
            },
            {
                value: '0',
                name: `${'0.'.red} Salir del submenú`
            }
        ]
    }
];

const inquirerSubMenuProveedores = async () => {
    console.clear();
    console.log('============================='.green);
    console.log('   Seleccione una subopción   '.white);
    console.log('=============================\n'.green);

    const { opcion } = await inquirer.prompt(preguntasSubMenuProveedores);
    return opcion;
};



const preguntasSubMenuComprobantes = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Seleccione una opción del submenú:',
        choices: [
            {
                value: '1',
                name: `${'■.'.green} Listar Proveedores`
            },
            {
                value: '2',
                name: `${'■.'.green} Listar Proveedores por ID`
            },
            {
                value: '3',
                name: `${'■.'.green} Importar Proveedores`
            },
            {
                value: '4',
                name: `${'■.'.green} Leer cantidad de registros del Excel`
            },
            {
                value: '0',
                name: `${'0.'.red} Salir del submenú`
            }
        ]
    }
];

const inquirerSubMenuComprobantes = async () => {
    console.clear();
    console.log('============================='.green);
    console.log('   Seleccione una subopción   '.white);
    console.log('=============================\n'.green);

    const { opcion } = await inquirer.prompt(preguntasSubMenuComprobantes);
    return opcion;
};




module.exports = {
    inquirerMenu,
    inquirerSubMenuClientes,
    inquirerSubMenuProveedores,
    inquirerSubMenuComprobantes,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}