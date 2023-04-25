import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { Nodo } from "../Entorno/Nodo";
import { ReturnPR } from "../Expresiones/ReturnPR";
import { If } from "./If";
import { Return } from "./Return";

export class While extends Instruccion{
    
    exp: Expresion;
    sentencias : Nodo[];

    constructor(exp: Expresion, sentencias : Nodo[],linea: number, columna: number){
        super(linea, columna);
        this.exp = exp;
        this.sentencias = sentencias;
    }

    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
       let val_cond = this.exp.getValor(actual, global, ast);
       let a;
       let ambito_local = new Ambito(actual);
       while(val_cond) 
       {
            for(let sentencia of this.sentencias){
                if(sentencia instanceof Instruccion) {
                    a=sentencia.ejecutar(ambito_local, global, ast);
                    if (sentencia instanceof Return){
                        return;
                    }
                    if (sentencia instanceof If){
                        if(a=="return"){
                            console.log("return while")
                            return;
                        }      
                    }
                }
                if(sentencia instanceof Expresion){
                    a=sentencia.getValor(actual, global, ast);
                    if(sentencia instanceof ReturnPR){
                        if(a=="return"){
                            return;
                        }
                        if(a!=undefined){
                            return a;
                        } 
                    }    
                }  
            }
            val_cond = this.exp.getValor(actual, global, ast);
       }
    }

}