import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { Tipo } from "../Entorno/Simbolos/Tipo";
import { TipoPrimitivo } from '../Entorno/Simbolos/TipoPrimitivo';
import { If } from "../Instrucciones/If";
import { ReturnPR } from "./ReturnPR";

export class LlamadaFuncion extends Expresion {
    
    nombre  : string;
    lista_exp   : Expresion[];

    constructor(nombre :string, lista_exp :Expresion[], linea :number, columna :number){
        super(linea, columna);
        this.nombre = nombre;
        this.lista_exp = lista_exp;
    }

    public getValor(actual: Ambito, global: Ambito, ast: AST) {
       
        let a;
        if(actual.existeFuncion(this.nombre)) {
            console.log("existe");
            let actual_func= actual.getFuncion(this.nombre)
            
            if(actual_func.tipo.getPrimitivo()==TipoPrimitivo.Void){   
                if(actual_func.getCantParam()==0){
                    let sentencias=actual_func.getSetencias();
                    for(let sentencia of sentencias){ 
                        if(sentencia instanceof Instruccion) {
                            a=sentencia.ejecutar(actual, global, ast);
                        }
                        if(sentencia instanceof Expresion) sentencia.getValor(actual, global, ast);   
                    }            
                }else{
                    console.log(this.lista_exp.length+" ******** "+actual_func.idParam.length);

                    if(this.lista_exp.length==actual_func.idParam.length){
                        for(let i=0; i<this.lista_exp.length; i++){

                            let variable = actual.getVariable(actual_func.idParam[i]);
                            if(variable.getTipo().getPrimitivo()==TipoPrimitivo.Integer){
                                if(Number.isInteger(this.lista_exp[i].getValor(actual,global,ast))){
                                    variable.asignarValor(this.lista_exp[i].getValor(actual,global,ast))
                                }else{
                                    throw new Error("Los parametros mandados no son del mismo tipo.");
                                }
                            }
                            if(variable.getTipo().getPrimitivo()==TipoPrimitivo.Double){
                                if( typeof this.lista_exp[i].getValor(actual,global,ast) === "number" && !Number.isInteger(this.lista_exp[i].getValor(actual,global,ast))){
                                    variable.asignarValor(this.lista_exp[i].getValor(actual,global,ast))
                                }else{
                                    throw new Error("Los parametros mandados no son del mismo tipo.");
                                }
                            }
                            if(variable.getTipo().getPrimitivo()==TipoPrimitivo.String){
                                if( typeof this.lista_exp[i].getValor(actual,global,ast) === "string" ){
                                    variable.asignarValor(this.lista_exp[i].getValor(actual,global,ast))
                                }else{
                                    throw new Error("Los parametros mandados no son del mismo tipo.");
                                }
                            }
                            if(variable.getTipo().getPrimitivo()==TipoPrimitivo.Char){
                                if( typeof this.lista_exp[i].getValor(actual,global,ast) === "string" ){
                                    variable.asignarValor(this.lista_exp[i].getValor(actual,global,ast))
                                }else{
                                    throw new Error("Los parametros mandados no son del mismo tipo.");
                                }
                            }
                            if(variable.getTipo().getPrimitivo()==TipoPrimitivo.Boolean){
                                if( typeof this.lista_exp[i].getValor(actual,global,ast) === "boolean" ){
                                    variable.asignarValor(this.lista_exp[i].getValor(actual,global,ast))
                                }else{
                                    throw new Error("Los parametros mandados no son del mismo tipo.");
                                }
                            }
                        }
                        let sentencias=actual_func.getSetencias();
                        for(let sentencia of sentencias){ 
                            if(sentencia instanceof Instruccion) {
                                a=sentencia.ejecutar(actual, global, ast);
                            }
                            if(sentencia instanceof Expresion) sentencia.getValor(actual, global, ast);   
                        } 
                    }else{
                        throw new Error("ERROR => Los parametro mandados no encajan con la dimension de la funcion");
                    }
                    
                }
            }
            if(actual_func.tipo.getPrimitivo()==TipoPrimitivo.Integer){
                if(actual_func.getCantParam()==0){
                    let sentencias=actual_func.getSetencias();
                    for(let sentencia of sentencias){ 
                        if(sentencia instanceof Instruccion) {
                            let b;
                            a=sentencia.ejecutar(actual, global, ast);
                        }
                        if(sentencia instanceof Expresion){
                            a=sentencia.getValor(actual, global, ast);
                            if(sentencia instanceof ReturnPR){
                                if (a=="return"){
                                    let tipoData=new Tipo(TipoPrimitivo.Integer);
                                    this.tipo=tipoData;
                                    return;
                                }else{
                                    let tipoData=new Tipo(TipoPrimitivo.Integer);
                                    this.tipo=tipoData;
                                    return a;
                                }
                                
                            }
                        }    
                    }            
                }else{
                    if(this.lista_exp.length==actual_func.idParam.length){
                        for(let i=0; i<this.lista_exp.length; i++){
                            let variable = actual.getVariable(actual_func.idParam[i]);
                            if(variable.getTipo().getPrimitivo()==TipoPrimitivo.Integer){
                                if(Number.isInteger(this.lista_exp[i].getValor(actual,global,ast))){
                                    variable.asignarValor(this.lista_exp[i].getValor(actual,global,ast))
                                }else{
                                    throw new Error("Los parametros mandados no son del mismo tipo.");
                                }
                            }
                        }
                        let sentencias=actual_func.getSetencias();
                        for(let sentencia of sentencias){ 
                            if(sentencia instanceof Instruccion) {
                                let s=sentencia.ejecutar(actual, global, ast);
                                if(s=="return"){
                                    return;
                                }  
                                if(s!=undefined){
                                    return s;
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
                    }else{
                        throw new Error("ERROR => Los parametro mandados no encajan con la dimension de la funcion");
                    }
                    
                }    
            }
        }              
    }

}