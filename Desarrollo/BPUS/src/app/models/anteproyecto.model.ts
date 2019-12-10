/*
* Proyecto: BPUS
* Componente: proyecto.model.ts
* Desarrollador: Cristian Julián Andrade Murillo
* Descripción: modelo del anteproyecto con los atributos
* Última modificación: 06/08/2019
*/

export class AnteProyecto {

    constructor(
        public rutaAnteproyecto: string,
        public estado?: boolean,
        public _id?: string
    ) {
    }
}
