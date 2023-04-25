import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";

export class ModificarLista extends Instruccion {

    id: string;
    pos: number;
    valor: Expresion;

    constructor(id: string, pos:number, valor:Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.id = id;
        this.pos = pos;
        this.valor = valor;
    }


    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {

        let existeLista = actual.getLista(this.id);
     
        if(existeLista === undefined) {
            // * ERROR *
            throw new Error(`ERROR => No existe la lista: ${this.id}`);
        }else{
            let lista = actual.getLista(this.id);
            let valor = this.valor.getValor(actual, global, ast);
            let valorTipo = this.valor.tipo;
            let listaTipo = lista.getTipo().getPrimitivo()

            if (valorTipo.getPrimitivo() != listaTipo) {
                throw new Error(`ERROR => El tipo de la lista y el valor a modificar no son los mismos en: ${this.id}`);
            }else{
                lista.modificarValor(this.pos, valor); 
            }
        }


    }

}