import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Instruccion } from "../Entorno/Instruccion";
import { Tipo } from "../Entorno/Simbolos/Tipo";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Arreglo } from "../Entorno/Simbolos/Arreglo";
import { Expresion } from "../Entorno/Expresion";

export class DeclararArreglo extends Instruccion{
    

    tipo:   Tipo;
    ctipo:   Tipo;
    id:     string;
    objetos: Expresion[]; 
    tam:    number;

    constructor(tipo: Tipo, id: string,ctipo: Tipo,objetos: Expresion[], tam:number ,linea: number, columna: number) {
        super(linea, columna);
        this.tipo = tipo;
        this.id = id;
        this.ctipo = ctipo;
        this.objetos=objetos;
        this.tam=tam;
    }

    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        
        // Verificar que no exista variable
        console.log(actual.existeArreglo(this.id));
        if( actual.existeArreglo(this.id) ) {
            // * ERROR *
            throw new Error("Arreglo ya se encuentra definida en el entorno actual: " + this.linea + " , " + this.columna);
        }
        if(this.ctipo == undefined){
            if(this.tipo.getPrimitivo() === TipoPrimitivo.Integer){
                let array: Expresion[] = [];
                for(let i = 0; i<this.objetos.length; i++) {
                    if((thiNumber.isIntegers.objetos[i].getValor(actual, global, ast))){
                        array[i]=this.objetos[i].getValor(actual, global, ast);
                        console.log(array[i]);  
                    }else{
                        throw new Error("Datos del arreglo no coinciden con el tipo de vecto definido" + this.linea + " , " + this.columna);
                    }
                }
                let nuevo_arr=new Arreglo(this.tipo,this.id,this.ctipo,array);
                actual.insertarArreglo(this.id,nuevo_arr);    
            }else if(this.tipo.getPrimitivo() === TipoPrimitivo.Double){
                let array: Expresion[] = [];
                for(let i = 0; i<this.objetos.length; i++) {
                    if(Number.isInteger(this.objetos[i].getValor(actual, global, ast)) && typeof this.objetos[i].getValor(actual, global, ast) === 'string'){
                        throw new Error("Datos del arreglo no coinciden con el tipo de vecto definido" + this.linea + " , " + this.columna);
                    }else{
                        array[i]=this.objetos[i].getValor(actual, global, ast);
                        console.log(array[i]);      
                    }
                }
                let nuevo_arr=new Arreglo(this.tipo,this.id,this.ctipo,array);
                actual.insertarArreglo(this.id,nuevo_arr);
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
            }
        }else if(this.ctipo.getPrimitivo()===this.tipo.getPrimitivo()){
            console.log(this.tam);
            let array: Expresion[] =  new Array(this.tam);
            let nuevo_arr=new Arreglo(this.tipo,this.id,this.ctipo,array);
            actual.insertarArreglo(this.id,nuevo_arr);
        }else if(this.ctipo!=this.tipo && this.ctipo!=undefined){
            throw new Error("Arreglo mal definido en el entorno actual: " + this.linea + " , " + this.columna);
        }

    }
}