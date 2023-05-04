import express 		from 'express';
import path 		from 'path';
import cookieParser from 'cookie-parser';
import bodyParser   from 'body-parser';
import { Analizador } from './Analizador/Analizador';
import { AST } from './Entorno/AST';
import * as fs from 'fs';
import { exec } from 'child_process';
import { Tabla } from './Tabla/Tabla';
import { TablaError } from './Tabla/TablaError'
import { manejarDatos } from './Analizador/ArbolAST';

const app = express();
const port = 3000;


app.use(express.static('public'));

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
console.log(__dirname);
app.use(express.static(path.join(__dirname, '../public')));



// ===================================== RUTAS
app.listen(port, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Servidor funcionando en puerto: ${port}`);
  });


app.get('/status', (req, res) => {
	res.send('El servicio express esta funcionando OK !!');
});

app.get('/', (req, res) => {
	res.render('index.ejs', { title: 'Typewise OLC1', salida: '', codigo:"",svgString:''});
});

app.post('/arbol', (req, res) => {
  res.redirect("/ArbolD3.html")
});
app.post('/arbol2', (req, res) => {
    res.redirect("/ArbolGraphviz.html")
});
app.post('/errores', (req, res) => {
    res.redirect("/Errores.html")
});
app.post('/simbolos', (req, res) => {
    res.redirect("/Simbolos.html")
});

app.post('/ejecutar', (req, res) => {
    TablaError.vaciarArreglo()
    Tabla.vaciarArreglo()
    let cadena_codigo = req.body.codigo; 
    let analizador = new Analizador(cadena_codigo, "editor");
    let ast: AST = analizador.Analizar();
    
    if(TablaError.arregloErrores.length>0){
        crearTablaErrores()
        res.render('index.ejs', { title: 'Typewise OLC1', salida: "Error hubo conflcito a nivel sintatico o lexico, revise la tabla de errores.", codigo: cadena_codigo,svgString:''});
    }else{
        if(ast instanceof AST){ 
          if(ast != undefined) {
            let a=manejarDatos(cadena_codigo)
            crearAST(a)
            crearTabla()
            res.render('index.ejs', { title: 'Typewise OLC1', salida: ast.getSalida(), codigo: cadena_codigo,svgString:"" });
          }
        }
    }
    
});

function crearTabla() {

  try {
      const archivoTXT = 'public/Simbolos.txt'
      const archivoSVG = 'public/Simbolos.svg'
      const contenido = `digraph G {
      node[shape=plaintext]
      table [label=<<table border="1" cellspacing="0">
          <tr><td>Identificador</td><td>Tipo</td><td>Tipo</td><td>Linea</td><td>Columna</td></tr>
          ${Tabla.graficarTabla()}
      </table>>]
  }`

      fs.writeFile(archivoTXT, contenido, err => {
          if (err) {
              console.error('Falló escribir el archivo ', err);
          } else console.log('archivo creado correctamente');
      });

      exec(`dot -Tsvg ${archivoTXT} -o ${archivoSVG}`, (error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              return;
          }
          if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
          }
          console.log(`stdout: ${stdout}`);
      });
  } catch (error) {
      console.log(error);
  }
}

function crearTablaErrores() {

  try {
      const archivoTXT = 'public/Errores.txt'
      const archivoSVG = 'public/Errores.svg'
      const contenido = `digraph G {
      node[shape=plaintext]
      table [label=<<table border="1" cellspacing="0">
          <tr><td>Tipo</td><td>Descripcion</td><td>Linea</td><td>Columna</td></tr>
          ${TablaError.graficarTabla()}
      </table>>]
  }`

      fs.writeFile(archivoTXT, contenido, err => {
          if (err) {
              console.error('Falló escribir el archivo ', err);
          } else console.log('archivo creado correctamente');
      });

      exec(`dot -Tsvg ${archivoTXT} -o ${archivoSVG}`, (error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              return;
          }
          if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
          }
          console.log(`stdout: ${stdout}`);
      });
  } catch (error) {
      console.log(error);
  }
}

function crearAST(codigo) {
  try{
      const archivoTXT = 'public/Arbol.txt'
      const archivoSVG = 'public/Arbol.svg'
      const contenido = codigo;

      fs.writeFile(archivoTXT, contenido, err => {
          if (err) {
              console.error('Falló escribir el archivo ', err);
          } else console.log('archivo creado correctamente');
      });

      exec(`dot -Tsvg ${archivoTXT} -o ${archivoSVG}`, (error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              return;
          }
          if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
          }
          console.log(`stdout: ${stdout}`);
      });
  } catch (error) {
      console.error('Ha ocurrido un error:', error);
  }
}

