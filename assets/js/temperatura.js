(function(exports) {
  "use strict";

  // Clase Temperatura
  function Temperatura(valor,tipo)
  {
    Medida.call(this, valor, tipo);
  }

  Temperatura.prototype = new Medida();
  Temperatura.prototype.constructor = Temperatura;

  // Clase Celsius
  function Celsius(valor)
  {
    Temperatura.call(this, valor, "C");

    this.toFahrenheit = function() {
      return new Fahrenheit ((valor * 9/5) + 32);
    };

    this.toKelvin= function() {
      return new Kelvin (valor + 273.15);
    };
  }

  Celsius.prototype = new Temperatura();
  Celsius.prototype.MATCH = /^(?:c(?:e(?:l(?:s(?:i(?:u(?:s)?)?)?)?)?)?)$/i;
  Celsius.prototype.constructor = Celsius;
  Medida.measures["Celsius"] = Celsius;

  // Clase Fahrenheit
  function Fahrenheit(valor)
  {
    Temperatura.call(this,valor,"F");

    this.toCelsius = function() {
      return new Celsius ((valor - 32) * 5/9);
    };

    this.toKelvin = function() {
      return new Kelvin ((valor + 459.67) * 5/9);
    };
  }

  Fahrenheit.prototype = new Temperatura();
  Fahrenheit.prototype.MATCH = /^(?:f(?:a(?:h(?:r(?:e(?:n(?:h(?:e(?:i(?:t)?)?)?)?)?)?)?)?)?)$/i;
  Fahrenheit.prototype.constructor = Fahrenheit;
  Medida.measures["Fahrenheit"] = Fahrenheit;

  // Clase Kelvin
  function Kelvin(valor) {
    Temperatura.call(this, valor, "K");

    this.toCelsius = function() {
      return new Celsius (valor - 273.15);
    };

    this.toFahrenheit = function() {
      return new Fahrenheit ((valor * 9/5) - 459.67);
    };
  }

  Kelvin.prototype = new Temperatura();
  Kelvin.prototype.MATCH = /^(?:k(?:e(?:l(?:v(?:i(?:n)?)?)?)?)?)$/i;
  Kelvin.prototype.constructor = Kelvin;
  Medida.measures["Kelvin"] = Kelvin;

  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Fahrenheit = Fahrenheit;
  exports.Kelvin = Kelvin;
})(this);
