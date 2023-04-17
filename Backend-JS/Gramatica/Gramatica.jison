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
[0-9]+\b                        return "intVal";
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
"+"                 return MAS;
"-"                 return MENOS;
"*"                 return POR;
"^"                 return NOTA;
"/"                 return BARRA;
"%"                 return PORCE;
"?"                 return SGP;
"#"                 return NUMERAL;
"++"                return MASMAS;
"--"                return MENOSMENOS;
// Operadores Relacionales
">="                return MAYIGUAL;
">"                 return MAYOR;
"<="                return MENIGUAL;
"<"                 return MENOR;

// Operadores de Comparacion
"=="                return IGUALIGUAL;
"!="                return DIFER;
"="                 return IGUAL;

// Operadores Logicos
"&&"                return Y_DOS;
"&"                 return Y_UNO;
"||"                return OR;
"!"                 return EXCLA;

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
%right 'MENOS'
%left 'NOTA'
%left 'POR' 'BARRA'
%left 'MAS' 'MENOS'
%left 'IGUALIGUAL' 'DIFER' 'MENOR' 'MENIGUAL' 'MAYOR' 'MAYIGUAL'
%left 'Y_DOS'
%left 'OR'
%left 'SGP'
%left 'Y_UNO'
%left 'PORCE'
%right 'MASMAS' 'MENOSMENOS'
%left 'PARABRE' 'PARCIERRA'

%left 'EOF'

%start INIT

%ebnf

%% 
// Gramatica

INIT: SENTENCES EOF       {return $1}          
    | EOF                      
;

SENTENCES
  : SENTENCES SENTENCE    { $1.push($2); $$=$1; }       
  | SENTENCE              { $$ = $1; }                 
;

SENTENCE
  : PRINT                    { $$ = $1;  }   
  | DECLARATION      {   $$ = $1;    }   
  | ASIGNACION     {   $$ = $1;    }      
  | error PTOCOMA           {   console.log("Error");    }             
  | error KEYCLS            {   console.log("Error");    }        
;

PRINT
  : Rprint PARABRE EXP_PRINT PARCIERRA PTOCOMA    {$$ = new Print(@1.first_line, @1.first_column,$3)}		  
;

EXP_PRINT
  : EXP_PRINT MAS EXP_PRINT  {console.log("funciona");}                          
  | PRIMITIVO      {console.log("funciona");} 
  | ID          {console.log("funciona");}                       
;

PRIMITIVO
  : nullVal        
  | intVal        
  | decimalVal      
  | charVal         
  | stringVal      
  | trueVal         
  | falseVal        
;

DECLARATION
  : TIPO ID PTOCOMA                   { $$ = new Declarar($2,$1,null,@1.first_line, @1.first_column ); }
  | TIPO ID IGUAL PRIMITIVO PTOCOMA                  { $$ = new Declarar($2,$1,$4,@1.first_line, @1.first_column ); }
;

ASIGNACION
  : ID IGUAL EXP_ASGPTOCOMA
;

EXP_ASG 
  : PRIMITIVO                                 
  | EXP_ASG MAS EXP_ASG                       
  | ID                                        { console.log($1); }
;

TIPO
  : INT                                       { $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.INT); }
  | DOUBLE                                    { $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.DOUBLE); }
  | BOOLEAN                                   { $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.BOOLEAN); }
  | STRING                                    { $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.STRING); }
  | CHAR                                      { $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.CHAR); }
  | VOID                                      { $$ = new Primitivo(@1.first_line, @1.first_column,$1,Type.VOID); }
;