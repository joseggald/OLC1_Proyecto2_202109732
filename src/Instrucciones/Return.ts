import { Expresion } from "../Entorno/Expresion";
import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Instruccion } from "../Entorno/Instruccion";


export class Return extends Instruccion{
  exp: Expresion;
  constructor(exp: Expresion, linea:number, columna:number){
    super(linea,columna);
    this.exp=exp;
  }
  public ejecutar(actual: Ambito, global: Ambito, ast: AST) {
    /*
    if(this.exp===undefined){
      return null;
    }else{
      return this.exp.getValor(actual,global,ast);
    }*/
  }

}   