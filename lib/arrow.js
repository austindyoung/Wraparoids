(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Arrow = Asteroids.Arrow = function (options) {
    this.dimension = options.dimension;
    this.side = options.side;
    this.orientation = options.orientation;
    this.color = options.color;
    this.game = options.game;
    this.width = options.width;
  };

  // Arrow.protoype.dimOrWidth = function (n) {
  //   if (this.dimension === 0 && n === 0) {
  //     return this.game.DIMS[0]
  //   } else if (this.dimension === 0) {
  //     return this.width
  //   } else if (n === 1) {
  //     return this.game.DIMS[1]
  //   } else {
  //     return this.width
  //   }
  // };
  //
  // Arrow.protoype.pos = function () {
  //   var pos = [0,0];
  //   if (!this.dimension && !side) {
  //     pos = [0,0];
  //   } else if (!this.dimension && side) {
  //     pos = [0, this.game.DIMS[1] - this.width];
  //   } else if (this.dimension && !side) {
  //     pos = [0,0];
  //   } else {
  //     pos = [this.game.DIMS[1] - this.width, 0]
  //   }
  //   return pos;
  // }

  Arrow.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.rect(
      this.pos()[0], this.pos[1], this.dimOrWidth(0), this.dimOrWidth(1)
    );
    ctx.fill();
  };

})();
