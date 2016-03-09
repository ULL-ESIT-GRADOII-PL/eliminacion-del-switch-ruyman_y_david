(function(exports) {
  "use strict";

  function Longitud(valor, tipo)
  {
    Medida.call(this, valor, tipo);
  }
  Longitud.prototype = new Medida();
  Longitud.prototype.constructor = Temperatura;

  function Metros(valor)
  {
    Longitud.call(this, valor, 'm');
    this.convPulgadas = function() {
      return (valor/0.0254);
    }
  }

  Metros.prototype = new Longitud();
  Metros.prototype.constructor = Metros;

  function Pulgadas(valor)
  {
    Longitud.call(this, valor, 'p');
    this.convMetros = function() {
      return (valor * 0.0254);
    }
  }

  Pulgadas.prototype = new Longitud();
  Pulgadas.prototype.constructor = Pulgadas;

  exports.Longitud = Longitud;
  exports.Metros = Metros;
  exports.Pulgadas = Pulgadas;
})(this);
