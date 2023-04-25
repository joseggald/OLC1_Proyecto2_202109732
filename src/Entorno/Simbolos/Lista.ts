import { Expresion } from "../Expresion";
import { Tipo } from "./Tipo";

export class Lista {

    tipo:   Tipo;
    ctipo:   Tipo;
    id:     string;
    objetos:  Expresion[];

    constructor(tipo:Tipo, id:string, ctipo:Tipo, objetos:Expresion[]) {
        this.tipo   = tipo;
        this.id     = id;
        this.ctipo   = ctipo;
        this.objetos = objetos;
    }

    public getTipo(): Tipo {
        return this.tipo;
    }

    public agregarValor(valor: Expresion){
        this.objetos.push(valor);
    }

    public modificarValor(pos:number, valor: Expresion){
        this.objetos[pos] = valor;
    }

    public getObjetoId(pos:number){
        return this.objetos[pos];
    }

    public getCTipo(): Tipo {
        return this.ctipo;
    }

    public getNombre(): string {
        return this.id;
    }

    public getObjetos(): Expresion[] {
        return this.objetos;
    }
}