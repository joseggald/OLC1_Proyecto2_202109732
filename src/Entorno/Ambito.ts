import { Funcion } from "./Simbolos/Funcion";
import { Variable } from "./Simbolos/Variable";
import { Arreglo } from './Simbolos/Arreglo';
export class Ambito {

    anterior: Ambito;
    tabla_variables: Map<string,    Variable>;
    tabla_funciones: Map<string,   Funcion>;
    tabla_arreglos: Map<string,   Arreglo>;

    constructor(anterior: Ambito) {
        this.anterior = anterior;
        this.tabla_variables = new Map<string,   Variable>();
        this.tabla_funciones = new Map<string,   Funcion>();
        this.tabla_arreglos = new Map<string,   Arreglo>();
    }

    public insertarVariable(id :string, variable :Variable) {
        this.tabla_variables.set(id, variable);
    }
    public insertarArreglo(id :string, arreglo :Arreglo) {
        this.tabla_arreglos.set(id, arreglo);
    }
    public insertarFuncion(id :string, funcion :Funcion) {
        this.tabla_funciones.set(id, funcion);
    }

    public getVariable(id :string): Variable {
        let e: Ambito = this;
        while (e != null) {
            try {
                const variable = e.tabla_variables.get(id);
                if (variable != null) {
                    return variable as Variable;
                }
            } catch (error) {
                console.log(error);
            }
            e = e.anterior;
        }
        return undefined;
    }
    
    public getVector(id :string): Arreglo {
        let e: Ambito = this;
        while (e != null) {
            try {
                const variable = e.tabla_arreglos.get(id);
                if (variable != null) {
                    return variable as Arreglo;
                }
            } catch (error) {
                console.log(error);
            }
            e = e.anterior;
        }
        return undefined;
    }
    
    public getFuncion(id :string): Funcion {
        let e: Ambito = this;
        while (e != null) {
            try {
                const funcion = e.tabla_funciones.get(id);
                if (funcion != null) {
                    return funcion as Funcion;
                }
            } catch (error) {
                console.log(error);
            }
            e = e.anterior;
        }
        return undefined;
    }

    public existeVariable(id :string) : boolean {
        return this.tabla_variables.get(id) != undefined;
    }

    public existeFuncion(id :string) : boolean {
        return this.tabla_funciones.get(id) != undefined;
    }
    
    public existeArreglo(id :string) : boolean {
        return this.tabla_arreglos.get(id) != undefined;
    }
}