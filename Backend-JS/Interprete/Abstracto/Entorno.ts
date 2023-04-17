import { Simbolo } from "./Symbol";
import { Type } from "./Return";
import { printlist } from "../Reports/PrintList";
import 'es6-shim';

export class Environment {
  private variables = new Map<string, Simbolo>();   //  mapa de variables
  
    // constructor
    constructor(private anterior: Environment | null) {
      this.variables = new Map<string, Simbolo>();
  
    }
  
    // guardar una nueva variable
    public guardar(id: string, valor: any , tipo: Type,linea:number,columna:number)  {
      // verificar el ambito
      let env: Environment | null = this;
  
      // verificar si la variable ya existe
      if (!env.variables.has(id.toLowerCase())) {
        // guardar la variable
        // guardar la variable en una tabla de simbolos para el reporte
        env.variables.set(id.toLowerCase(), new Simbolo(valor, id, tipo));
      }else {
        printlist.push("Error, La variable "+id+" ya existe en el entorno, linea "+linea+" y columna "+columna);
      }
  
    }
  

}