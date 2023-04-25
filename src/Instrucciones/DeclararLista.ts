import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Instruccion } from "../Entorno/Instruccion";
import { Tipo } from "../Entorno/Simbolos/Tipo";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";
import { Arreglo } from "../Entorno/Simbolos/Arreglo";
import { Expresion } from "../Entorno/Expresion";
import { Lista } from "../Entorno/Simbolos/Lista";

export class DeclararLista extends Instruccion {


    tipo: Tipo;
    ctipo: Tipo;
    id: string;
    objetos: Expresion[];
    tam: number;

    constructor(tipo: Tipo, id: string, ctipo: Tipo, objetos: Expresion[], linea: number, columna: number) {
        super(linea, columna);
        this.tipo = tipo;
        this.id = id;
        this.ctipo = ctipo;
        this.objetos = objetos;
    }

    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {

        // Verificar que no exista variable
        console.log(actual.existeLista(this.id));
        if (actual.existeLista(this.id)) {
            // * ERROR *
            throw new Error("Lista ya se encuentra definida en el entorno actual: " + this.linea + " , " + this.columna);
        }
        
        if (this.ctipo.getPrimitivo() === this.tipo.getPrimitivo()) {
            let array: Expresion[] = [];
            let nueva_lista = new Lista(this.tipo, this.id, this.ctipo, array);
            actual.insertarLista(this.id, nueva_lista);
        } else if (this.ctipo != this.tipo && this.ctipo != undefined) {
            throw new Error("Lista mal definida en el entorno actual: " + this.linea + " , " + this.columna);
        }

    }
}