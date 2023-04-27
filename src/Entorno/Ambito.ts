import { Funcion } from "./Simbolos/Funcion";
import { Variable } from "./Simbolos/Variable";
import { Arreglo } from './Simbolos/Arreglo';
import { Lista } from "./Simbolos/Lista";

export class Ambito {

    anterior: Ambito;
    tabla_variables: Map<string,    Variable>;
    tabla_funciones: Map<string,   Funcion>;
    tabla_arreglos: Map<string,   Arreglo>;
    tabla_listas: Map<string,   Lista>;

    constructor(anterior: Ambito) {
        this.anterior = anterior;
        this.tabla_variables = new Map<string,   Variable>();
        this.tabla_funciones = new Map<string,   Funcion>();
        this.tabla_arreglos = new Map<string,   Arreglo>();
        this.tabla_listas = new Map<string,   Lista>();
    }

    public insertarVariable(id :string, variable :Variable) {
        this.tabla_variables.set(id, variable);
    }
    public insertarArreglo(id :string, arreglo :Arreglo) {
        this.tabla_arreglos.set(id, arreglo);
    }
    public insertarLista(id :string, lista :Lista) {
        this.tabla_listas.set(id, lista);
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
                const array = e.tabla_arreglos.get(id);
                if (array != null) {
                    return array as Arreglo;
                }
            } catch (error) {
                console.log(error);
            }
            e = e.anterior;
        }
        return undefined;
    }

    public getLista(id :string): Lista {
        let e: Ambito = this;
        while (e != null) {
            try {
                const lista = e.tabla_listas.get(id);
                if (lista != null) {
                    return lista as Lista;
                }
            } catch (error) {
                console.log(error);
            }
            e = e.anterior;
        }
        return undefined;
    }
    
    public getFuncion(id :string): Funcion {
        return this.tabla_funciones.get(id);
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
    public existeLista(id :string) : boolean {
        return this.tabla_listas.get(id) != undefined;
    }
}
