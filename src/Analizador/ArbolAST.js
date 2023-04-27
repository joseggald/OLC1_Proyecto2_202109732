const GramaticaAST = require("../AST/GramaticaAST");


function manejarDatos(texto) {
  console.log(texto)
  /*
  const raiz = GramaticaAST.parse(texto);
  const contenido = `digraph G { 
      graph [ratio=.548];
      node [style=filled, color=black, shape=circle, width=1
          fontname=Helvetica, fontweight=bold, fontcolor=black,
          fontsize=10, fixedsize=true];
  `+ raiz.graficar() + " \n }";
  console.log(contenido)      */
}

/*
function arbolast(content){
    console.log(content);
    
    treeData = [];
    if (document.getElementById("grafo")) {
      document.getElementById("grafo").remove();
    }
    var result = GramaticaAST.parse(content);
    generateTree([result.node]);
}

function newNode(yy, state, ...nodes) {
    const parent = getNonTerminal(yy, state);
    const children = [];
          
    for (let node of nodes) {
      node.parent = node.parent ? node.parent : parent;
      if (node.parent == parent) {
        children.push(node);
      } else if (typeof node == 'string') {
        children.push({
          name: node,
          parent,
          children: []
        });
      } else {
        children.push({
          name: node.parent,
          parent,
          children: [node]
        });
      }
    }               

    return {
      name: parent,
      parent: null,
      children
    }
}
function getNonTerminal(yy, state) {
    const simbolos = yy.parser.symbols_;
    const produccion = yy.parser.productions_[state];
    let nonTerminal = '';
    for (let sim in simbolos) {
      if (simbolos[sim] === produccion[0]) {
        nonTerminal = sim;
         break;
      }
    }
    return nonTerminal;
}


module.exports =newNode;*/
module.exports = manejarDatos;