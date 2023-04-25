import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { Nodo } from "../Entorno/Nodo";
import { Return } from "./Return";
import { If } from "./If";
import { ReturnPR } from "../Expresiones/ReturnPR";

export class For extends Instruccion {

    inicializador: Instruccion;
    condicion: Expresion;
    actualizacion: Instruccion;
    sentencias: Nodo[];

    constructor(inicializador: Instruccion, condicion: Expresion, actualizacion: Instruccion, sentencias: Nodo[], linea: number, columna: number) {
        super(linea, columna);
        this.inicializador = inicializador;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.sentencias = sentencias;
    }

    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        let ambito_local = new Ambito(actual);
        this.inicializador.ejecutar(ambito_local, global, ast);
        let a,b;
        while (this.condicion.getValor(ambito_local, global, ast)) {
            for (let sentencia of this.sentencias) {
                if (sentencia instanceof Instruccion) {
                    b=sentencia.ejecutar(ambito_local, global, ast);
                    if (sentencia instanceof If){
                        if(b=="return"){
                            return;
                        }
                        if(b!=undefined){
                            return b;
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
            this.actualizacion.ejecutar(ambito_local, global, ast);
        }
    }
}