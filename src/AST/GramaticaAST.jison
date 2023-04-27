%{
    const Nodo = require('./ClasesArbolAST/Nodo');
%}
%lex
//%options case-insensitive

// definicion de scanner 
%% 
// caracteres en blanco - ignorados
[ \r\t\n]+            //blancos
"//".*              //comentario de una linea
\s+					// se ignoran espacios en blanco
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]	 //multilinea

// abecedario

//palabras reservadas
// definicion           //token (JISON)
"graficar"              return 'GRAFICAR'
"true"                  return 'TRUE'
"false"                 return 'FALSE'
"("                     return 'PAR_ABRE';
")"                     return 'PAR_CIERRA';
"{"                     return 'LLAVE_A';
"}"                     return 'LLAVE_C';

//operadores
// comparadores - relacionales 
"=="                    return 'IGUAL';
"<="                    return 'MENOR_IGUAL';
"<"                     return 'MENOR';
">="                    return 'MAYOR_IGUAL';                     
">"                     return 'MAYOR';
"!="                    return 'DIFF';
"||"                    return 'OR';
"&&"                    return 'AND';
"!"                     return 'NOT';
// aritmeticos
"++"                    return 'INCR';
"--"                    return 'DECR';
','                     return 'COMA'
"+"					    return 'MAS';
"-"					    return 'MENOS';
"*"					    return 'POR';
"/"					    return 'DIV';
";"                     return 'PYC';
"^"                     return 'POW';
"%"                     return 'MOD';

// expresiones regulares en formato JS
[0-9]+("."[0-9]+)+\b    return 'DECIMAL'
[0-9]+\b                return 'ENTERO'
([a-zA-Z])[a-zA-Z0-9_]* return 'ID'
\"[^\"]*\"              { yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
\'[^\']*\'				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA_C'; }

<<EOF>>				    return 'EOF';
// . para caracteres no reconocidos
.				        {console.log("Caracter no reconocido: ", yylloc.first_line, 
                                        yylloc.first_column,'-', yylloc.last_column,
                                        ' Error Lexico',yytext) }
/lex
//precedenciasc de menor a mayor 
%left 'OR'
%left 'AND'
%left 'DIFF' 'IGUAL' 
%left 'MENOR_IGUAL' 'MAYOR_IGUAL' 'MENOR' 'MAYOR'
%left 'MAS' 'MENOS' 
%left 'POR' 'DIV'  'MOD'
%left 'POW'
%left 'PAR_ABRE' 'PAR_CIERRA'
%left 'UMENOS' //para negación  unaria (token no existente)
%right 'NOT'
%left 'INCR' 'DECR' //unarios ++ --
// !(a==b)
// 5*10+8   
// 3+5+-3

%start s

%%
/*yylloc -> localización del token 
    # first_column 
    # last_column
    # first_line
*/

// gramatica
// graficar ( 5+ 5 or valor and 1   )
// GRAFICAR PAR_ABRE expr PAR_CIERRA PYC EOF (EOF necesario en algunos casos)
s: GRAFICAR PAR_ABRE expr PAR_CIERRA PYC {
        let raiz = new Nodo("AST", @1.first_line, @1.first_column, '"#e7019c"'  )
        raiz.hijos.push($3)
        return raiz
}          
;

expr: NOT expr { $$ = new Nodo( "! Exp", @1.first_line, @1.first_column, "yellowgreen" );
                 $$.hijos.push($2)}
    | MENOS expr %prec UMENOS {$$= new Nodo(" - EXP ",
                                        @1.first_line, @1.first_column, 
                                        "cornflowerblue")
                                        $$.hijos.push($2) }
    |expr MAS expr          {$$= new Nodo("+EXP", @2.first_line, @2.first_column,'"#b7d4eb"'); 
                             $$.hijos.push($1)
                             $$.hijos.push($3)}
    |expr MENOS expr        {$$= new Nodo("-EXP", @2.first_line, @2.first_column,'"#69ffc2"'); 
                             $$.hijos.push($1)
                             $$.hijos.push($3)}
    |expr POR expr          {$$= new Nodo(" * EXP", @2.first_line, @2.first_column,'"#ffb3c5"'); 
                             $$.hijos.push($1)
                             $$.hijos.push($3)}
    |expr DIV expr          {$$= new Nodo(" DIV EXP", @2.first_line, @2.first_column,'"#f3eae8"'); 
                             $$.hijos.push($1)
                             $$.hijos.push($3)}
    |expr POW expr          {$$= new Nodo(" ^ EXP", @2.first_line, @2.first_column,'"#00b7fe"'); 
                             $$.hijos.push($1)
                             $$.hijos.push($3)}
    |expr MOD expr          {$$= new Nodo(" % EXP", @2.first_line, @2.first_column,'"#65d4d4"'); 
                             $$.hijos.push($1)
                             $$.hijos.push($3)}
    |expr IGUAL expr        {$$= new Nodo(" == EXP", @2.first_line, @2.first_column,'"#e9e9c2"'); 
                             $$.hijos.push($1)
                             $$.hijos.push($3)} 
    |expr DIFF expr         {$$= new Nodo(" != EXP", @2.first_line, @2.first_column,'"#dee5b9"'); 
                             $$.hijos.push($1)
                             $$.hijos.push($3)} 
    |expr MAYOR_IGUAL expr  {$$= new Nodo(" != EXP", @2.first_line, @2.first_column,'"#29b3bd"'); 
                             $$.hijos.push($1)
                             $$.hijos.push($3)}
    |expr MENOR_IGUAL expr  {$$= new Nodo(" != EXP", @2.first_line, @2.first_column,'"#afaadf"'); 
                             $$.hijos.push($1)
                             $$.hijos.push($3)}
    |expr MAYOR expr        {$$= new Nodo(" > EXP", @2.first_line, @2.first_column,'"#dee5b9"'); 
                             $$.hijos.push($1)
                             $$.hijos.push($3)}
    |expr MENOR expr        {$$= new Nodo(" < EXP", @2.first_line, @2.first_column,'"#e3d4bf"'); 
                             $$.hijos.push($1)
                             $$.hijos.push($3)}
    |expr OR expr           {$$= new Nodo(" || EXP", @2.first_line, @2.first_column,'"#0098ff"'); 
                             $$.hijos.push($1)
                             $$.hijos.push($3)}
    |expr AND expr          {$$= new Nodo(" && EXP", @2.first_line, @2.first_column,'"#a5ed7a"'); 
                             $$.hijos.push($1)
                             $$.hijos.push($3)}
    |ENTERO                {$$ = new Nodo($1, @1.first_line, @1.first_column,'"#20c3d8"')}
    |DECIMAL	            {$$= new Nodo($1, @1.first_line, @1.first_column,'"#919eff"'); }
	|CADENA                 {$$= new Nodo($1, @1.first_line, @1.first_column,'"#00a19d"'); }
    |CADENA_C               {$$= new Nodo($1, @1.first_line, @1.first_column,'"#a2fff6"'); }
    |TRUE                   {$$= new Nodo($1, @1.first_line, @1.first_column,'"#00da92"'); }
    |FALSE                  {$$= new Nodo($1, @1.first_line, @1.first_column,'"#90d557"'); }
    |ID                     {$$= new Nodo($1, @1.first_line, @1.first_column,'"#edefed"'); }
    |expr INCR              {$$= new Nodo("++", @2.first_line, @2.first_column,'"#ff2079"'); 
                             $$.hijos.push($1)}
    |expr DECR              {$$= new Nodo("--", @2.first_line, @2.first_column,'"#20b5d8"'); 
                             $$.hijos.push($1)}   
    |PAR_ABRE listaDer PAR_CIERRA      {$$ = new Nodo("(E)", @1.first_line, @1.first_column,'"#ffcea1"')
                                        $$.hijos.push($2)}
    |LLAVE_A listaIzq LLAVE_C          {$$ = new Nodo("{E}", @1.first_line, @1.first_column,'"#cae4ce"')
                                        $$.hijos.push($2)}
    ; 
//lista recursiva por la derecha
listaDer: expr  COMA listaDer  {$$ = $3
                                $$.hijos.push($1)
                                }  
        | expr { $$ = new Nodo("ListaD", @1.first_line, @1.first_column,'"#d3ffc1"')
                $$.hijos.push($1) }
        ;
//lista recursiva por la izquierda
listaIzq: listaIzq  COMA expr  {$$ = $1
                                $$.hijos.push($3)
                                } 
        | expr { $$ = new Nodo("ListaI", @1.first_line, @1.first_column,'"#86bafd"')
                $$.hijos.push($1) }
        ;
