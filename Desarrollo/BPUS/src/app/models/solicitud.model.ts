/*
* Proyecto: BPUS
* Componente: /models/solicitud.ts
* Desarrollador: Cristian Julián Andrade Murillo
* Descripción: modelo de la solicitud con los atributos
* Última modificación: 06/08/2019
*/

export class Solicitud {

    constructor(
        public tipoModalidad: string,
        public tituloProyecto: string,
        public estudiante1?: string,
        public estudiante2?: string,
        public estudiante3?: string,
        public consejero1?: string,
        public consejero2?: string,
        public consejero3?: string,
        public jefePrograma?: string,
        public anteproyecto?: string,
        public proyecto?: string,
        public articulo?: string,
        public _id?: string
    ) {
    }
}
