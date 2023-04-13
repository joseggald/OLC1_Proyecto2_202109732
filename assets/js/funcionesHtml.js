function addLineNumbers() {
    var lines = document.getElementById("input").value.split("\n");
    var lineNumbers = "";
    for (var i = 0; i < lines.length; i++) {
      lineNumbers += i + 1 + "\n";
    }
    document.getElementById("line-numbers").innerHTML = lineNumbers;
  }