
/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%options case-sensitive

digit                       [0-9]
cor1                        "["
cor2                        "]"
esc                         "\\"
int                         (?:[0-9]|[1-9][0-9]+)
exp                         (?:[eE][-+]?[0-9]+)
frac                        (?:\.[0-9]+)

%%

\s+                             {/* skip whitespace */}
<<EOF>>                         {return 'EOF';}

/* COMENTARIOS */
"//".*                                 {/* IGNORE */}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]    {/* IGNORE */}

/* =================== PALABRAS RESERVADAS =================== */
"true"                          {   return 'ttrue';     }
"false"                         {   return 'tfalse';    }
"int"                           {   return 'tinteger';  }
"boolean"                       {   return 'tboolean';  }
"double"                        {   return 'tdouble';   }
"String"                        {   return 'tstring';   }
"char"                          {   return 'tchar';   }
"if"                            {   return 'tif';       }
"while"                         {   return 'twhile';    }
"for"                           {   return 'tfor';    }
"else"                          {   return 'telse';     }
"void"                          {   return 'tvoid';     }
"return"                        {   return 'treturn';   }
"new"                           {   return 'tnew';     }
"do"                            {   return 'tdo';     }
"list"                          {   return 'tlist';     }                 
"add"                           {   return 'tadd';     }                 
"switch"                        {   return 'tswitch';     }                 
"case"                        {   return 'tcase';     }                 
"default"                        {   return 'tdefault';     }
"toLower"                      {   return 'ttoLower';     }
"toUpper"                      {   return 'ttoUpper';     }
"main"                          {   return 'tmain';     }
"print"                           {   return 'tPrint';    }
"break"                           {   return 'tBreak';    }
"continue"                           {   return 'tContinue';    }

/* =================== EXPRESIONES REGULARES ===================== */
([a-zA-ZÑñ]|("_"[a-zA-ZÑñ]))([a-zA-ZÑñ]|[0-9]|"_")*             yytext = yytext.toLowerCase();          return 'id';
\"(?:[{cor1}|{cor2}]|["\\"]["bnrt/["\\"]]|[^"["\\"])*\"         yytext = yytext.substr(1,yyleng-2);     return 'cadena';
\'(?:{esc}["bfnrt/{esc}]|{esc}"u"[a-fA-F0-9]{4}|[^"{esc}])\'    yytext = yytext.substr(1,yyleng-2);     return 'caracter'
{int}{frac}\b                                                                                           return 'decimal'
{int}\b                                                                                                 return 'entero'

//Error                                                                                              return 'entero'

/* ======================== SIGNOS ======================= */
"$"                             {return '$'};
"."                             {return '.'};
"++"                            {return '++';}
"--"                            {return '--';}
"+"                             {return '+';}
"-"                             {return '-';}
"*"                             {return '*';}
"/"                             {return '/';}
"^"                             {return '^';}
"%"                             {return '%';}
"("                             {return '(';}
")"                             {return ')';}
"=="                            {return '==';}
"="                             {return '=';}
","                             {return ',';}
":"                             {return ':';}
";"                             {return ';';}
"?"                             {return '?';}
"||"                            {return '||';}
"&&"                            {return '&&';}
"!="                            {return '!=';}
"!"                             {return '!';}
"<="                            {return '<=';}
">="                            {return '>=';}
">"                             {return '>';}
"<"                             {return '<';}
"{"                             {return '{';}
"}"                             {return '}';}
"["                             {return '[';}
"]"                             {return ']';}
. { console.log(`El caracter: "${yytext}" no pertenece al lenguaje`); }


/lex

/* ================= ASOCIATIVIDAD y PRECEDENCIA DE OPERADORES ===============
/*Operaciones logicas*/
%left '||'
%left '&&'
%left '?'
%left ':'
%left '++' '--'
%left '!=' '==' '==='
%left '>' '<' '<=' '>='
 
/*Operaciones numericas*/
%left '+' '-'
%left '*' '/' '%'
%right '^' 
%right negativo '!' '(' 



%start INICIO

%% /* language grammar */

INICIO
    : SENTENCIAS EOF{ $$ = { val: 0, node: newNode(yy, yystate, $1.node,'EOF')}; return $$;}
	| EOF{ $$ = { val: 0, node: newNode(yy, yystate,'EOF')}; return $$;}
    ;

SENTENCIAS :    SENTENCIAS SENTENCIA
            {
                $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2.node)};
            }
            |   SENTENCIA
            {
                $$ = { val: 0, node: newNode(yy, yystate, $1.node)};
            }
;

BLOQUE_SENTENCAS : '{' SENTENCIAS '}'
                {
                       $$ = { val: 0, node: newNode(yy, yystate, $1, $2.node,$3)};
                }
                |  '{' '}'
                {
                        $$ = { val: 0, node: newNode(yy, yystate, $1,$2)};
                }
;


SENTENCIA :     DECLARACION ';'             { $$ = { val: 0, node: newNode(yy, yystate, $1.node,$2)}; }
            |   FUNCION                     {$$ = { val: 0, node: newNode(yy, yystate, $1.node)};}
            |   LISTA_ADD                   { $$ = { val: 0, node: newNode(yy, yystate, $1.node)};}
            |   LISTA_MODIFICAR  ';'        { $$ = { val: 0, node: newNode(yy, yystate, $1.node,$2)}; }
            |   ASIGNACION                  { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
            |   VECTOR_ADD                  { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
            |   IF                          { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
            |   LLAMADA_FUNCION  ';'        { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2)}; }
            |   WHILE                       {$$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
            |   FOR                         { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
            |   DO_WHILE                    { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
            |   INCREMENTO       ';'        { $$ = { val: 0, node: newNode(yy, yystate, $1.node,$2)}; }
            |   DECREMENTO       ';'        { $$ = { val: 0, node: newNode(yy, yystate, $1.node,$2)}; }
            |   PRINT                   { $$ = { val: 0, node: newNode(yy, yystate, $1.node)};}
            |   MAIN                     { $$ = { val: 0, node: newNode(yy, yystate, $1.node)};}
            |   RETURN                    { $$ = { val: 0, node: newNode(yy, yystate, $1.node)};}
            |   BREAK                    { $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
            |   CONTINUE                    { $$ = { val: 0, node: newNode(yy, yystate, $1.node)};}
;

MAIN : tmain LLAMADA_FUNCION  ';'  { $$ = { val: 0, node: newNode(yy, yystate, $1,$2.node, $3)}; }
;

PRINT : tPrint '(' LISTA_EXP ')' ';' {  $$ = { val: 0, node: newNode(yy, yystate, $1,$2,$3.node,$4,$5)};  }
;

RETURN  :   treturn ';'                     {$$ = { val: 0, node: newNode(yy, yystate, $1, $2)};  }
        |   treturn EXP ';'                 { $$ = { val: 0, node: newNode(yy, yystate, $1, $2.node,$3)}; }
;

BREAK  :   tBreak ';'                     {  $$ = { val: 0, node: newNode(yy, yystate, $1 , $2)};}
;

RETURN  :   tContinue ';'                     {$$ = { val: 0, node: newNode(yy, yystate, $1 , $2)}; }
;

INCREMENTO : id '++'
            {
              $$ = { val: 0, node: newNode(yy, yystate, $1 , $2)};
            }
;

DECREMENTO : id '--'
            {
                $$ = { val: 0, node: newNode(yy, yystate, $1 , $2)};
            }
;

DECLARACION : TIPO  id  '=' EXP 
            {
                $$ = { val: 0, node: newNode(yy, yystate, $1.node , $2,$3,$4.node)};
            }
            | TIPO  id  
            {
       	 $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2)};
            }
            | TIPO '[' ']' id '=' tnew TIPO '[' entero ']' 
            {
                $$ = { val: 0, node: newNode(yy, yystate, $1.node , $2,$3,$4,$5,$6,$7.node,$8,$9,$10)};
            }
            | TIPO '[' ']' id '=' '{' LISTA_EXP '}' 
            {
                 $$ = { val: 0, node: newNode(yy, yystate, $1.node , $2,$3,$4,$5,$6,$7.node,$8)};
            }
            | tlist '<' TIPO '>' id '=' tnew tlist '<' TIPO '>'
            {
                $$ = { val: 0, node: newNode(yy, yystate, $1 , $2,$3.node,$4,$5,$6,$7,$8,$9,$10.node,$11)};
            }
;

ASIGNACION  :    id '=' EXP ';'
            {
                $$ = { val: 0, node: newNode(yy, yystate, $1, $2,$3.node,$4)};
            }
;

VECTOR_ADD  :   id '[' entero ']' '=' EXP ';'
            {
               $$ = { val: 0, node: newNode(yy, yystate, $1, $2,$3,$4,$5,$6.node,$7)};
            }
;

LISTA_ADD: id '.' tadd '(' EXP ')' ';'
            {
                $$ = { val: 0, node: newNode(yy, yystate, $1, $2,$3,$4,$5.node,$6,$7)};
            }
;

TERNARIA: EXP '?' EXP ':' EXP
        {
         $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node,$4,$5.node)};
        }
;

CASTEO: '(' TIPO ')' EXP
    {
        $$ = { val: 0, node: newNode(yy, yystate, $1, $2.node,$3,$4.node)};
    }
;

LISTA_MODIFICAR: id '[' '[' entero ']' ']' '=' EXP
            {
              $$ = { val: 0, node: newNode(yy, yystate, $1, $2,$3,$4,$5,$6,$7,$8.node)};
            }
;

IF      :   tif '(' EXP ')' BLOQUE_SENTENCAS
        {
            $$ = { val: 0, node: newNode(yy, yystate, $1, $2,$3.node,$4,$5.node)};
        }
        |   tif '(' EXP ')' BLOQUE_SENTENCAS ELSE
        {
             $$ = { val: 0, node: newNode(yy, yystate, $1, $2,$3.node,$4,$5.node,$6.node)};
        }
;
 
ELSE    :   telse IF
        {
            	 $$ = { val: 0, node: newNode(yy, yystate, $1, $2.node)};
        }
        |   telse BLOQUE_SENTENCAS
        {
	 $$ = { val: 0, node: newNode(yy, yystate, $1, $2.node)};
        }
;

DO_WHILE : tdo BLOQUE_SENTENCAS twhile '(' EXP ')' ';'
        {
 	 $$ = { val: 0, node: newNode(yy, yystate, $1, $2.node, $3,$4,$5.node,$6,$7)};
        }
;

FOR     : tfor '(' DECLARACION ';' EXP ';' ACTUALIZACION_FOR ')' BLOQUE_SENTENCAS
        {
          	$$ = { val: 0, node: newNode(yy, yystate, $1, $2,$3.node,$4,$5.node,$6,$7.node,$8,$9.node)};
        }
        | tfor '(' ASIGNACION ';' EXP ';' ACTUALIZACION_FOR ')' BLOQUE_SENTENCAS
        {
           	$$ = { val: 0, node: newNode(yy, yystate, $1, $2,$3.node,$4,$5.node,$6,$7.node,$8,$9.node)};
        }
;

WHILE   : twhile '(' EXP ')' BLOQUE_SENTENCAS
        {
         	$$ = { val: 0, node: newNode(yy, yystate, $1, $2,$3.node,$4,$5.node)};   
        }
;

FUNCION:        TIPO    id '(' LISTA_PARAM ')' BLOQUE_SENTENCAS
            {
                $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3,$4.node,$5,$6.node)};
            }
            |   tvoid   id '(' LISTA_PARAM ')' BLOQUE_SENTENCAS
            {
                 $$ = { val: 0, node: newNode(yy, yystate, $1, $2,$3,$4.node,$5,$6.node)};
            }
            |   TIPO    id '('  ')' BLOQUE_SENTENCAS
            {
                $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3,$4,$5.node)};
            }
            |   tvoid   id '('  ')' BLOQUE_SENTENCAS
            {
               $$ = { val: 0, node: newNode(yy, yystate, $1, $2,$3,$4,$5.node)};
            }
;


TIPO    :       tinteger                    {  $$ = { val: 0, node: newNode(yy, yystate, $1)}; }
        |       tboolean                    {  $$ = { val: 0, node: newNode(yy, yystate, $1)};  }
        |       tstring                     {   $$ = { val: 0, node: newNode(yy, yystate, $1)};  }
        |       tdouble                     {  $$ = { val: 0, node: newNode(yy, yystate, $1)};   }
|       tchar                    {  $$ = { val: 0, node: newNode(yy, yystate, $1)};   }
; 

LISTA_PARAM :   LISTA_PARAM ',' TIPO id
            {
                $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node,$4)}; 
            }
            |   TIPO id
            {
                 $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2)}; 
            }
;

LISTA_EXP : LISTA_EXP ',' EXP
        {
             $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)}; 
        }
        |   EXP
        { 
            $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; 
        }
;

LLAMADA_FUNCION  : id '('  ')' {   $$ = { val: 0, node: newNode(yy, yystate, $1, $2,$3)};   } 
                | id '(' LISTA_EXP ')' {    $$ = { val: 0, node: newNode(yy, yystate, $1, $2,$3.node,$4)};   }
;

ACTUALIZACION_FOR: id '++'
        {
           $$ = { val: 0, node: newNode(yy, yystate, $1,$2)};
        }
        | id '--'
        {
           $$ = { val: 0, node: newNode(yy, yystate, $1,$2)};
        }
;

EXP :   EXP '+' EXP                     { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)}; }
    |   EXP '-' EXP                     { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)};  }
    |   EXP '*' EXP                     { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)};  }
    |   EXP '/' EXP                     {  $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)}; }
    |   EXP '^' EXP                     { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)}; }
    |   '-' EXP %prec negativo          { $$ = { val: 0, node: newNode(yy, yystate, $1, $2.node)};}
    |   '(' EXP ')'                     { $$ = { val: 0, node: newNode(yy, yystate, $1, $2.node, $3)};}
    |   EXP '=='  EXP                   {  $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)}; }
    |   EXP '!='  EXP                   { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)};  }
    |   EXP '<'   EXP                   { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)};  }
    |   EXP '>'   EXP                   { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)}; }
    |   EXP '<='  EXP                   { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)}; }
    |   EXP '>='  EXP                   { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)}; }
    |   EXP '&&'  EXP                   { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)}; }
    |   EXP '||'  EXP                   { $$ = { val: 0, node: newNode(yy, yystate, $1.node, $2,$3.node)};  }
    |   id                              {  $$ = { val: 0, node: newNode(yy, yystate, $1)};    }
    |   id '[' EXP ']'                  {   $$ = { val: 0, node: newNode(yy, yystate, $1,$2, $3.node, $4)};   }
    |   id  '[' '[' EXP ']' ']'         { $$ = { val: 0, node: newNode(yy, yystate, $1, $2,$3,$4.node, $5,$6)};  }
    |   LLAMADA_FUNCION                 {$$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
    |   entero                          {$$ = { val: 0, node: newNode(yy, yystate, $1)}; }
    |   decimal                         {$$ = { val: 0, node: newNode(yy, yystate, $1)};  }
    |   caracter                        {  $$ = { val: 0, node: newNode(yy, yystate, $1)};  }
    |   cadena                          { $$ = { val: 0, node: newNode(yy, yystate, $1)}; }
    |   ttrue                           { $$ = { val: 0, node: newNode(yy, yystate, $1)};  }
    |   tfalse                          { $$ = { val: 0, node: newNode(yy, yystate, $1)};  }
    |   TERNARIA                        { $$ = { val: 0, node: newNode(yy, yystate, $1.node)};  }
    |   CASTEO                          {  $$ = { val: 0, node: newNode(yy, yystate, $1.node)}; }
;