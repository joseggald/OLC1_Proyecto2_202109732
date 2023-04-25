import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { Nodo } from "../Entorno/Nodo";
import { ReturnPR } from "../Expresiones/ReturnPR";
import { Return } from "./Return";

export class DoWhile extends Instruccion {

    exp: Expresion;
    sentencias: Nodo[];

    constructor(sentencias: Nodo[], exp: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.exp = exp;
        this.sentencias = sentencias;
    }

    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        let val_cond = this.exp.getValor(actual, global, ast);
        let ambito_local = new Ambito(actual);
        let a;
        do {
            for (let sentencia of this.sentencias) {
                if (sentencia instanceof Instruccion){
                    let s=sentencia.ejecutar(ambito_local, global, ast);
                    if (s!=undefined) {
                        if(s=="return"){
                            return "return";
                        }else{
                            return s;
                        }
                    } 
                }
                if(sentencia instanceof Expresion){
                    let a=sentencia.getValor(actual, global, ast);  
                    if(sentencia instanceof ReturnPR){
                        if(a=="return"){
                            return "return";
                        }else{
                            return a;
                        }
                    }            
                }
            }
            val_cond = this.exp.getValor(actual, global, ast);
        } while (val_cond);
    }
}