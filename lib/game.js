(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function (ctx) {
      // this.wrapping = [[1,0], [0,0], [3,0], [2,0]];
    // this.wrapping = [[3,0], [2,0], [1,0], [0,0]];
    this.ctx = ctx;
    this.wrapping = [
      [Math.floor(Math.random() * 4), Math.floor(Math.random() * 2)],
      [Math.floor(Math.random() * 4), Math.floor(Math.random() * 2)],
      [Math.floor(Math.random() * 4), Math.floor(Math.random() * 2)],
      [Math.floor(Math.random() * 4), Math.floor(Math.random() * 2)],
    ]

    setInterval(function () {
      this.wrapping = [[Math.floor(Math.random() * 4), Math.floor(Math.random() * 2)],
      [Math.floor(Math.random() * 4), Math.floor(Math.random() * 2)],
      [Math.floor(Math.random() * 4), Math.floor(Math.random() * 2)],
      [Math.floor(Math.random() * 4), Math.floor(Math.random() * 2)]]
    }.bind(this), 5000);
    // this.wrapping = [[3,1], [2,1], [1,1], [0,1]];
    // this.wrapping = [[1,0], [1, 0], [1, 0], [1, 0]];
    // soure
    // this.wrapping = [[1,1], [1, 1], [1, 1], [1, 1]];
    // this.wrapping = [[2, 1], [3, 0], [0, 1], [1, 0]];
    // moebius
    // this.wrapping = [[2, 1], [3, 1], [0, 1], [1, 1]];
    // real projective
    // this.wrapping = [[3,1], [2,1], [1,1], [0,1]];
    // source
    // this.wrapping = [[2,1], [3,1], [0,1], [1,1]];
    // this.wrapping = [[1, 0], [3,0], [1,0], [1,0]];
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];
    this.arrows = []
    // var arrow = new Asteroids.Arrow({
    //   dimension: 0,
    //   side: 0,
    //   orientation: 0,
    //   color: "#fff",
    //   game: this,
    //   width: 50
    // });


    this.addAsteroids();
  };



  Game.BG_COLOR = "#000000";
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.DIMS = [Game.DIM_X, Game.DIM_Y];
  Game.FPS = 40;
  Game.NUM_ASTEROIDS = 600;
  Game.WALL_VALS = [0, 0, 1, 1];
  Game.SIDE_TO_COLOR = ["#3369E8", "#EEB211", "#D50F25", "#009925"]

  Game.prototype.add = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Asteroids.Ship) {
      this.ships.push(object);
    } else {
      throw "wtf?";
    }
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid({ game: this }));
    }
  };

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship({
      pos: this.randomPosition(),
      game: this
    });

    this.add(ship);

    return ship;
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.ships, this.asteroids, this.bullets, this.arrows);
  };

  Game.prototype.checkCollisions = function () {
    var game = this;
    var objects = this.allObjects()
    for(var i = 0; i < objects.length; i++) {
      for(var j = i + 1; j < objects.length; j++) {
        if (objects[i].isCollidedWith(objects[j])) {
          objects[i].collideWith(objects[j]);
        }
      }
    }
    //
    // this.allObjects().forEach(function (obj1, i) {
    //   game.allObjects().forEach(function (obj2, j) {
    //     if (obj1 == obj2) {
    //       // don't allow self-collision
    //       return;
    //     }
    //
    //     if (obj1.isCollidedWith(obj2)) {
    //       obj1.collideWith(obj2);
    //     }
    //   });
    // });
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

// bottom
    ctx.fillStyle = "#009925";
    ctx.fillRect(0,Game.DIM_Y - 17,Game.DIM_X, 20);

//right
    ctx.fillStyle = "#D50F25";
    ctx.fillRect(Game.DIM_X - 17,0,20,Game.DIM_Y);

// top
    ctx.fillStyle = "#EEB211";
    ctx.fillRect(0,0,Game.DIM_X, 16);

//left
    ctx.fillStyle =  "#3369E8";
    ctx.fillRect(0,0,17,Game.DIM_Y - 17);


    var left_map_color = Game.SIDE_TO_COLOR[this.wrapping[0][0]];

    var left_map_inverted = this.wrapping[0][1];

    var top_map_color = Game.SIDE_TO_COLOR[this.wrapping[1][0]];

    var top_map_inverted = this.wrapping[1][1];

    var right_map_color = Game.SIDE_TO_COLOR[this.wrapping[2][0]];

    var right_map_inverted = this.wrapping[2][1];

    var bottom_map_color = Game.SIDE_TO_COLOR[this.wrapping[3][0]];

    var bottom_map_inverted = this.wrapping[3][1];


    ctx.fillStyle = left_map_color;
    ctx.fillRect(0, Game.DIM_Y * 3 / 8, 17,Game.DIM_Y / 4);
     if (left_map_inverted) {
       ctx.fillStyle = "#FFFFFF"
       ctx.fillRect(0, (Game.DIM_Y / 2) - 10, 17,20);
     };

    ctx.fillStyle = right_map_color;
    ctx.fillRect(Game.DIM_X - 17, Game.DIM_Y * 3 / 8, 17,Game.DIM_Y / 4);
    if (right_map_inverted) {
      ctx.fillStyle = "#FFFFFF"
      ctx.fillRect(Game.DIM_X - 17, (Game.DIM_Y / 2) - 10, 17,20);
    };

    ctx.fillStyle = top_map_color;
    ctx.fillRect(Game.DIM_X * 3 / 8, 0, Game.DIM_X / 4, 16);
    if (right_map_inverted) {
      ctx.fillStyle = "#FFFFFF"
      ctx.fillRect(Game.DIM_X / 2 - 10, 0, 17,16);
    };

    ctx.fillStyle = bottom_map_color;
    ctx.fillRect(Game.DIM_X * 3 / 8, Game.DIM_Y - 17, Game.DIM_X / 4, 17);
    if (right_map_inverted) {
      ctx.fillStyle = "#FFFFFF"
      ctx.fillRect(Game.DIM_X / 2 - 10, Game.DIM_Y - 17, 17,16);
    };

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.randomPosition = function () {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroids.Asteroid) {
      var idx = this.asteroids.indexOf(object);
      this.asteroids[idx] = new Asteroids.Asteroid({ game: this });
    } else if (object instanceof Asteroids.Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else {
      throw "wtf?";
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
    var self = this

  };

  Game.prototype.whichWall = function (pos) {
    if (pos[0] >= Game.DIM_X) {
      return 2;
    }
    else if (pos[0] <= 0) {
      return 0
    }
    else if (pos[1] >= Game.DIM_Y) {
      return 3
    }
    else if (pos[1] <= 0) {
      return 1;
    };
  };

  Game.prototype.mapToWall = function (pos) {
    return this.wrapping[this.whichWall(pos)][0];
  };

  Game.prototype.isClockwise = function (pos) {
    // debugger;
    var diff = this.mapToWall(pos) - this.whichWall(pos)
    return (diff > 0 || diff === -3) && diff !== 3;
  };

  Game.prototype.isParallelMapping = function (pos) {
    return Math.abs(this.mapToWall(pos) - this.whichWall(pos)) === 2
  };

  Game.prototype.getsInverted = function (wall) {
    return this.wrapping[wall][1];
  }

  Game.prototype.wrap = function (pos) {
    if (this.isOutOfBounds(pos)) {
      var wall = this.whichWall(pos);
      var wrapping = this.wrapping[wall];
      var mapTo = this.wrapping[wall][0];
      var mapToAxis = mapTo % 2;
      var otherAxis = (mapTo + 1) % 2;
      var relation = Math.abs(mapTo - wall) % 2;
      var isInversType = (wall + mapTo) === 3;
      var newCoord = Game.WALL_VALS[mapTo] * Game.DIMS[mapToAxis];
      if (relation && !isInversType) {
        // debugger;
        pos.reverse();
        var frac = pos[otherAxis] / Game.DIMS[mapToAxis];
        if (this.getsInverted(wall)) {
          pos[otherAxis] = Game.DIMS[otherAxis] - frac * Game.DIMS[otherAxis];
        } else {
          pos[otherAxis] = frac * Game.DIMS[otherAxis];
        }
        pos[mapToAxis] = newCoord;
      } else if (relation && isInversType) {
        // debugger
        pos.reverse();
        var frac = pos[otherAxis] / Game.DIMS[mapToAxis];
        if (this.getsInverted(wall)) {
          pos[otherAxis] = frac * Game.DIMS[otherAxis];
        } else {
        pos[otherAxis] = Game.DIMS[otherAxis] - frac * Game.DIMS[otherAxis];
        }
        pos[mapToAxis] = newCoord;
      } else {
        pos[mapToAxis] = newCoord;
        if (this.getsInverted(wall)) {
          pos[otherAxis] = Game.DIMS[otherAxis] - pos[otherAxis];
        }
      }
      return pos;
    }
  };
})();
