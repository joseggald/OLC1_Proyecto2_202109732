import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Tipo } from "../Entorno/Simbolos/Tipo";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";

export class Ternario extends Expresion {

    condicion: Expresion;
    sentenciaTrue: Expresion;
    sentenciaFalse: Expresion;

    constructor(condicion: Expresion, sentenciaTrue: Expresion, sentenciaFalse: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.condicion = condicion;
        this.sentenciaTrue = sentenciaTrue;
        this.sentenciaFalse = sentenciaFalse;
    }

    private determinarTipo(expresion: Expresion, actual: Ambito, global: Ambito, ast: AST) {
        //determinando el tipo de la expresion

        let valor = expresion.getValor(actual, global, ast);

        let tipoDato = typeof valor
        if (tipoDato == "number") {
            if (Number.isInteger(valor)) {
                this.tipo = new Tipo(TipoPrimitivo.Integer);
            } else {
                this.tipo = new Tipo(TipoPrimitivo.Double);
            }
        } else if (tipoDato == "string") {
            if (valor.length == 1) {
                this.tipo = new Tipo(TipoPrimitivo.Char);
            } else {
                this.tipo = new Tipo(TipoPrimitivo.String);
            }
        } else if (tipoDato == "boolean") {
            this.tipo = new Tipo(TipoPrimitivo.Boolean);
        }
    }

    public getValor(actual: Ambito, global: Ambito, ast: AST) {

        let condicion = this.condicion.getValor(actual, global, ast);
        let valorTrue = this.sentenciaTrue.getValor(actual, global, ast);
        let valorFalse = this.sentenciaFalse.getValor(actual, global, ast);

        if (condicion) {
            this.determinarTipo(this.sentenciaTrue, actual, global, ast);
            return valorTrue;
        } else {
            this.determinarTipo(this.sentenciaFalse, actual, global, ast);
            return valorFalse;
        }
    }

}