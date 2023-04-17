import { Instruction } from "../Abstracto/Instruction";
import { Expression } from "../Abstracto/Expression";
import { printlist } from "../Reports/PrintList";
import { Environment } from "../Abstracto/Entorno";

export class Print extends Instruction {
  constructor(
    line: number,
    column: number,
    private expression: Expression
  ) {
    super(line, column);
  }

  public execute(env:Environment): void {
    const value = this.expression.execute(env); // value and type
    printlist.push(value.value);
    console.log("desde consola:" ,value.value);
  }

}