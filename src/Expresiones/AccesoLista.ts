import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";

export class AccesoLista extends Expresion{
    
    nombre  : string;
    pos  : Expresion;

    constructor(nombre :string, pos:Expresion, linea :number, columna :number){
        super(linea, columna);
        this.nombre = nombre;
        this.pos = pos;
    }

    public getValor(actual: Ambito, global: Ambito, ast: AST) {
        let lista = actual.getLista(this.nombre);
        let valor_var = lista.getObjetoId(this.pos.getValor(actual,global,ast));
        console.log(valor_var);
        this.tipo = lista.getTipo();
        return valor_var;
    }
}