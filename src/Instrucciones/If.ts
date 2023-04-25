import exp from "constants";
import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { Nodo } from "../Entorno/Nodo";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Return } from "./Return";
import { ReturnPR } from "../Expresiones/ReturnPR";
import { LlamadaFuncion } from "../Expresiones/LlamadaFuncion";
export class If extends Instruccion {
    
    exp_condicion   : Expresion;
    sentencias      : Nodo[];
    sentencias_else : Nodo[];

    constructor(exp_condicion :Expresion, sentencias :Nodo[], sentencias_else :Nodo[], linea :number, columna :number) {
        super(linea, columna);
        this.exp_condicion = exp_condicion;
        this.sentencias = sentencias;
        this.sentencias_else = sentencias_else;
    }
    
    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        // Condicion
        let condicion = this.exp_condicion.getValor(actual, global, ast);
        let ambito = new Ambito(actual);
        // Verificar tipo booleano
        if(this.exp_condicion.tipo.getPrimitivo() != TipoPrimitivo.Boolean) {
            // * ERROR * 
            return
        }

        if ( condicion ){
            let ambito_if = new Ambito(actual);
            for(let sentencia of this.sentencias){
                if (sentencia instanceof Instruccion) {
                    let s=sentencia.ejecutar(ambito_if, global, ast); 
                    if (s!=undefined){
                        if(s=="return"){
                            return "return";
                        }else{
                            return s;
                        }
                    }       
                }
                if(sentencia instanceof Expresion){
                    let a=sentencia.getValor(ambito_if, global, ast);  
                    if(sentencia instanceof ReturnPR){
                        if(a=="return"){
                            return "return";
                        }else{
                            return a;
                        }
                    }
  
                }
            }

        }else{
            let ambito_else = new Ambito(actual);
            for(let sentencia of this.sentencias_else){
                if (sentencia instanceof Instruccion) {
                    let s=sentencia.ejecutar(ambito_else, global, ast); 
                    if (s!=undefined) {
                        if(s=="return"){
                            return "return";
                        }else{
                            return s;
                        }
                    }       
                }
                if(sentencia instanceof Expresion){
                    let a=sentencia.getValor(ambito_else, global, ast);  
                    if(sentencia instanceof ReturnPR){
                        if(a=="return"){
                            return "return";
                        }else{
                            return a;
                        }
                    }
                }
            }
        }     
    }
}