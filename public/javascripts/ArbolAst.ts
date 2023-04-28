let counter = 0;
let a;


function generateTree(treeData) {
  let dot = "digraph G {\n";
  let nodeMap = {};
  let cont = 0;

  function traverse(node, index) {
    let nodeName = `n${index}`;

    if (!nodeMap[nodeName]) {
      dot += `"${nodeName}" [label="", shape=circle, style=filled, fillcolor=white, fontname=Helvetica];\n`;
      nodeMap[nodeName] = true;
    }

    let labelName = node.name.replace(/"/g, '\\"');
    dot += `"${nodeName}" [label="${labelName}"];\n`;

    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        let child = node.children[i];
        let childIndex = `${index}_${i}`;

        let childName = `n${childIndex}`;

        if (nodeName !== childName && !nodeMap[childName]) {
          dot += `"${nodeName}" -> "${childName}" [label="${child.name}"];\n`;
          nodeMap[childName] = true;
        }
        traverse(child, childIndex);
      }
    }
  }

  traverse(treeData[0], 0);

  dot += "}\n";
  console.log(dot);
  return dot;
}






module.exports = generateTree;
