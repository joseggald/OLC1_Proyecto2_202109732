import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Lista } from "../Entorno/Simbolos/Lista";
import { Tipo } from "../Entorno/Simbolos/Tipo";
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";

export class FuncionLenguaje extends Expresion {

    funcion: string;
    exp: Expresion;

    constructor(funcion: string, exp: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.funcion = funcion;
        this.exp = exp;
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


        switch (this.funcion) {
            case "toLower":
                {
                    let valor = this.exp.getValor(actual, global, ast);
                    let cadenaLower = valor.toLowerCase();
                    this.determinarTipo(this.exp, actual, global, ast);
                    return cadenaLower;
                }
            case "toUpper":
                {
                    let valor = this.exp.getValor(actual, global, ast);
                    let cadenaUpper = valor.toUpperCase();
                    this.determinarTipo(this.exp, actual, global, ast);
                    return cadenaUpper;
                }
            case "truncate":
                {
                    let valor = this.exp.getValor(actual, global, ast);
                    let cadenaTrunc = Math.trunc(valor);
                    this.tipo = new Tipo(TipoPrimitivo.Integer);
                    return cadenaTrunc;
                }
            case "round":
                {
                    let valor = this.exp.getValor(actual, global, ast);
                    let cadenaRound = Math.round(valor);
                    this.tipo = new Tipo(TipoPrimitivo.Integer);
                    return cadenaRound;
                }
            case "toString":
                {
                    let valor = this.exp.getValor(actual, global, ast);
                    let cadenaString = valor.toString();
                    this.tipo = new Tipo(TipoPrimitivo.String);
                    return cadenaString;
                }
            case "toCharArray":
                {
                    let valor = this.exp.getValor(actual, global, ast);
                    let vector = valor.split("");
                    return vector;
                }
            case "typeOf":
                {
                    let valor = this.exp.getValor(actual, global, ast);
                    let tipoDato = typeof valor
                    
                    if (tipoDato == "number") {
                        if (Number.isInteger(valor)) {
                            let tipoRetorno = "int";
                            this.tipo = new Tipo(TipoPrimitivo.String);
                            return tipoRetorno;
                        } else {
                            let tipoRetorno = "double";
                            this.tipo = new Tipo(TipoPrimitivo.String);
                            return tipoRetorno;
                        }
                    } else if (tipoDato == "string") {
                        if (valor.length == 1) {
                            let tipoRetorno = "char";
                            this.tipo = new Tipo(TipoPrimitivo.String);
                            return tipoRetorno;
                        } else {
                            let tipoRetorno = "String";
                            this.tipo = new Tipo(TipoPrimitivo.String);
                            return tipoRetorno;
                        }
                    } else if (tipoDato == "boolean") {
                        let tipoRetorno = "boolean";
                        this.tipo = new Tipo(TipoPrimitivo.String);
                        return tipoRetorno;
                    }
                }
            case "length":
                {
                    let valor = this.exp.getValor(actual, global, ast);
                    let tipoDato = typeof valor
                    if (tipoDato == "string") {
                        let longitud = valor.length;
                        this.tipo = new Tipo(TipoPrimitivo.Integer);
                        return longitud;
                    }
                }
        }
    }

}