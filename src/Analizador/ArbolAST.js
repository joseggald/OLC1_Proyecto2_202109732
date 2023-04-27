const GramaticaAST = require("../AST/GramaticaAST");
const grammar = require("../A/grammar");
const { generateTree } = require("../../public/javascripts/ArbolAst");

function manejarDatos(texto) {
  arbolast(texto);
  /*
  const raiz = GramaticaAST.parse("graficar(2-4);");
  const contenido = `digraph G { 
      graph [ratio=.548];
      node [style=filled, color=black, shape=circle, width=1
          fontname=Helvetica, fontweight=bold, fontcolor=black,
          fontsize=10, fixedsize=true];
  `+ raiz.graficar() + " \n }";
  console.log(contenido)
  */      
}


function arbolast(content){
    console.log(content);
    treeData = [];
    var result = grammar.parse("print(3);")
    generateTree([result.node])
}

module.exports = manejarDatos;