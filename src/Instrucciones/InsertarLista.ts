import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Instruccion } from "../Entorno/Instruccion";

export class InsertarLista extends Instruccion {

    id: string;
    valor: Expresion;

    constructor(id: string, valor:Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.id = id;
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
                throw new Error(`ERROR => El tipo de la lista y el valor a ingresar no son los mismos en: ${this.id}`);
            }else{
                lista.agregarValor(valor);
                console.log(lista.objetos);
            }
        }


    }

}