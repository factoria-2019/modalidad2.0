

export class Usuario{

    constructor(
        public nombres:string,
        public apellidos:string,
        public password:string,
        public email:string,
        public telefono:string,
        public tipoUsuario:string,
        public tipoID:string,
        public numDocumento:string,
        public genero:string,
        public codigoUniversitario:string,
        public sedeUniversitaria:string,
        public facultad:string,
        public programaUniversitario:string,
        public estado?:Boolean,
        public role?:string,
        public _id?: string
    ){


    }



}