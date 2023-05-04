export class Symbol{
    id: string;
    tipo: string;
    tipoVariable: string;
    linea: string;
    columna: string;

    constructor(id:string, tipo:string, tipoVariable: string, linea:string, columna:string){
        this.id = id;
        this.tipo = tipo;
        this.tipoVariable = tipoVariable;
        this.linea = linea;
        this.columna = columna;
    }
    
}