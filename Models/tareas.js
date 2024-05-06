const Tarea = require("./tarea");


class Tareas {

    // _listado ={};

    // get listadoArr()  {

    //     const listado = [];

    //     Object.keys(this._listado).forEach(key => {
    //         const tarea = this._listado[key];
    //         listado.push( tarea );
    //     })

    //     return listado;
    // }


    // constructor() {

    //  this._listado = {};
        
    // }


    // borrarTarea ( id = '' ){

    //     if( this._listado[id] ){

    //         delete this._listado[id];
    //     }
    // }

    // cargarTareasFromArray( tareas = [] ){
     
    //     tareas.forEach(tareas =>  {

    //          tareas._listado[tarea.id] = tarea;
    //     });
    // }

    // //Uso el bucle forEach para iterar sobre el array de tareas
    // //que se pasa como parametro y agrego cada TAREA a _listado
    // //utilizando el ID como clave
    
    // cargarTareasFromArray(tareas = []) {
    //     tareas.forEach(tarea => {
    //         this._listado[tarea.id] = tarea;
    //     });
    // }

    // crearTarea(desc = '') {

    //     const tarea = new Tarea(desc);

    //     this._listado[tarea.id] = tarea;
    // } 




    // listadoCompleto() {

    //    console.log('');
    //    this.listadoArr.forEach( (tarea, indice)  => {
        

    //     const idx = `${indice + 1}`.green;
    //     const {desc, completadoEn } = tarea;

    //     const estado = ( completadoEn )
    //                         ? 'Completado'.green : 'Pendiente'.red;

    //     console.log(`${ idx } ${ desc }  ${ estado }  `);
        
     
    //    });

    // }

    // listadoPendientesCompletadas ( completadas = true ) {

    // console.log('');
    // let contador = 0 ;
    // this.listadoArr.forEach ( (tarea) => {

    
    //     const {desc, completadoEn } = tarea;
    //     const estado = ( completadoEn )
    //                         ? 'Completado'.green 
    //                         : 'Pendiente'.red;

    //     if(completadas) {

    //         if(completadoEn){
    //             //Muestro tareas completadas
    //             contador+= 1;
    //             console.log(`${ (contador + '.').green} ${ desc } :: ${ completadoEn.green }`);
    //         }

    //     } else {

    //         if( !completadoEn ){
    //             //Muestro tareas NO completadas
    //             contador += 1;
    //             console.log(`${ (contador + '.').red} ${ desc } :: ${ estado }`);
    //         }
    //     }

      
    // });

    // }


    // toggleCompletadas (ids = [] ) {

    //     ids.forEach( id => {

    //         const tarea = this._listado[id];
    //         if( !tarea.completadoEn ){

    //             tarea.completadoEn = new Date().toISOString()

    //         }

    //     });

    //     this.listadoArr.forEach( tarea => {

    //         if ( !ids.includes(tarea.id) ){

    //             this._listado[tarea.id].completadoEn = null;
               
    //         }

    //     });

    // }



}


module.exports = Tareas;
