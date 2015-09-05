(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (options) {
    options.color = Asteroid.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    options.radius = Asteroid.RADIUS;
    options.vel = options.vel || Asteroids.Util.randomVec(Asteroid.SPEED);

    Asteroids.MovingObject.call(this, options);
  };

  Asteroid.COLOR = "#505050";
  Asteroid.RADIUS = 7;
  // 25
  Asteroid.SPEED = 4;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    } else {
      var prevVel = [this.vel[0], this.vel[1]]
      this.vel = Asteroids.Util.reboundVelocity(this.vel, otherObject.vel, this.pos, otherObject.pos);
      otherObject.vel = Asteroids.Util.reboundVelocity(otherObject.vel, prevVel, otherObject.pos, this.pos);
    }
  };
})();
