export class Error{
    tipo: string;
    descripcion: string;
    linea: string;
    columna: string;

    constructor(tipo:string, descripcion:string, linea:string, columna:string){
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = linea; 
        this.columna = columna;
    }
}