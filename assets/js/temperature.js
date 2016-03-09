(function(exports) {
  "use strict";
  function Temperatura(valor,tipo)
  {
    Medida.call(this, valor, tipo);
    /* tipo es opcional. Debería admitir new Medida("45.2 F") */
  }

  Temperatura.prototype = new Medida();
  Temperatura.prototype.constructor = Temperatura;
/*https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Function/call*/

/*Las conversiones de temperatura se han sacado de: https://es.wikipedia.org/wiki/Temperatura*/
  function Celsius(valor)
  {
    Temperatura.call(this,valor,"c");
    /*celsius hereda de temperatura y llama al constructor ponindo por defecto la c en tipo*/
    this.convFahrenheit = function() {
      return ((valor * 9/5) + 32);
    };

    this.convKelvin = function() {
      return (valor + 273.15);
    };
  }

  Celsius.prototype = new Temperatura();
  Celsius.prototype.constructor = Celsius;

  function Fahrenheit(valor)
  {
    Temperatura.call(this,valor,"f");
    this.convCelsius = function() {
      return ((valor - 32) * 5/9);
    };
    this.convKelvin = function() {
      return((valor + 459.67) * 5/9);
    };
  }

  Fahrenheit.prototype = new Temperatura();
  Fahrenheit.prototype.constructor = Fahrenheit;

  function Kelvin(valor) {
    Temperatura.call(this, valor, "k");
    this.convCelsius = function() {
      return(valor - 273.15);
    };
    this.convFahrenheit = function() {
      return(valor * 9/5 - 459.67);
    };
  }

  Kelvin.prototype = new Temperatura();
  Kelvin.prototype.constructor = Kelvin;
})(this);
