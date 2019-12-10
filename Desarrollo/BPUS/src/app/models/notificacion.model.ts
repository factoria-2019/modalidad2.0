/*
* Proyecto: BPUS
* Componente: notificacion.model.ts
* Desarrollador: Cristian Julián Andrade Murillo
* Descripción: modelo de la notificación con los atributos
* Última modificación: 06/08/2019
*/

export class Notificacion {

    constructor(
        public emisor: string,
        public receptor: string,
        public tipoNotificacion: string,
        public _id?: string
    ) {
    }
}
