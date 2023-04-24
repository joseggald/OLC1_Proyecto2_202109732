import { Expresion } from "../Entorno/Expresion";
import { Ambito } from "../Entorno/Ambito";
import { AST } from "../Entorno/AST";
import { Tipo } from '../Entorno/Simbolos/Tipo';
import { TipoPrimitivo } from "../Entorno/Simbolos/TipoPrimitivo";

export class ReturnPR extends Expresion{
  exp: Expresion;
  constructor(exp: Expresion,linea:number, columna:number){
    super(linea,columna);
    this.exp=exp;
  }

  public getValor(actual: Ambito, global: Ambito, ast: AST) {
    let a;
    if(this.exp===undefined){
      return "return";
    }else{
      let data=this.exp.getValor(actual,global,ast)
      return data;
    }
    
  }

}   