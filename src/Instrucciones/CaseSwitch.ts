import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { Nodo } from "../Entorno/Nodo";
import { ReturnPR } from "../Expresiones/ReturnPR";

export class CaseSwitch extends Instruccion {

    condition: Expresion;
    sentencias: Nodo[];

    constructor( condition: Expresion, sentencias: Nodo[], linea: number, columna: number) {
        super(linea, columna);
        this.condition = condition;
        this.sentencias = sentencias;
    }

    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        let ambito_local = new Ambito(actual);
        for (let sentencia of this.sentencias) {
            if (sentencia instanceof Instruccion){
                let s=sentencia.ejecutar(ambito_local, global, ast);
                if (s!=undefined) {
                    if(s=="return"){
                        return "return";
                    }else if(s=="break"){
                        return;
                    }else if(s=="continue"){
                        console.log("continue while")
                        continue;
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
                if (a!=undefined) {
                    if(a=="continue"){
                        console.log("continue while")
                        continue;
                    }else if(a=="break"){
                        return;
                    }
                }          
            }
        }
    }
    public getCondition(actual: Ambito, global: Ambito, ast: AST){
        return this.condition;
    }
}