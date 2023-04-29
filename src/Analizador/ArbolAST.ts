/*import { generateTree } from '../../public/javascripts/ArbolAst';*/
/*const GramaticaAST = require("../AST/GramaticaAST");
const grammar = require("../A/grammar");

 */
const generateTree  = require("../../public/javascripts/ArbolAst");
const grammar = require('../A/grammar');
export function manejarDatos(texto) {
  console.log(texto);
  let result = grammar.parse(texto)
  return generateTree([result.node])
  /*
  const raiz = GramaticaAST.parse("graficar(2-4);");
  const contenido = `digraph G { 
      graph [ratio=.548];
      node [style=filled, color=black, shape=circle, width=1
          fontname=Helvetica, fontweight=bold, fontcolor=black,
          fontsize=10, fixedsize=true];
  `+ raiz.graficar() + " \n }";
  console.log(contenido)*/
      
}
/*
function arbolast(content){
    console.log(content);
    let treeData = [];
    var result = grammar.parse("print(3);")
    generateTree([result.node])
}*/