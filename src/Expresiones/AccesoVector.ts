import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";

export class AccesoVector extends Expresion{
    
    nombre  : string;
    pos  : Expresion;

    constructor(nombre :string, pos:Expresion, linea :number, columna :number){
        super(linea, columna);
        this.nombre = nombre;
        this.pos = pos;
    }

    public getValor(actual: Ambito, global: Ambito, ast: AST) {
        let vector = actual.getVector(this.nombre);
        let valor_var = vector.getObjetoId(this.pos.getValor(global,global,ast));
        this.tipo = vector.getTipo();
        return valor_var;
    }
}