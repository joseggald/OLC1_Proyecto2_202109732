import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { Nodo } from "../Entorno/Nodo";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { ReturnPR } from "../Expresiones/ReturnPR";
import { CaseSwitch } from "./CaseSwitch";

export class Switch extends Instruccion {

    exp: Expresion;
    sentencias: Nodo[];

    constructor( exp: Expresion, sentencias: Nodo[],linea: number, columna: number) {
        super(linea, columna);
        this.exp = exp;
        this.sentencias = sentencias;
    }

    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        let val = this.exp.getValor(actual, global, ast);
        let ambito_local = new Ambito(actual);
        
        if(this.exp.tipo.getPrimitivo()==TipoPrimitivo.String || this.exp.tipo.getPrimitivo()==TipoPrimitivo.Char || this.exp.tipo.getPrimitivo()==TipoPrimitivo.Integer){
            for (let sentencia of this.sentencias) {
                if (sentencia instanceof Instruccion){
                    if (sentencia instanceof CaseSwitch){
                        let s=sentencia.getCondition(actual, global, ast) 
                        console.log(s)
                        if(s==null){ 
                            sentencia.ejecutar(ambito_local, global, ast);
                            return;
                        }else if(s.getValor(actual, global, ast)==val){
                            sentencia.ejecutar(ambito_local, global, ast);   
                            return;
                        }else if(s.getValor(actual, global, ast)==true){
                            sentencia.ejecutar(ambito_local, global, ast);   
                            return;
                        }
                    }
                }
                
            }
            
        }else{
            throw new Error("Condicion no coinciden con el tipo admitido en un switch" + this.linea + " , " + this.columna);
        }
    }
}