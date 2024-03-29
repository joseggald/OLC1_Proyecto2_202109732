import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Instruccion } from "../Entorno/Instruccion";
import { Tipo } from "../Entorno/Simbolos/Tipo";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Arreglo } from "../Entorno/Simbolos/Arreglo";
import { Expresion } from "../Entorno/Expresion";
import { Tabla } from "../Tabla/Tabla";
import { Symbol } from "../Tabla/Symbol";

export class DeclararArreglo extends Instruccion{
    

    tipo:   Tipo;
    ctipo:   Tipo;
    id:     string;
    objetos: Expresion[]; 
    tam:    Expresion;

    constructor(tipo: Tipo, id: string,ctipo: Tipo,objetos: Expresion[], tam:Expresion ,linea: number, columna: number) {
        super(linea, columna);
        this.tipo = tipo;
        this.id = id;
        this.ctipo = ctipo;
        this.objetos=objetos;
        this.tam=tam;
    }
    private establecerTipo(){
        let valor = this.tipo.getPrimitivo();
    
        switch (valor) {
            case 0:
                return "Entero"
            case 1: 
                return "Double"
            case 2:
                return "Char"
            case 3: 
                return "String"
            case 4: 
                return "Null"
            case 5: 
                return "Boolean"
            case 6: 
                return "Void"
        }
    }
    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        if(this.ctipo == undefined){
            if(this.tipo.getPrimitivo() === TipoPrimitivo.Integer){
                let array: Expresion[] = [];
                for(let i = 0; i<this.objetos.length; i++) {
                    if((Number.isInteger(this.objetos[i].getValor(actual, global, ast)))){
                        array[i]=this.objetos[i].getValor(actual, global, ast);
                        console.log(array[i]);  
                    }else{
                        throw new Error("Datos del arreglo no coinciden con el tipo de vecto definido" + this.linea + " , " + this.columna);
                    }
                }
                let nuevo_arr=new Arreglo(this.tipo,this.id,this.ctipo,array);
                actual.insertarArreglo(this.id,nuevo_arr);    
                Tabla.insertarSimbolo(new Symbol(this.id, "Vector", this.establecerTipo(), (this.linea).toString(), (this.columna).toString()));
            }else if(this.tipo.getPrimitivo() === TipoPrimitivo.Double){
                let array: Expresion[] = [];
                for(let i = 0; i<this.objetos.length; i++) {
                    if(typeof this.objetos[i].getValor(actual, global, ast) === "number" && Number.isFinite(this.objetos[i].getValor(actual, global, ast))){
                        throw new Error("Datos del arreglo no coinciden con el tipo de vecto definido" + this.linea + " , " + this.columna);
                    }else{
                        array[i]=this.objetos[i].getValor(actual, global, ast);
                        console.log(array[i]);      
                    }
                }
                let nuevo_arr=new Arreglo(this.tipo,this.id,this.ctipo,array);
                actual.insertarArreglo(this.id,nuevo_arr);
                Tabla.insertarSimbolo(new Symbol(this.id, "Vector", this.establecerTipo(), (this.linea).toString(), (this.columna).toString()));
            } else if(this.tipo.getPrimitivo() === TipoPrimitivo.String) {
                let array: Expresion[] = [];
                for(let i = 0; i<this.objetos.length; i++) {
                    if(typeof this.objetos[i].getValor(actual, global, ast) === 'string'){
                        array[i]=this.objetos[i].getValor(actual, global, ast);
                        console.log(array[i]);  
                    }else{
                        throw new Error("Datos del arreglo no coinciden con el tipo de vecto definido" + this.linea + " , " + this.columna);           
                    }
                }
                let nuevo_arr=new Arreglo(this.tipo,this.id,this.ctipo,array);
                actual.insertarArreglo(this.id,nuevo_arr);
                Tabla.insertarSimbolo(new Symbol(this.id, "Vector", this.establecerTipo(), (this.linea).toString(), (this.columna).toString()));
            } else if(this.tipo.getPrimitivo() === TipoPrimitivo.Char) {
                let array: Expresion[] = [];
                let pr=""
                for(let i = 0; i<this.objetos.length; i++) {
                    pr=this.objetos[i].getValor(actual, global, ast)
                    if(typeof this.objetos[i].getValor(actual, global, ast) === 'string' &&  pr.length === 1 ){
                        array[i]=this.objetos[i].getValor(actual, global, ast);
                        console.log(array[i]);  
                    }else{
                        throw new Error("Datos del arreglo no coinciden con el tipo de vecto definido" + this.linea + " , " + this.columna);           
                    }
                }
                let nuevo_arr=new Arreglo(this.tipo,this.id,this.ctipo,array);
                actual.insertarArreglo(this.id,nuevo_arr);
                Tabla.insertarSimbolo(new Symbol(this.id, "Vector", this.establecerTipo(), (this.linea).toString(), (this.columna).toString()));
            }
        }else if(this.ctipo.getPrimitivo()===this.tipo.getPrimitivo()){
            console.log(this.tam);
            let array: Expresion[] =  new Array(this.tam.getValor(actual, global, ast));
            let nuevo_arr=new Arreglo(this.tipo,this.id,this.ctipo,array);
            actual.insertarArreglo(this.id,nuevo_arr);
            Tabla.insertarSimbolo(new Symbol(this.id, "Vector", this.establecerTipo(), (this.linea).toString(), (this.columna).toString()));
        }else if(this.ctipo!=this.tipo && this.ctipo!=undefined){
            throw new Error("Arreglo mal definido en el entorno actual: " + this.linea + " , " + this.columna);
        }

    }
}