(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    // this.ship = this.game.addShip();
    this.timerId = null;
  };

  GameView.prototype.moves = function () {
    // var vel = this.game.ships[0].vel
    // if (vel[0] === 0 && vel[1] === 0) {

      return {"w": [0, -5],
      "a": [-5, 0],
      "s": [0, 5],
      "d": [ 5,  0],
      }
    // }
    // else {
    //   var norm = Asteroids.Util.norm(vel) * .01;
    //   return {"w": [vel[0] * norm, vel[1] * norm],
    //   "a": [-vel[0] * norm, vel[1] * norm],
    //   "s": [vel[1] * norm, -vel[0] * norm],
    //   "d": [-vel[1] * norm,  vel[0] * norm],
    //   }
    // }
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;
    var self = this;
    Object.keys(self.moves()).forEach(function (k) {
      var move = self.moves()[k];
      key(k, function () { ship.power(move); });
    });

    key("space", function () { ship.fireBullet() });
  };

  GameView.prototype.start = function () {
    var gameView = this;
    gameView.bindKeyHandlers();
    this.timerId = setInterval(
      function () {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
        // gameView.bindKeyHandlers();
      }, 1000 / Asteroids.Game.FPS
    );
  };


  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };
})();
