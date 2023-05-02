%{
    let Raiz                        =   require("../Entorno/Raiz").Raiz;
    let Tipo                        =   require("../Entorno/Simbolos/Tipo").Tipo;
    let TipoPrimitivo               =   require("../Entorno/Simbolos/TipoPrimitivo").TipoPrimitivo;
    let DeclararVariable            =   require("../Instrucciones/DeclararVariable").DeclararVariable; 
    let DeclararFuncion             =   require("../Instrucciones/DeclararFuncion").DeclararFuncion;
    let DeclararArreglo             =   require("../Instrucciones/DeclararArreglo").DeclararArreglo;
    let DeclararLista               =   require("../Instrucciones/DeclararLista").DeclararLista;
    let Asignacion                  =   require("../Instrucciones/Asignacion").Asignacion;
    let AsignacionVector            =   require("../Instrucciones/AsignacionVector").AsignacionVector;
    let Ternario                    =   require("../Expresiones/Ternario").Ternario;
    let If                          =   require("../Instrucciones/If").If;
    let FuncionLenguaje             =   require("../Expresiones/FuncionLenguaje").FuncionLenguaje;
    let AccesoVariable              =   require("../Expresiones/AccesoVariable").AccesoVariable;
    let AccesoLista                 =   require("../Expresiones/AccesoLista").AccesoLista;
    let AccesoVector                =   require("../Expresiones/AccesoVector").AccesoVector;
    let LlamadaFuncion              =   require("../Expresiones/LlamadaFuncion").LlamadaFuncion;
    let LlamadaPrint                =   require("../Expresiones/LlamadaPrint").LlamadaPrint;
    let OperacionAritmetica         =   require("../Expresiones/OperacionAritmetica").OperacionAritmetica;
    let OperacionLogica             =   require("../Expresiones/OperacionLogica").OperacionLogica;
    let OperacionRelacional         =   require("../Expresiones/OperacionRelacional").OperacionRelacional;
    let While                       =   require("../Instrucciones/While").While;
    let ReturnPR                    =   require("../Expresiones/ReturnPR").ReturnPR;
    let Break                       =   require("../Expresiones/Break").Break;
    let Continue                    =   require("../Expresiones/Continue").Continue;
    let Valor                       =   require("../Expresiones/Valor").Valor;
    let Incremento                  =   require("../Instrucciones/Incremento").Incremento;
    let Decremento                  =    require("../Instrucciones/Decremento").Decremento;
    let Switch                      =   require("../Instrucciones/Switch").Switch;
    let CaseSwitch                  =    require("../Instrucciones/CaseSwitch").CaseSwitch;
    let For                         =    require("../Instrucciones/For").For;
    let DoWhile                     =   require("../Instrucciones/DoWhile").DoWhile;
    let Casteo                      =    require("../Expresiones/Casteo").Casteo;
    let InsertarLista               =    require("../Instrucciones/InsertarLista").InsertarLista;
    let ModificarLista              =    require("../Instrucciones/ModificarLista").ModificarLista;
%}
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
"truncate"                      {   return 'ttruncate';     }
"round"                      {   return 'tround';     }
"length"                      {   return 'tlength';     }
"typeOf"                      {   return 'ttypeOf';     }
"toString"                      {   return 'ttoString';     }
"toCharArray"                      {   return 'ttoCharArray';     }
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
    : SENTENCIAS EOF
    {
        console.log("Parse de Jison entrada: OK ");
        let raiz = new Raiz($1);
        $$ = raiz;
        return raiz;
    }
    ;

SENTENCIAS :    SENTENCIAS SENTENCIA
            {
                $1.push($2);
                $$ = $1;
            }
            |   SENTENCIA
            {
                let lstsent = [];
                lstsent.push($1);
                $$ = lstsent;
            }
;

BLOQUE_SENTENCAS : '{' SENTENCIAS '}'
                {
                       $$ = $2;
                }
                |  '{' '}'
                {
                        $$ = [];
                }
;


SENTENCIA :     DECLARACION ';'             { $$ = $1; }
            |   FUNCION                     { $$ = $1; }
            |   LISTA_ADD                   { $$ = $1; }
            |   LISTA_MODIFICAR  ';'        { $$ = $1; }
            |   ASIGNACION                  { $$ = $1; }
            |   VECTOR_ADD                  { $$ = $1; }
            |   IF                          { $$ = $1; }
            |   LLAMADA_FUNCION  ';'        { $$ = $1; }
            |   WHILE                       { $$ = $1; }
            |   FOR                         { $$ = $1; }
            |   DO_WHILE                    { $$ = $1; }
            |   INCREMENTO       ';'        { $$ = $1; }
            |   DECREMENTO       ';'        { $$ = $1; }
            |   PRINT       ';'             { $$ = $1; }
            |   MAIN ';'                    { $$ = $1; }
            |   RETURN                    { $$ = $1; }
            |   BREAK                    { $$ = $1; }
            |   CONTINUE                    { $$ = $1; }
            |   SWITCH                    { $$ = $1; }
;

SWITCH
  : tswitch '(' EXP ')' BLOCK_SWITCH { $$ = new Switch($3, $5, @1.first_line, @1.first_column); }
;

BLOCK_SWITCH
  : '{'  L_CASE '}'         { $$ = $2; }
  | '{' '}'                { $$ = []; }
;

L_CASE
  : L_CASE CASES  { $$=$1; $$.push($2);}
  | CASES         { $$=[]; $$.push($1); }
;

CASES
  : tcase EXP BLOCK_CASES        { $$ = new CaseSwitch($2, $3, this._$.first_line, this._$.first_column);}
  | tdefault BLOCK_CASES         { $$ = new CaseSwitch(null, $2, this._$.first_line, this._$.first_column);}
;

BLOCK_CASES
  : ':' SENTENCIAS       { $$ = $2; }
  | ':'                 { $$ = []; }
;

MAIN : tmain LLAMADA_FUNCION    { $$ = $2; }
;

PRINT : tPrint '(' LISTA_EXP ')' { $$ = new LlamadaPrint($1, $3, @1.first_line, @1.first_column);    }
;

RETURN  :   treturn ';'                     { $$ = new ReturnPR(undefined,@2.first_line, @2.first_column); }
        |   treturn EXP ';'                 {  $$ = new ReturnPR($2,@2.first_line, @2.first_column);}
;

BREAK  :   tBreak ';'                     { $$ = new Break(@2.first_line, @2.first_column); }
;

RETURN  :   tContinue ';'                     { $$ = new Continue(@2.first_line, @2.first_column); }
;

INCREMENTO : id '++'
            {
                $$ = new Incremento($1, @1.first_line, @1.first_column)
            }
;

DECREMENTO : id '--'
            {
                $$ = new Decremento($1, @1.first_line, @1.first_column)
            }
;

DECLARACION : TIPO  id  '=' EXP 
            {
                $$ = new DeclararVariable($1, $2, $4, @2.first_line, @2.first_column);
            }
            | TIPO  id  
            {
                $$ = new DeclararVariable($1, $2, undefined, @2.first_line, @2.first_column);
            }
            | TIPO '[' ']' id '=' tnew TIPO '[' EXP ']' 
            {
                $$ = new DeclararArreglo($1, $4, $7,undefined, $9, @2.first_line, @2.first_column);
            }
            | TIPO '[' ']' id '=' '{' LISTA_EXP '}' 
            {
                $$ = new DeclararArreglo($1, $4,undefined, $7,undefined, @2.first_line, @2.first_column);
            }
            | tlist '<' TIPO '>' id '=' tnew tlist '<' TIPO '>'
            {
                $$ = new DeclararLista($3, $5, $10,undefined, @2.first_line, @2.first_column);
            }
            | tlist '<' TIPO '>' id '=' EXP
            {
                $$ = new DeclararLista($3, $5, undefined, $7,  @2.first_line, @2.first_column);
            }
;

ASIGNACION  :    id '=' EXP ';'
            {
                $$ = new Asignacion($1, $3, @1.first_line, @1.first_column);
            }
;

VECTOR_ADD  :   id '[' EXP ']' '=' EXP ';'
            {
                $$ = new AsignacionVector($1, $6, $3,@1.first_line, @1.first_column);
            }
;

LISTA_ADD: id '.' tadd '(' EXP ')' ';'
            {
                $$ = new InsertarLista($1, $5, @1.first_line, @1.first_column);
            }
;

TERNARIA: EXP '?' EXP ':' EXP
        {
            $$ = new Ternario($1, $3, $5, @1.first_line, @1.first_column);
        }
;

CASTEO: '(' TIPO ')' EXP
    {
        $$ = new Casteo($2, $4, @1.first_line, @1.first_column);
    }
;

LISTA_MODIFICAR: id '[' '[' EXP ']' ']' '=' EXP
            {
                $$ = new ModificarLista($1, $4, $8, @1.first_line, @1.first_column);
            }
;

IF      :   tif '(' EXP ')' BLOQUE_SENTENCAS
        {
            $$ = new If($3, $5, [], @1.first_line, @1.first_column);
        }
        |   tif '(' EXP ')' BLOQUE_SENTENCAS ELSE
        {
            $$ = new If($3, $5, $6, @1.first_line, @1.first_column);
        }
;
 
ELSE    :   telse IF
        {
            let else_sent = [];
            else_sent.push($2);
            $$ = else_sent;
        }
        |   telse BLOQUE_SENTENCAS
        {
            $$ = $2;
        }
;

DO_WHILE : tdo BLOQUE_SENTENCAS twhile '(' EXP ')' ';'
        {
            $$ = new DoWhile($2, $5, @1.first_line, @1.first_column );
        }
;

FOR     : tfor '(' DECLARACION ';' EXP ';' ACTUALIZACION_FOR ')' BLOQUE_SENTENCAS
        {
            $$ = new For($3, $5, $7, $9, @1.first_line, @1.first_column );
        }
        | tfor '(' ASIGNACION ';' EXP ';' ACTUALIZACION_FOR ')' BLOQUE_SENTENCAS
        {
            $$ = new For($3, $5, $7, $9, @1.first_line, @1.first_column );
        }
;

WHILE   : twhile '(' EXP ')' BLOQUE_SENTENCAS
        {
            $$ = new While($3, $5, @1.first_line, @1.first_column );
        }
;

FUNCION:        TIPO    id '(' LISTA_PARAM ')' BLOQUE_SENTENCAS
            {
                $$ = new DeclararFuncion($1, $2, $4, $6, @2.first_line, @2.first_column);
            }
            |   tvoid   id '(' LISTA_PARAM ')' BLOQUE_SENTENCAS
            {
                $$ = new DeclararFuncion(new Tipo(TipoPrimitivo.Void), $2, $4, $6, @2.first_line, @2.first_column);
            }
            |   TIPO    id '('  ')' BLOQUE_SENTENCAS
            {
                $$ = new DeclararFuncion($1, $2, [], $5, @2.first_line, @2.first_column);
            }
            |   tvoid   id '('  ')' BLOQUE_SENTENCAS
            {
                $$ = new DeclararFuncion(new Tipo(TipoPrimitivo.Void), $2, [], $5, @2.first_line, @2.first_column);
            }
;


TIPO    :       tinteger                    { $$ = new Tipo(TipoPrimitivo.Integer); }
        |       tboolean                    { $$ = new Tipo(TipoPrimitivo.Boolean); }
        |       tstring                     { $$ = new Tipo(TipoPrimitivo.String);  }
        |       tdouble                     { $$ = new Tipo(TipoPrimitivo.Double);  }
; 

LISTA_PARAM :   LISTA_PARAM ',' TIPO id
            {
                let decla=new DeclararVariable($3, $4, undefined, @1.first_line, @1.first_column)
                $1.push(decla);
                $$ = $1;
            }
            |   TIPO id
            {
                let decla1 = new DeclararVariable($1, $2, undefined, @1.first_line, @1.first_column);
                let params = [];
                params.push(decla1);
                $$ = params;
            }
;

LISTA_EXP : LISTA_EXP ',' EXP
        {
            $1.push($3);
            $$ = $1;
        }
        |   EXP
        { 
            let lista_exp = [];
            lista_exp.push($1);
            $$ = lista_exp;
        }
;

LLAMADA_FUNCION  : id '('  ')' { $$ = new LlamadaFuncion($1, [], @1.first_line, @1.first_column);    } 
                | id '(' LISTA_EXP ')' { $$ = new LlamadaFuncion($1, $3, @1.first_line, @1.first_column);    }
;

ACTUALIZACION_FOR: id '++'
        {
           $$ = new Incremento($1, @1.first_line, @1.first_column)
        }
        | id '--'
        {
           $$ = new Decremento($1, @1.first_line, @1.first_column) 
        }
        | id '=' EXP
        {
           $$ = new Asignacion($1, $3, @1.first_line, @1.first_column); 
        }
;

FUNCIONES_LENGUAJE
    : ttoLower '(' EXP ')' {$$ = new FuncionLenguaje($1, $3, @1.first_line, @1.first_column);}
    | ttoUpper '(' EXP ')' {$$ = new FuncionLenguaje($1, $3, @1.first_line, @1.first_column);}
    | ttruncate '(' EXP ')' {$$ = new FuncionLenguaje($1, $3, @1.first_line, @1.first_column);}
    | tround '(' EXP ')' {$$ = new FuncionLenguaje($1, $3, @1.first_line, @1.first_column);}
    | ttoCharArray '(' EXP ')' {$$ = new FuncionLenguaje($1, $3, @1.first_line, @1.first_column);}
    | ttoString '(' EXP ')' {$$ = new FuncionLenguaje($1, $3, @1.first_line, @1.first_column);}
    | ttypeOf '(' EXP ')' {$$ = new FuncionLenguaje($1, $3, @1.first_line, @1.first_column);}
    | tlength '(' EXP ')' {$$ = new FuncionLenguaje($1, $3, @1.first_line, @1.first_column);}
;

EXP :   EXP '+' EXP                     { $$ = new OperacionAritmetica($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXP '-' EXP                     { $$ = new OperacionAritmetica($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXP '*' EXP                     { $$ = new OperacionAritmetica($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXP '/' EXP                     { $$ = new OperacionAritmetica($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXP '^' EXP                     { $$ = new OperacionAritmetica($1, $2, $3, @2.first_line, @2.first_column);}
    |   '-' EXP %prec negativo          { $$ = new OperacionAritmetica($2, "negativo", $2, @2.first_line, @2.first_column);}
    |   '(' EXP ')'                     { $$ = $2;}
    |   EXP '%' EXP                     { $$ = new OperacionAritmetica($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXP '=='  EXP                   { $$ = new OperacionRelacional($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXP '!='  EXP                   { $$ = new OperacionRelacional($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXP '<'   EXP                   { $$ = new OperacionRelacional($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXP '>'   EXP                   { $$ = new OperacionRelacional($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXP '<='  EXP                   { $$ = new OperacionRelacional($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXP '>='  EXP                   { $$ = new OperacionRelacional($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXP '&&'  EXP                   { $$ = new OperacionLogica($1, $2, $3, @2.first_line, @2.first_column);}
    |   EXP '||'  EXP                   { $$ = new OperacionLogica($1, $2, $3, @2.first_line, @2.first_column);}
    |   id                              { $$ = new AccesoVariable($1, @1.first_line, @1.first_column);        }
    |   id '[' EXP ']'                  { $$ = new AccesoVector($1, $3,@1.first_line, @1.first_column);        }
    |   id  '[' '[' EXP ']' ']'         { $$ = new AccesoLista($1, $4, @1.first_line, @1.first_column);}
    |   LLAMADA_FUNCION                 { $$ = $1;}
    |   entero                          { $$ = new Valor($1, "integer", @1.first_line, @1.first_column);}
    |   decimal                         { $$ = new Valor($1, "double", @1.first_line, @1.first_column); }
    |   caracter                        { $$ = new Valor($1, "char", @1.first_line, @1.first_column);   }
    |   cadena                          { $$ = new Valor($1, "string", @1.first_line, @1.first_column); }
    |   ttrue                           { $$ = new Valor($1, "true", @1.first_line, @1.first_column);   }
    |   tfalse                          { $$ = new Valor($1, "false", @1.first_line, @1.first_column);  }
    |   TERNARIA                        { $$ = $1;}
    |   CASTEO                          { $$ = $1;}
    |   FUNCIONES_LENGUAJE              { $$ = $1;}
;