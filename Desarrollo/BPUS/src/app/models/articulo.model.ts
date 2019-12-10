/*
* Proyecto: BPUS
* Componente: articulo.model.ts
* Desarrollador: Cristian Julián Andrade Murillo
* Descripción: modelo del artículo con los atributos
* Última modificación: 06/08/2019
*/

export class Articulo {

    constructor(
        public rutaArticulo: string,
        public estado?: boolean,
        public _id?: string
    ) {
    }
}
