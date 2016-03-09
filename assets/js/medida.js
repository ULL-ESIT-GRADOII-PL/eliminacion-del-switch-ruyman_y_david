(function(exports) {
  "use strict";

  function Medida (valor, tipo) {
    this.tipo = tipo;
    this.valor = valor;
  }

  Medida.prototype.REGEXP = XRegExp('^\\s*(?<number> [-+]?\\d+(?:.\\d*)?)                            # NUMERO           \n' +
                                    '\\s*(?:e(?<exp> [-+]?\\d+))?                                   # EXPONENTE         \n' +
                                    '\\s*(?<type> (                                                 # INICIO DEL TIPO   \n' +
                                    '(?:f(?:a(?:h(?:r(?:e(?:n(?:h(?:e(?:i(?:t)?)?)?)?)?)?)?)?)?)|     # fahrenheit      \n' +
                                      '(?:c(?:e(?:l(?:s(?:i(?:u(?:s)?)?)?)?)?)?)|                     # celsius         \n' +
                                      '(?:k(?:e(?:l(?:v(?:i(?:n)?)?)?)?)?)|                           # kelvin          \n' +
                                      '(?:m(?:e(?:t(?:r(?:o(?:s)?)?)?)?)?)|                           # metros          \n' +
                                      '(?:p(?:u(?:l(?:g(?:a(?:d(?:a(?:s)?)?)?)?)?)?)?)                # pulgadas        \n' +
                                    '))                                                             # FIN DEL TIPO      \n' +
                                    '((?:\\s+to)?\\s+(?<to> (                                       # TO                \n' +
                                      '(?:f(?:a(?:h(?:r(?:e(?:n(?:h(?:e(?:i(?:t)?)?)?)?)?)?)?)?)?)|   # fahrenheit      \n' +
                                      '(?:c(?:e(?:l(?:s(?:i(?:u(?:s)?)?)?)?)?)?)|                     # celsius         \n' +
                                      '(?:k(?:e(?:l(?:v(?:i(?:n)?)?)?)?)?)|                           # kelvin          \n' +
                                      '(?:m(?:e(?:t(?:r(?:o(?:s)?)?)?)?)?)|                           # metros          \n' +
                                      '(?:p(?:u(?:l(?:g(?:a(?:d(?:a(?:s)?)?)?)?)?)?)?)                # pulgadas        \n' +
                                    ')))?\\s*$', 'xi');

  Medida.convertir = function(value) {
    var valor = XRegExp.exec(value, Medida.prototype.REGEXP);

    if (valor) {
      var numero = parseFloat(valor.number),
          tipo  = valor.type[0].toLowerCase(),
          to = valor.to;

      to && (to = to[0].toLowerCase());

      // Calculamos exponente si lo hay
      if (valor.exp) {
        var exp = parseInt(valor.exp);
        numero = numero * Math.pow(10, exp);
      }

      console.log("Valor: " + numero + ", Tipo: " + tipo);

      switch (tipo) {
        case 'c':
          var celsius = new Celsius(numero);
          if (!to || to == 'f') {
            return celsius.convFahrenheit().toFixed(2) + " Farenheit";
          } else if (to == 'k') {
            return celsius.convKelvin().toFixed(2) + " Kelvin";
          } else {
            return "Error! Conversión no permitida";
          }
          break;
        case 'f':
          var fahrenheit = new Fahrenheit(numero);
          if (!to || to == 'c') {
            return fahrenheit.convCelsius().toFixed(2) + " Celsius";
          } else if (to == 'k') {
            return fahrenheit.convKelvin().toFixed(2) + " Kelvin";
          } else {
            return "Error! Conversión no permitida";
          }
          break;
        case 'k':
          var kelvin = new Kelvin(numero);
          if (!to || to == 'c') {
            return kelvin.convCelsius().toFixed(2) + " Celsius";
          } else if (to == 'f') {
            return kelvin.convFahrenheit().toFixed(2) + " Farenheit";
          } else {
            return "Error! Conversión no permitida";
          }
          break;
        case 'm':
          var metro = new Metros(numero);
          if (!to || to == 'p') {
            return metro.convPulgadas().toFixed(2) + " Pulgadas";
          } else {
            return "Error! Conversión no permitida";
          }
          break;
        case 'p':
          var pulgada = new Pulgadas(numero);
          if (!to || to == 'm') {
            return pulgada.convMetros().toFixed(2) + " Metros";
          } else {
            return "Error! Conversión no permitida";
          }
          break;
        default:
          /* rellene este código */
          return "Error! El uso corecto es por ejemplo: -3.7C.";
      }
    }
    else
      return "Error! El uso corecto es por ejemplo: -3.7C.";
  }
  exports.Medida = Medida;
})(this);
