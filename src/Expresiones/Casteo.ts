import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Expresion } from "../Entorno/Expresion";
import { Tipo } from "../Entorno/Simbolos/Tipo";

export class Casteo extends Expresion {
    
    tipo       : Tipo;
    expresion  : Expresion;

    constructor(tipo :Tipo, expresion :Expresion, linea :number, columna :number ) {
        super(linea, columna);
        this.tipo = tipo;
        this.expresion = expresion;
    }
    
    public getValor(actual: Ambito, global: Ambito, ast: AST) {

        let tipoCasteo = this.tipo.getPrimitivo()
        let valorExpresion = this.expresion.getValor(actual, global, ast);
        let tipoExpresion = this.expresion.tipo;
        
        console.log(tipoCasteo, "tipo");
        console.log(valorExpresion, "valor expresion")
        console.log(tipoExpresion.getPrimitivo(), "tipo expresion")

        if (tipoCasteo == 0) {  //si se desea castear a int
            if (tipoExpresion.getPrimitivo() == 1) {
                let nuevoValor = Math.floor(valorExpresion);
                return nuevoValor;
            }else if (tipoExpresion.getPrimitivo() == 2 || tipoExpresion.getPrimitivo() == 3) {
                let nuevoValor: number = valorExpresion.charCodeAt(0);
                return nuevoValor;
            }
        }else if (tipoCasteo == 1) { //si se desea castear a double
            if (tipoExpresion.getPrimitivo() == 0) {
                let nuevoValor: number = parseFloat(Number(valorExpresion).toFixed(2));
                return nuevoValor; 
            }else if (tipoExpresion.getPrimitivo() == 2 || tipoExpresion.getPrimitivo() == 3) {
                let nuevoValor: number = parseFloat(valorExpresion.charAt(0));
                return nuevoValor;
            }  
        }else if (tipoCasteo == 2) { // si se desea castear a char
            if (tipoExpresion.getPrimitivo() == 0) {
                let nuevoValor : string = String.fromCharCode(valorExpresion);
                return nuevoValor;
            }
        }else if (tipoCasteo == 3) {  //si se desea castear a string
            if (tipoExpresion.getPrimitivo() == 0) {
                let nuevoValor: string = valorExpresion.toString();
                return nuevoValor; 
            }else if (tipoExpresion.getPrimitivo() == 1) {
                let nuevoValor: string = valorExpresion.toString();;
                return nuevoValor;
            }
        }

    }

}