
import { interpreteController } from './funcion';

const interpreteButton = document.getElementById('btn-compile');
interpreteButton.addEventListener('click', () => {
  const inputData = document.getElementById('input').value; // suponiendo que tienes un elemento input con id "inputData"
  interpreteController.interpretar(inputData);
});

/*
function Compilar(){
    txt=document.getElementById('input')
    texto=txt.value;
    var ast = Gramatica.parse(texto);
    try{
        for(const inst of ast){
            inst.execute();
        }
        console.log("exito")
    }catch(err){
        console.log(error)
    }
}*/