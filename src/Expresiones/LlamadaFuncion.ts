import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";
import { Tipo } from "../Entorno/Simbolos/Tipo";
import { TipoPrimitivo } from '../Entorno/Simbolos/TipoPrimitivo';
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
        let ambito = new Ambito(actual)
        if(global.existeFuncion(this.nombre)) {
            let actual_func= global.getFuncion(this.nombre)
            if(actual_func.tipo.getPrimitivo()==TipoPrimitivo.Void){   
                if(actual_func.getCantParam()==0){
                    let sentencias=actual_func.getSetencias();
                    for(let sentencia of sentencias){ 
                        if (sentencia instanceof Instruccion) {
                            let s=sentencia.ejecutar(actual, global, ast); 
                            if (s!=undefined) {
                                if(s=="return"){
                                    return;
                                }else{
                                    let tipoData=new Tipo(TipoPrimitivo.Integer);
                                    this.tipo=tipoData;
                                    return s;
                                }
                            } 
                                     
                        }
                        if(sentencia instanceof Expresion){
                            let a=sentencia.getValor(actual, global, ast);  
                            if(sentencia instanceof ReturnPR){
                                if(a=="return"){
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
                            actual_func.declaraciones[i].ejecutar(ambito,global,ast);
                            let variable = ambito.getVariable(actual_func.idParam[i]);
                            if(variable.getTipo().getPrimitivo()==TipoPrimitivo.Integer){
                                if(Number.isInteger(this.lista_exp[i].getValor(actual,global,ast))){
                                    variable.asignarValor(this.lista_exp[i].getValor(actual,global,ast))
                                }else{
                                    throw new Error("Los parametros mandados no son del mismo tipo."+this.columna+"  INT  "+this.linea);
                                }
                            }
                            if(variable.getTipo().getPrimitivo()==TipoPrimitivo.Double){
                                variable.asignarValor(this.lista_exp[i].getValor(actual,global,ast))
                            }
                            if(variable.getTipo().getPrimitivo()==TipoPrimitivo.String){
                                if( typeof this.lista_exp[i].getValor(actual,global,ast) === "string" ){
                                    variable.asignarValor(this.lista_exp[i].getValor(actual,global,ast))
                                }else{
                                    throw new Error("Los parametros mandados no son del mismo tipo."+this.columna+"  STRING  "+this.linea);
                                }
                            }
                            if(variable.getTipo().getPrimitivo()==TipoPrimitivo.Char){
                                if( typeof this.lista_exp[i].getValor(actual,global,ast) === "string" ){
                                    variable.asignarValor(this.lista_exp[i].getValor(actual,global,ast))
                                }else{
                                    throw new Error("Los parametros mandados no son del mismo tipo."+this.columna+"  CHAR  "+this.linea);
                                }
                            }
                            if(variable.getTipo().getPrimitivo()==TipoPrimitivo.Boolean){
                                if( typeof this.lista_exp[i].getValor(actual,global,ast) === "boolean" ){
                                    variable.asignarValor(this.lista_exp[i].getValor(actual,global,ast))
                                }else{
                                    throw new Error("Los parametros mandados no son del mismo tipo."+this.columna+"  BOOL  "+this.linea);
                                }
                            }
                        }

                        let sentencias=actual_func.getSetencias();
                        for(let sentencia of sentencias){ 
                            if (sentencia instanceof Instruccion) {
                                let s=sentencia.ejecutar(ambito, global, ast); 
                                if (s!=undefined) {
                                    if(s=="return"){
                                        return;
                                    }
                                }        
                            }
                            if(sentencia instanceof Expresion){
                                let a=sentencia.getValor(ambito, global, ast);  
                                if(a=="return"){
                                    return;
                                }
                               
                            } 
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
                            let s=sentencia.ejecutar(ambito, global, ast); 
                                if (s!=undefined) {
                                    if(s=="return"){
                                        let tipoData=new Tipo(TipoPrimitivo.Integer);
                                        this.tipo=tipoData;
                                        return;
                                    }else if(Number.isInteger(s)){
                                        let tipoData=new Tipo(TipoPrimitivo.Integer);
                                        this.tipo=tipoData;
                                        return s;
                                    }
                                } 
                        }
                        if(sentencia instanceof Expresion){
                            a=sentencia.getValor(ambito, global, ast);
                            if(sentencia instanceof ReturnPR){
                                if (a=="return"){
                                    let tipoData=new Tipo(TipoPrimitivo.Integer);
                                    this.tipo=tipoData;
                                    return;
                                }else if(Number.isInteger(a)){
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
                            actual_func.declaraciones[i].ejecutar(ambito,global,ast);
                            let variable = ambito.getVariable(actual_func.idParam[i]);
                            if(variable.getTipo().getPrimitivo()==TipoPrimitivo.Integer){
                                if(Number.isInteger(this.lista_exp[i].getValor(actual,global,ast))){
                                    console.log(this.lista_exp[i].getValor(actual,global,ast))
                                    variable.asignarValor(this.lista_exp[i].getValor(actual,global,ast))
                                }else{
                                    throw new Error("Los parametros mandados no son del mismo tipo."+this.columna+"  INT  "+this.linea);
                                }
                            }
                        }    
                        let sentencias=actual_func.getSetencias();
                        for(let sentencia of sentencias){ 
                            if(sentencia instanceof Instruccion) {
                                let s=sentencia.ejecutar(ambito, global, ast); 
                                if (s!=undefined) {
                                    if(s=="return"){
                                        return;
                                    }else if(Number.isInteger(s)){
                                        let tipoData=new Tipo(TipoPrimitivo.Integer);
                                        this.tipo=tipoData;
                                        return s;
                                    } 
                                } 
                            }
                            if(sentencia instanceof Expresion){
                                let a=sentencia.getValor(ambito, global, ast);
                                if(sentencia instanceof ReturnPR){
                                    if (a=="return"){
                                        let tipoData=new Tipo(TipoPrimitivo.Integer);
                                        this.tipo=tipoData;
                                        return;
                                    }else if(Number.isInteger(a)){
                                        let tipoData=new Tipo(TipoPrimitivo.Integer);
                                        this.tipo=tipoData;
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
            if(actual_func.tipo.getPrimitivo()==TipoPrimitivo.String){
                if(actual_func.getCantParam()==0){
                    let sentencias=actual_func.getSetencias();
                    for(let sentencia of sentencias){ 
                        if(sentencia instanceof Instruccion) {
                            let s=sentencia.ejecutar(ambito, global, ast); 
                                if (s!=undefined) {
                                    if(s=="return"){
                                        let tipoData=new Tipo(TipoPrimitivo.String);
                                        this.tipo=tipoData;
                                        return;
                                    }else if(Number.isInteger(s)){
                                        let tipoData=new Tipo(TipoPrimitivo.String);
                                        this.tipo=tipoData;
                                        return s;
                                    }
                                } 
                        }
                        if(sentencia instanceof Expresion){
                            a=sentencia.getValor(ambito, global, ast);
                            if(sentencia instanceof ReturnPR){
                                if (a=="return"){
                                    let tipoData=new Tipo(TipoPrimitivo.String);
                                    this.tipo=tipoData;
                                    return;
                                }else if(Number.isInteger(a)){
                                    let tipoData=new Tipo(TipoPrimitivo.String);
                                    this.tipo=tipoData;
                                    return a;
                                } 
                            }
                        }    
                    }            
                }else{
                    if(this.lista_exp.length==actual_func.idParam.length){
                        for(let i=0; i<this.lista_exp.length; i++){
                            actual_func.declaraciones[i].ejecutar(ambito,global,ast);
                            let variable = ambito.getVariable(actual_func.idParam[i]);
                            if(variable.getTipo().getPrimitivo()==TipoPrimitivo.String){
                                if(typeof(this.lista_exp[i].getValor(actual,global,ast))=="string"){
                                    variable.asignarValor(this.lista_exp[i].getValor(actual,global,ast))
                                }else{
                                    throw new Error("Los parametros mandados no son del mismo tipo."+this.columna+" "+this.linea);
                                }
                            }
                        }    
                        let sentencias=actual_func.getSetencias();
                        for(let sentencia of sentencias){ 
                            if(sentencia instanceof Instruccion) {
                                let s=sentencia.ejecutar(ambito, global, ast); 
                                if (s!=undefined) {
                                    if(s=="return"){
                                        return;
                                    }else if(typeof(s)=="string"){
                                        let tipoData=new Tipo(TipoPrimitivo.String);
                                        this.tipo=tipoData;
                                        return s;
                                    } 
                                } 
                            }
                            if(sentencia instanceof Expresion){
                                a=sentencia.getValor(ambito, global, ast);
                                if(sentencia instanceof ReturnPR){
                                    if (a=="return"){
                                        let tipoData=new Tipo(TipoPrimitivo.String);
                                        this.tipo=tipoData;
                                        return;
                                    }else if(typeof(a)=="string"){
                                        let tipoData=new Tipo(TipoPrimitivo.String);
                                        this.tipo=tipoData;
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
            if(actual_func.tipo.getPrimitivo()==TipoPrimitivo.Char){
                if(actual_func.getCantParam()==0){
                    let sentencias=actual_func.getSetencias();
                    for(let sentencia of sentencias){ 
                        if(sentencia instanceof Instruccion) {
                            let s=sentencia.ejecutar(ambito, global, ast); 
                                if (s!=undefined) {
                                    if(s=="return"){
                                        let tipoData=new Tipo(TipoPrimitivo.Char);
                                        this.tipo=tipoData;
                                        return;
                                    }else if(typeof(s)=="string" &&  s.length == 1){
                                        let tipoData=new Tipo(TipoPrimitivo.Char);
                                        this.tipo=tipoData;
                                        return s;
                                    }
                                } 
                        }
                        if(sentencia instanceof Expresion){
                            a=sentencia.getValor(ambito, global, ast);
                            if(sentencia instanceof ReturnPR){
                                if (a=="return"){
                                    let tipoData=new Tipo(TipoPrimitivo.Char);
                                    this.tipo=tipoData;
                                    return;
                                }else if(typeof(a)=="string" &&  a.length == 1){
                                    let tipoData=new Tipo(TipoPrimitivo.Char);
                                    this.tipo=tipoData;
                                    return a;
                                } 
                            }
                        }    
                    }            
                }else{
                    if(this.lista_exp.length==actual_func.idParam.length){
                        for(let i=0; i<this.lista_exp.length; i++){
                            actual_func.declaraciones[i].ejecutar(ambito,global,ast);
                            let variable = ambito.getVariable(actual_func.idParam[i]);
                            let pr=this.lista_exp[i].getValor(actual,global,ast)
                            if(variable.getTipo().getPrimitivo()==TipoPrimitivo.Char){
                                if(typeof(this.lista_exp[i].getValor(actual,global,ast))=="string" && pr.length==1){
                                    variable.asignarValor(this.lista_exp[i].getValor(actual,global,ast))
                                }else{
                                    throw new Error("Los parametros mandados no son del mismo tipo."+this.columna+" "+this.linea);
                                }
                            }
                        }    
                        let sentencias=actual_func.getSetencias();
                        for(let sentencia of sentencias){ 
                            if(sentencia instanceof Instruccion) {
                                let s;
                                if(sentencia instanceof LlamadaFuncion){
                                    s=sentencia.ejecutar(global, global, ast);
                                }else{
                                    s=sentencia.ejecutar(ambito, global, ast);
                                }

                                if (s!=undefined) {
                                    if(s=="return"){
                                        return; 
                                    }else if(typeof(s)=="string" &&  s.length == 1){
                                        let tipoData=new Tipo(TipoPrimitivo.Char);
                                        this.tipo=tipoData;
                                        return s;
                                    } 
                                } 
                            }
                            if(sentencia instanceof Expresion){
                                a=sentencia.getValor(ambito, global, ast);
                                if(sentencia instanceof ReturnPR){
                                    if (a=="return"){
                                        let tipoData=new Tipo(TipoPrimitivo.Char);
                                        this.tipo=tipoData;
                                        return;
                                    }else if(typeof(a)=="string" &&  a.length == 1){
                                        let tipoData=new Tipo(TipoPrimitivo.Char);
                                        this.tipo=tipoData;
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
            if(actual_func.tipo.getPrimitivo()==TipoPrimitivo.Boolean){
                if(actual_func.getCantParam()==0){
                    let sentencias=actual_func.getSetencias();
                    for(let sentencia of sentencias){ 
                        if(sentencia instanceof Instruccion) {
                            let s=sentencia.ejecutar(ambito, global, ast); 
                                if (s!=undefined) {
                                    if(s=="return"){
                                        let tipoData=new Tipo(TipoPrimitivo.Boolean);
                                        this.tipo=tipoData;
                                        return;
                                    }else if(typeof(s)=="boolean"){
                                        let tipoData=new Tipo(TipoPrimitivo.Boolean);
                                        this.tipo=tipoData;
                                        return s;
                                    }
                                } 
                        }
                        if(sentencia instanceof Expresion){
                            a=sentencia.getValor(ambito, global, ast);
                            if(sentencia instanceof ReturnPR){
                                if (a=="return"){
                                    let tipoData=new Tipo(TipoPrimitivo.Boolean);
                                    this.tipo=tipoData;
                                    return;
                                }else if(typeof(a)=="boolean"){
                                    let tipoData=new Tipo(TipoPrimitivo.Boolean);
                                    this.tipo=tipoData;
                                    return a;
                                } 
                            }
                        }    
                    }            
                }else{
                    if(this.lista_exp.length==actual_func.idParam.length){
                        for(let i=0; i<this.lista_exp.length; i++){
                            actual_func.declaraciones[i].ejecutar(ambito,global,ast);
                            let variable = ambito.getVariable(actual_func.idParam[i]);
                            let pr=this.lista_exp[i].getValor(actual,global,ast)
                            if(variable.getTipo().getPrimitivo()==TipoPrimitivo.Boolean){
                                if(typeof(this.lista_exp[i].getValor(actual,global,ast))=="boolean"){
                                    variable.asignarValor(this.lista_exp[i].getValor(actual,global,ast))
                                }else{
                                    throw new Error("Los parametros mandados no son del mismo tipo."+this.columna+" "+this.linea);
                                }
                            }
                        }    
                        let sentencias=actual_func.getSetencias();
                        for(let sentencia of sentencias){ 
                            if(sentencia instanceof Instruccion) {
                                let s=sentencia.ejecutar(ambito, global, ast); 
                                if (s!=undefined) {
                                    if(s=="return"){
                                        return; 
                                    }else if(typeof(s)=="boolean"){
                                        let tipoData=new Tipo(TipoPrimitivo.Boolean);
                                        this.tipo=tipoData;
                                        return s;
                                    } 
                                } 
                            }
                            if(sentencia instanceof Expresion){
                                a=sentencia.getValor(ambito, global, ast);
                                if(sentencia instanceof ReturnPR){
                                    if (a=="return"){
                                        let tipoData=new Tipo(TipoPrimitivo.Boolean);
                                        this.tipo=tipoData;
                                        return;
                                    }else if(typeof(a)=="boolean"){
                                        let tipoData=new Tipo(TipoPrimitivo.Boolean);
                                        this.tipo=tipoData;
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
            if(actual_func.tipo.getPrimitivo()==TipoPrimitivo.Double){
                if(actual_func.getCantParam()==0){
                    let sentencias=actual_func.getSetencias();
                    for(let sentencia of sentencias){ 
                        if(sentencia instanceof Instruccion) {
                            let s=sentencia.ejecutar(ambito, global, ast); 
                                if (s!=undefined) {
                                    if(s=="return"){
                                        return;
                                    }else if(typeof s === "number"){
                                        let tipoData=new Tipo(TipoPrimitivo.Double);
                                        this.tipo=tipoData;
                                        return s;
                                    }
                                } 
                        }
                        if(sentencia instanceof Expresion){
                            a=sentencia.getValor(ambito, global, ast);
                            if(sentencia instanceof ReturnPR){
                                if(a=="return"){
                                    return;
                                }else if(typeof a === "number"){
                                    let tipoData=new Tipo(TipoPrimitivo.Double);
                                    this.tipo=tipoData;
                                    return a;
                                } 
                            }
                        }    
                    }            
                }else{
                    if(this.lista_exp.length==actual_func.idParam.length){
                        for(let i=0; i<this.lista_exp.length; i++){
                            actual_func.declaraciones[i].ejecutar(ambito,global,ast);
                            let variable = ambito.getVariable(actual_func.idParam[i]);
                            if(variable.getTipo().getPrimitivo()==TipoPrimitivo.Double){
                                if(typeof this.lista_exp[i].getValor(actual,global,ast) === "number"){
                                    variable.asignarValor(this.lista_exp[i].getValor(actual,global,ast))
                                }else{
                                    throw new Error("Los parametros mandados no son del mismo tipo."+this.columna+"   "+this.linea);
                                }
                            }
                        }    
                        let sentencias=actual_func.getSetencias();
                        for(let sentencia of sentencias){ 
                            if(sentencia instanceof Instruccion) {
                                let s=sentencia.ejecutar(ambito, global, ast); 
                                if (s!=undefined) {
                                    if(s=="return"){
                                        return;
                                    }else if(typeof s === "number"){
                                        let tipoData=new Tipo(TipoPrimitivo.Double);
                                        this.tipo=tipoData;
                                        return s;
                                    }
                                } 
                            }
                            if(sentencia instanceof Expresion){
                                a=sentencia.getValor(ambito, global, ast);
                                if(sentencia instanceof ReturnPR){
                                    if(a=="return"){
                                        return;
                                    }else if(typeof a === "number"){
                                        let tipoData=new Tipo(TipoPrimitivo.Double);
                                        this.tipo=tipoData;
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