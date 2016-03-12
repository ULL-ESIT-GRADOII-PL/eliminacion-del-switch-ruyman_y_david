(function(exports) {
  "use strict";

  // Clase Longitud
  function Longitud(valor, tipo)
  {
    Medida.call(this, valor, tipo);
  }

  Longitud.prototype = new Medida();
  Longitud.prototype.constructor = Temperatura;

  // Clase Metros
  function Metros(valor)
  {
    Longitud.call(this, valor, 'M');
    this.toPulgadas = function() {
      return new Pulgadas (valor/0.0254);
    }
  }

  Metros.prototype = new Longitud();
  Metros.prototype.MATCH = /(?:m(?:e(?:t(?:r(?:o(?:s)?)?)?)?)?)/i;
  Metros.prototype.constructor = Metros;
  Medida.measures["Metros"] = Metros;

  // Clase Pulgadas
  function Pulgadas(valor)
  {
    Longitud.call(this, valor, 'P');
    this.toMetros = function() {
      return new Metros (valor * 0.0254);
    }
  }

  Pulgadas.prototype = new Longitud();
  Pulgadas.prototype.MATCH = /(?:p(?:u(?:l(?:g(?:a(?:d(?:a(?:s)?)?)?)?)?)?)?)/i;
  Pulgadas.prototype.constructor = Pulgadas;
  Medida.measures["Pulgadas"] = Pulgadas;

  exports.Longitud = Longitud;
  exports.Metros = Metros;
  exports.Pulgadas = Pulgadas;
})(this);
