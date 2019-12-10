/*
* Proyecto: BPUS
* Componente: proyecto.model.ts
* Desarrollador: Cristian Julián Andrade Murillo
* Descripción: modelo del proyecto con los atributos
* Última modificación: 06/08/2019
*/

export class Proyecto {

    constructor(
        public tema: string,
        public palabraClave1: string,
        public palabraClave2: string,
        public palabraClave3: string,
        public rutaArticulo: string,
        public estado?: boolean,
        public _id?: string
    ) {
    }
}
