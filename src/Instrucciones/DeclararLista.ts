import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Instruccion } from "../Entorno/Instruccion";
import { Tipo } from "../Entorno/Simbolos/Tipo";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Expresion } from "../Entorno/Expresion";
import { Lista } from "../Entorno/Simbolos/Lista";
import { Tabla } from "../Tabla/Tabla";
import { Symbol } from "../Tabla/Symbol";

export class DeclararLista extends Instruccion {


    tipo: Tipo;
    ctipo: Tipo;
    id: string;
    charArray: Expresion;

    constructor(tipo: Tipo, id: string, ctipo: Tipo, charArray: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.tipo = tipo;
        this.id = id;
        this.ctipo = ctipo;
        this.charArray = charArray;
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

        // Verificar que no exista variable
        //console.log(actual.existeLista(this.id));
        if (actual.existeLista(this.id)) {
            // * ERROR *
            throw new Error("Lista ya se encuentra definida en el entorno actual: " + this.linea + " , " + this.columna);
        }

        if (this.charArray == undefined) {
            if (this.ctipo.getPrimitivo() === this.tipo.getPrimitivo()) {
                let array: Expresion[] = [];
                let nueva_lista = new Lista(this.tipo, this.id, this.ctipo, array);
                actual.insertarLista(this.id, nueva_lista);
                Tabla.insertarSimbolo(new Symbol(this.id, "Lista", this.establecerTipo(), (this.linea).toString(), (this.columna).toString()));
            } else if (this.ctipo != this.tipo && this.ctipo != undefined) {
                throw new Error("Lista mal definida en el entorno actual: " + this.linea + " , " + this.columna);
            }
        }else{

            if (this.tipo.getPrimitivo() != TipoPrimitivo.Char) {
                throw new Error("La lista no es de tipo Char: " + this.linea + " , " + this.columna);
            }

            let array: Expresion[] = [];
            let nueva_lista = new Lista(this.tipo, this.id, this.tipo, array);
            actual.insertarLista(this.id, nueva_lista)
            Tabla.insertarSimbolo(new Symbol(this.id, "Lista", this.establecerTipo(), (this.linea).toString(), (this.columna).toString()));
            
            let arregloChar = this.charArray.getValor(actual, global, ast);
            let lista = actual.getLista(this.id);

            for (let index = 0; index < arregloChar.length; index++) {
                lista.agregarValor(arregloChar[index]);
            }
            console.log(lista.objetos);
        }
    }
}