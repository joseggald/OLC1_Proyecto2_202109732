
import { DeclararVariable } from "../../Instrucciones/DeclararVariable";
import { Nodo } from "../Nodo";
import { Tipo } from "./Tipo";

export class Funcion {

    nombre:         string;
    tipo:           Tipo;
    cantParam:     number;
    idParam:        string[];
    sentencias:     Nodo[];
    declaraciones:DeclararVariable [];
    constructor(tipo: Tipo,nombre: string, cantParam:number, idParam:string[], sentencias: Nodo[], declaraciones:DeclararVariable[]) {
        this.nombre = nombre;
        this.tipo=tipo;
        this.cantParam = cantParam;
        this.idParam = idParam;
        this.sentencias = sentencias;
        this.declaraciones = declaraciones;
    }

    public getNombre(): string {
        return this.nombre;
    }
    
    public getIdParam(pos:number){
        return this.idParam[pos];
    }

    public getTipo(): Tipo {
        return this.tipo;
    }

    public getCantParam(): number {
        return this.cantParam;
    }

    public getSetencias(): Nodo[] {
        return this.sentencias;
    }

}