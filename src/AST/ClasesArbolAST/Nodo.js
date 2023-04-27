const { Random } = require("random-js")
const random = new Random()
// npm install random-js
class Nodo{
    ID = 0
    nombre = ""; 
    linea = 0
    columna = 0
    color = ""
    hijos = []

    constructor( nombre, linea, columna, color ){
        this.nombre = nombre
        this.linea = linea
        this.columna = columna
        this.color = color
        this.ID = random.integer(0,0x1fffffffffffff)
    }

    graficar(){
        let salida = `n${this.ID} [label="${this.nombre + " L" + this.linea + " C: "+ this.columna}" fillcolor=${this.color}];\n `
        for (let i = 0; i < this.hijos.length; i++){
            salida += `n${this.ID} -> n${this.hijos[i].ID} ; \n`
            salida += this.hijos[i].graficar();
        }
        return salida
    }
}

module.exports = Nodo