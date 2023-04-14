%lex
//AREA LEXICA
%options case-sensitive
identificador   [A-Za-z_\ñ\Ñ][A-Za-z_0-9\ñ\Ñ]*

%%

//Comentarios y espacios
"//".*            	                          {} //Linea Sola
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]           {} //Multilinea
[ \r\t]+                                      {}
\n                                            {}

//Primitivos
"null"			    	              return "nullVal";
"true"			    	              return "trueVal";
"false"			    	              return "falseVal";
[0-9]+("."[0-9]+)+\b            return "decimalVal";
[0-9]+\b                        return "enteroVal";
\"((\\\")|[^\n\"])*\"           { yytext = yytext.substr(1,yyleng-2); return 'stringVal'; }
\'((\\\')|[^\n\'])*\'	        	{ yytext = yytext.substr(1,yyleng-2); return 'charVal'; }

// Llamados de Impresiones
"print"			    		return "Rprint";

// Simbolos Generales
"("                 return 'PARABRE';
")"                 return 'PARCIERRA';
";"                 return 'PTOCOMA';
","                 return 'COMA';
":"                 return 'DOSPTOS';
"["                 return 'CORABRE';
"]"                 return 'CORCIERRA';
"{"                 return 'LLAVEA';
"}"                 return 'LLAVEC';
"."                 return 'PTO';

// Simbolos Aritmeticos
"+"                 return '+';
"-"                 return '-';
"*"                 return '*';
"^"                 return '^';
"/"                 return '/';
"%"                 return '%';
"?"                 return '?';
"#"                 return '#';

// Operadores Relacionales
">="                return '>=';
">"                 return '>';
"<="                return '<=';
"<"                 return '<';

// Operadores de Comparacion
"=="                return '==';
"!="                return '!=';
"="                 return '=';

// Operadores Logicos
"&&"                return '&&';
"&"                 return '&';
"||"                return '||';
"!"                 return '!';

// PALABRAS RESERVADAS
// Tipos de datos
"String"            return 'STRING';
"double"            return 'DOUBLE';
"int"               return 'INT';
"void"              return 'VOID';
"boolean"           return 'BOOLEAN';
"char"              return 'CHAR';

// Ciclos y Funciones de Programa
"if"                return 'IF';
"for"               return 'FOR';
"in"                return 'IN';
"while"             return 'WHILE';
"do"                return 'DO';
"print"             return 'Rprint';
"else"              return 'ELSE';
"switch"            return 'SWITCH';
"case"              return 'CASE';
"default"           return 'DEFAULT';
"break"             return 'BREAK';
"return"            return 'RETURN';
"continue"          return 'CONTINUE';

//Funciones
"toUppercase"       return 'TOUPPER';
"toLowercase"       return 'TOLOWER';
"length"            return 'LENGTH';
"toCharArray"            return 'CHARARRAY'
"Typeof"             return 'TYPEOF';
"truncate"             return 'TRUNCATE';
"round"             return 'ROUND';

{identificador} return 'ID'

<<EOF>>             return 'EOF';
/* ERROR */
. { console.log("Error")}

/*.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }*/
/lex

// Precedencia de Operaciones
%right '-'
%left '^'
%left '*' '/'
%left '+' '-'
%left '==' '!=' '<' '<=' '>' '>='
%left '&&'
%left '||'
%left '?'
%left '&'
%left '%'
%right '++' '--'
%left 'PARABRE' 'PARCIERRA'

%left 'EOF'

%start INIT

%ebnf

%% 
// Gramatica

INIT: SENTENCES EOF           
    | EOF                      
;

SENTENCES
  : SENTENCES SENTENCE          
  | SENTENCE                    
;

SENTENCE
  : PRINT                        
  | DECLARATION PTOCOMA     {   console.log($1.node+" "+$2);    }        
  | error PTOCOMA               
  | error KEYCLS                
;

PRINT
  : Rprint PARABRE EXP_PRINT PARCIERRA PTOCOMA		  
;

EXP_PRINT
  : EXP '+' EXP    {console.log("funciona");}                          
  | PRIMITIVO      {console.log("funciona");} 
  | ID                                
;

PRIMITIVO
  : nullVal        
  | intVal        
  | doubleVal      
  | charVal         
  | stringVal      
  | trueVal         
  | falseVal        
;

DECLARATION
  : TIPO ID                    { console.log($1.node+" "+$2) }
  | TIPO ID '=' PRIMITIVO                    { console.log($1.node+" "+$2+" "+$3+" "+$4.node) }
;


TIPO
  : INT                                       { console.log("int"); }
  | DOUBLE                                    { console.log("double"); }
  | BOOLEAN                                   { console.log("bool"); }
  | STRING                                    { console.log("string"); }
  | CHAR                                      { console.log("char"); }
  | VOID                                      { console.log("void"); }
;