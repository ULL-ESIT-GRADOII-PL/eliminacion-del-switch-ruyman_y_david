(function(exports) {
  "use strict";
    function Medida(valor,tipo)
    {
     if(!tipo) {
       exp = XRegExp('(?<number>      ((-|\\+)?(\\d+)(\.(\\d+))?)(e((-|\\+)?(\\d+)(\\.(\\d+))?)))?\\s*$   # numero       \n'
                   + '(?<temperature1>    [fkcpmFKCPM])\\s*                                                   # tipo'),
       aux = XRegExp.exec(valor, exp);
       this.valor = aux.number;
       this.tipo = aux.temperature1;
     }
     else {
       this.valor = valor;
       this.tipo = tipo;
     }
    }
    exports.Medida = Medida;
})(this);
