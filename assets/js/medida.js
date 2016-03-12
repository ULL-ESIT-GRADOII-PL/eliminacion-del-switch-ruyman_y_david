(function(exports) {
  "use strict";

  function Medida (valor, tipo) {
    if (valor && tipo)
    {
      this.tipo = tipo;
      this.valor = valor;
    } else if (valor) {
      this.valor = valor
    }
  }

  Medida.REGEXP = XRegExp('^\\s*(?<numero> [-+]?\\d+(?:.\\d*)?)   # NUMERO      \n' +
                          '\\s*(?:e(?<exponente> [-+]?\\d+))?     # EXPONENTE   \n' +
                          '\\s*(?<tipo> ([A-Z]+))                 # TIPO        \n' +
                          '((?:\\s+to)?\\s+(?<destino> ([A-Z]+))  # TO          \n' +
                          ')?\\s*$', 'xi');

  Medida.measures = new Object();

  Medida.prototype.toString = function () {
    return this.valor.toFixed(2) + ' ' + this.constructor.name;
  }

  Medida.prototype.esPrefijo = function (prefijo) {
    if (prefijo && prefijo.match (this.MATCH)) {
      return true;
    }
    return false;
  }

  Medida.convertir = function(valor) {
    var measures = Medida.measures;

    var match = XRegExp.exec (valor, Medida.REGEXP);
    if (match) {
      var numero = parseFloat (match.numero),
          exponente = match.exponente,
          tipo   = match.tipo,
          destino = match.destino;

      // Calculamos el exponente
      if (exponente) {
        numero = numero * Math.pow (10, parseInt (exponente));
      }

      // Si no se ha introducido destino, le indicamos el mismo que el tipo
      if (!destino) {
        destino = tipo;
      }

      // Buscamos el tipo
      var ok = false;
      var i = 0;
      var keys = Object.keys(measures);
      while (i < keys.length && !ok) {
        if (measures[keys[i]].prototype.esPrefijo (tipo)) {
          ok = true;
          tipo = measures[keys[i]].name
        }
        i++;
      }
      // Buscamos el destino
      ok = false;
      i = 0;
      while (i < keys.length && !ok && destino) {
        if (measures[keys[i]].prototype.esPrefijo (destino)) {
          ok = true;
          destino = measures[keys[i]].name
        }
        i++;
      }

      try {
          if (tipo != destino) {
            var source = new measures[tipo](numero);  // new Fahrenheit(32)
            var target = "to" + measures[destino].name; // "toCelsius"
            return source[target]();
          } else {
            source = new measures[tipo](numero)
            return source;
          }
      }
      catch(err) {
        return 'Desconozco como convertir desde "' + tipo + '" hasta "' + destino + '"';
      }
    }
    else
      return "Introduzca una temperatura valida: 330e-1 Fahrenheit to Celsius";
  };
  exports.Medida = Medida;
})(this);
