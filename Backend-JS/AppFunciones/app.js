function Compilar(){
    txt=document.getElementById('input')
    texto=txt.value;
    var res = Gramatica.parse(texto);
    console.log(res)
}