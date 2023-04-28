let counter = 0;
let a;
const palabras = ["EXP", "PRINT"];

function generateTree(treeData) {
  let dot = "digraph G {\n";
  let nodeMap = {};
  let hijos=[]
  let cont;
  function traverse(node, prefix) {
    if (node.name === "SENTENCIA") {
      prefix = `s${counter++}_`; 
      dot += `"SENTENCIA" -> "${prefix}SENTENCIA";\n`;
      cont=0
    }
    let nodeName = prefix + node.name;
    if (!nodeMap[nodeName]) {
      dot += `"${nodeName}" [label="${node.name}"];\n`;
      nodeMap[nodeName] = true;
    }
  
    if (node.children) {
      for (const child of node.children) {
        let childName = prefix + child.name;
        if(palabras.some(palabra => childName.includes(palabra))){
            
        }else{
            if(hijos.length>0){
                let des=false
                for(let i=0; i<hijos.length; i++){
                    if(hijos[i]==childName){
                        childName=childName+"_"+cont
                        cont++
                        hijos.push(childName)
                        break
                    }else{
                        des=true;
                    }
                }
                if(des==true){
                    hijos.push(childName)
                }
            }else{
                hijos.push(childName)
            }
        }  
        if (nodeName !== childName && !nodeMap[childName]) {
          dot += `"${nodeName}" -> "${childName}" [label="${child.name}"];\n`;
          nodeMap[childName] = true;
        }
        traverse(child, prefix);
      }
    }
  }
  
  traverse(treeData[0], "");
  
  dot += "}\n";
  console.log(dot)
  return dot;
}

module.exports = generateTree;
