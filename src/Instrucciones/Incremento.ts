import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Instruccion } from "../Entorno/Instruccion";

export class Incremento extends Instruccion {

    id: string;

    constructor(id: string, linea: number, columna: number) {
        
        super(linea, columna);
        this.id = id;
    }


    public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
        
        let variable = actual.getVariable(this.id);
        if(variable === undefined) {
            // * ERROR *
            throw new Error("ERROR => No se ha definido la variable " + this.id);
        }

        if(variable.getTipo().getPrimitivo() !=  0) {
            throw new Error("ERROR => El tipo del valor asignado no corresponde a la variable " + this.id);
        }

        let valorVariable = variable.getValor();
        variable.asignarValor(valorVariable + 1);
    }

}