import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Instruccion } from "../Entorno/Instruccion";
import { Nodo } from "../Entorno/Nodo";
import { Funcion } from "../Entorno/Simbolos/Funcion";
import { Tipo } from "../Entorno/Simbolos/Tipo";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { DeclararVariable } from "./DeclararVariable";
import { Symbol } from "../Tabla/Symbol";
import { Tabla } from "../Tabla/Tabla";

export class DeclararFuncion extends Instruccion {
    
    tipo        : Tipo;
    nombre      : string;
    parametros  : DeclararVariable[];
    sentencias  : Nodo[];  

    constructor(tipo :Tipo,nombre : string, parametros : DeclararVariable[], sentencias: Nodo[], linea :number, columna :number) {
        super(linea, columna);
        this.tipo=tipo;
        this.nombre = nombre;
        this.parametros = parametros;
        this.sentencias = sentencias;
    }

    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        // Verificar que no exista variable
        if( actual.existeFuncion(this.nombre) ) {
            // * ERROR *
            throw new Error("Funcion ya se encuentra definida en el entorno actual: " + this.linea + " , " + this.columna);
        }
        if(this.tipo.getPrimitivo()==TipoPrimitivo.Integer){
            if(this.parametros.length==0){
                let nFuncion= new Funcion(this.tipo,this.nombre,0,null,this.sentencias,[])
                actual.insertarFuncion(this.nombre,nFuncion);   
                Tabla.insertarSimbolo(new Symbol(this.nombre, "Función", this.establecerTipo(), (this.linea).toString(), (this.columna).toString()));     
            }else{
                let array=[];
                for(let i = 0; i<this.parametros.length; i++){
                    if(this.parametros[i].tipo.getPrimitivo()==TipoPrimitivo.Integer){
                        array.push(this.parametros[i].id)
                    }else{
                        throw new Error("Las variables definidas no encajan con el tipo de funcion: " + this.linea + " , " + this.columna);
                    }
                }
                let nFuncion= new Funcion(this.tipo,this.nombre,this.parametros.length,array,this.sentencias,this.parametros)
                actual.insertarFuncion(this.nombre,nFuncion);
                Tabla.insertarSimbolo(new Symbol(this.nombre, "Función", this.establecerTipo(), (this.linea).toString(), (this.columna).toString()));
            }
        }
        if(this.tipo.getPrimitivo()==TipoPrimitivo.Double){
            if(this.parametros.length==0){
                let nFuncion= new Funcion(this.tipo,this.nombre,0,null,this.sentencias,[])
                actual.insertarFuncion(this.nombre,nFuncion);  
                Tabla.insertarSimbolo(new Symbol(this.nombre, "Función", this.establecerTipo(), (this.linea).toString(), (this.columna).toString()));      
            }else{
                let array=[];
                for(let i = 0; i<this.parametros.length; i++){
                    if(this.parametros[i].tipo.getPrimitivo()==TipoPrimitivo.Double){
                        console.log(this.parametros[i].id);
                        array.push(this.parametros[i].id);
                    }else{
                        throw new Error("Las variables definidas no encajan con el tipo de funcion: " + this.linea + " , " + this.columna);
                    }
                }
                let nFuncion= new Funcion(this.tipo,this.nombre,this.parametros.length,array,this.sentencias,this.parametros)
                actual.insertarFuncion(this.nombre,nFuncion);
                Tabla.insertarSimbolo(new Symbol(this.nombre, "Función", this.establecerTipo(), (this.linea).toString(), (this.columna).toString()));
            }
        }
        if(this.tipo.getPrimitivo()==TipoPrimitivo.String){
            if(this.parametros.length==0){
                let nFuncion= new Funcion(this.tipo,this.nombre,0,null,this.sentencias,[])
                actual.insertarFuncion(this.nombre,nFuncion); 
                Tabla.insertarSimbolo(new Symbol(this.nombre, "Función", this.establecerTipo(), (this.linea).toString(), (this.columna).toString()));       
            }else{
                let array=[];
                for(let i = 0; i<this.parametros.length; i++){
                    if(this.parametros[i].tipo.getPrimitivo()==TipoPrimitivo.String){
                        console.log(this.parametros[i].id);
                        array.push(this.parametros[i].id)
                    }else{
                        throw new Error("Las variables definidas no encajan con el tipo de funcion: " + this.linea + " , " + this.columna);
                    }
                }
                let nFuncion= new Funcion(this.tipo,this.nombre,this.parametros.length,array,this.sentencias,this.parametros)
                actual.insertarFuncion(this.nombre,nFuncion);

                Tabla.insertarSimbolo(new Symbol(this.nombre, "Función", this.establecerTipo(), (this.linea).toString(), (this.columna).toString()));
            }
        }
        if(this.tipo.getPrimitivo()==TipoPrimitivo.Char){
            if(this.parametros.length==0){
                let nFuncion= new Funcion(this.tipo,this.nombre,0,null,this.sentencias,[])
                actual.insertarFuncion(this.nombre,nFuncion); 
                Tabla.insertarSimbolo(new Symbol(this.nombre, "Función", this.establecerTipo(), (this.linea).toString(), (this.columna).toString()));       
            }else{
                let array=[];
                for(let i = 0; i<this.parametros.length; i++){
                    if(this.parametros[i].tipo.getPrimitivo()==TipoPrimitivo.Char){
                        console.log(this.parametros[i].id);
                        array.push(this.parametros[i].id)
                    }else{
                        throw new Error("Las variables definidas no encajan con el tipo de funcion: " + this.linea + " , " + this.columna);
                    }
                }
                let nFuncion= new Funcion(this.tipo,this.nombre,this.parametros.length,array,this.sentencias, this.parametros)
                actual.insertarFuncion(this.nombre,nFuncion);
                Tabla.insertarSimbolo(new Symbol(this.nombre, "Función", this.establecerTipo(), (this.linea).toString(), (this.columna).toString()));
            }
        }
        if(this.tipo.getPrimitivo()==TipoPrimitivo.Boolean){
            if(this.parametros.length==0){
                let nFuncion= new Funcion(this.tipo,this.nombre,0,null,this.sentencias,[])
                actual.insertarFuncion(this.nombre,nFuncion);     
                Tabla.insertarSimbolo(new Symbol(this.nombre, "Función", this.establecerTipo(), (this.linea).toString(), (this.columna).toString()));   
            }else{
                let array=[];
                for(let i = 0; i<this.parametros.length; i++){
                    if(this.parametros[i].tipo.getPrimitivo()==TipoPrimitivo.Boolean){
                        console.log(this.parametros[i].id);
                        array.push(this.parametros[i].id)
                    }else{
                        throw new Error("Las variables definidas no encajan con el tipo de funcion: " + this.linea + " , " + this.columna);
                    }
                }
                let nFuncion= new Funcion(this.tipo,this.nombre,this.parametros.length,array,this.sentencias,this.parametros)
                actual.insertarFuncion(this.nombre,nFuncion);
                Tabla.insertarSimbolo(new Symbol(this.nombre, "Función", this.establecerTipo(), (this.linea).toString(), (this.columna).toString()));
            }
        }
        if(this.tipo.getPrimitivo()==TipoPrimitivo.Void){
            if(this.parametros.length==0){
                let nFuncion= new Funcion(this.tipo,this.nombre,0,null,this.sentencias,[])
                actual.insertarFuncion(this.nombre,nFuncion);     
                Tabla.insertarSimbolo(new Symbol(this.nombre, "Función", this.establecerTipo(), (this.linea).toString(), (this.columna).toString()));   
            }else{
                let array=[];
                for(let i = 0; i<this.parametros.length; i++){
                    console.log(this.parametros[i].id);
                    array.push(this.parametros[i].id)
                }
                let nFuncion= new Funcion(this.tipo,this.nombre,this.parametros.length,array,this.sentencias,this.parametros)
                actual.insertarFuncion(this.nombre,nFuncion);
                Tabla.insertarSimbolo(new Symbol(this.nombre, "Función", this.establecerTipo(), (this.linea).toString(), (this.columna).toString()));
            }
        }
        
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
}