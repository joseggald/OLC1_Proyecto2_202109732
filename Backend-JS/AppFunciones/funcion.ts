import { printlist } from "../Interprete/Reports/PrintList";
import { Environment } from "../Interprete/Abstracto/Entorno";

class InterpreteController {
    // metodo para interpretar el codigo fuente
    public interpretar(data) {
      // variable parser
      var parser = require("../Gramatica/Gramatica");
  
      // variable codigo fuente
      const text = data;
      console.log("Codigo de entrada:  " + text);
  
      try {
        // parsear el codigo fuente
        const ast = parser.parse(text); //ast es el arbol de sintaxis abstracta
        try {
          printlist.splice(0, printlist.length);
          const globalEnv = new Environment(null);
  
          for (const inst of ast){
              inst.execute(globalEnv);
          }
          console.log("se logro");
  
        } catch (error) {
          console.log(error);
        }
      } catch (err) {
        console.log(err);
      }
    }
}
  
export const interpreteController = new InterpreteController();