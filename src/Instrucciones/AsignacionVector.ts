import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";

export class AsignacionVector extends Instruccion {

    id:     string;
    pos:    number;
    exp:    Expresion;

    constructor(id: string, exp: Expresion, pos:number,linea: number, columna: number) {
        
        super(linea, columna);
        this.id = id;
        this.exp = exp;
        this.pos=pos;

    }


    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        
        let variable = actual.getVector(this.id);
        if(variable === undefined) {
            // * ERROR *
            throw new Error("ERROR => No se ha definido el vector " + this.id);
        }

        let valor_asig = this.exp.getValor(actual, global, ast);
        if(variable.getTipo().getPrimitivo() != this.exp.tipo.getPrimitivo()) {
            throw new Error("ERROR => El tipo del valor asignado no corresponde al vector " + this.id);
        }

        variable.agregarValor(valor_asig,this.pos);

    }
}