import { Expresion } from "../Entorno/Expresion";
import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";

export class Break extends Expresion{

  constructor(linea:number, columna:number){
    super(linea,columna);
  }
  public getValor(actual: Ambito, global: Ambito, ast: AST) {
    return "break"; 
  }

}  