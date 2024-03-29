(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(288, 505, Phaser.AUTO, 'flappy-bird-reborn');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":6,"./states/gameover":7,"./states/menu":8,"./states/play":9,"./states/preload":10}],2:[function(require,module,exports){
'use strict';

var Bird = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bird', frame);

  // initialize your prefab here

  this.anchor.setTo(0.5, 0.5);

  this.animations.add('flap');
  this.animations.play('flap', 12, true);

  this.game.physics.arcade.enableBody(this);

  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;

};

Bird.prototype = Object.create(Phaser.Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.flap = function(){
  this.body.velocity.y = -400;
  this.game.add.tween(this).to({angle: -40}, 100).start();

}

Bird.prototype.update = function() {

  if(this.angle<90){
    this.angle+=2.5;
  }


  // write your prefab's specific update code here

};

module.exports = Bird;

},{}],3:[function(require,module,exports){
/* Full tutorial: http://codevinsky.ghost.io/phaser-2-0-tutorial-flappy-bird-part-2/ */
'use strict';

var Ground = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'ground');
  // start scrolling our ground
  this.autoScroll(-200,0);

  // enable physics on the ground sprite
  // this is needed for collision detection
  this.game.physics.arcade.enableBody(this);

  // we don't want the ground's body
  // to be affected by gravity or external forces
  this.body.allowGravity = false;
  this.body.immovable = true;


};

Ground.prototype = Object.create(Phaser.TileSprite.prototype);
Ground.prototype.constructor = Ground;

Ground.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Ground;

},{}],4:[function(require,module,exports){
/* Full tutorial: http://codevinsky.ghost.io/phaser-2-0-tutorial-flappy-bird-part-4/ */
'use strict';

var Pipe = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'pipe', frame);
  this.anchor.setTo(0.5, 0.5);
  this.game.physics.arcade.enableBody(this);

  this.body.allowGravity = false;
  this.body.immovable = true;

};

Pipe.prototype = Object.create(Phaser.Sprite.prototype);
Pipe.prototype.constructor = Pipe;

Pipe.prototype.update = function() {
  // write your prefab's specific update code here

};

module.exports = Pipe;

},{}],5:[function(require,module,exports){
/* Full tutorial: http://codevinsky.ghost.io/phaser-2-0-tutorial-flappy-bird-part-4/ */
'use strict';

var Pipe = require('./pipe');

var PipeGroup = function(game, parent) {

  Phaser.Group.call(this, game, parent);

  this.topPipe = new Pipe(this.game, 0, 0, 0);
  this.bottomPipe = new Pipe(this.game, 0, 440, 1);
  this.add(this.topPipe);
  this.add(this.bottomPipe);
  this.hasScored = false;

  this.setAll('body.velocity.x', -200);
};

PipeGroup.prototype = Object.create(Phaser.Group.prototype);
PipeGroup.prototype.constructor = PipeGroup;

PipeGroup.prototype.update = function() {
  this.checkWorldBounds();
};

PipeGroup.prototype.checkWorldBounds = function() {
  if(!this.topPipe.inWorld) {
    this.exists = false;
  }
};


PipeGroup.prototype.reset = function(x, y) {
  this.topPipe.reset(0,0);
  this.bottomPipe.reset(0,440);
  this.x = x;
  this.y = y;
  this.setAll('body.velocity.x', -200);
  this.hasScored = false;
  this.exists = true;
};


module.exports = PipeGroup;

},{"./pipe":4}],6:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],7:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],8:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    // var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    // this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'yeoman');
    // this.sprite.anchor.setTo(0.5, 0.5);

    // this.titleText = this.game.add.text(this.game.world.centerX, 300, '\'Allo, \'Allo!', style);
    // this.titleText.anchor.setTo(0.5, 0.5);

    // this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play "Click The Yeoman Logo"', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    // this.instructionsText.anchor.setTo(0.5, 0.5);

    // this.sprite.angle = -20;
    // this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    this.background = this.game.add.sprite(0, 0, 'background');

    this.ground = this.game.add.tileSprite(0, 400, 355, 112, 'ground');
    this.ground.autoScroll(-200, 0);

    this.titleGroup = this.game.add.group();

    this.title = this.game.add.sprite(0, 0, 'title');

    this.titleGroup.add(this.title);

    this.bird = this.game.add.sprite(200, 5, 'bird');

    this.titleGroup.add(this.bird);

    this.bird.animations.add('flap');
    this.bird.animations.play('flap', 12, true);

    this.titleGroup.x = 30;
    this.titleGroup.y = 100;

    this.game.add.tween(this.titleGroup).to({y:90}, 800, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
    this.startButton.anchor.setTo(0.5,0.5);

  },

  startClick: function() {
    this.game.state.start('menu');
  },

  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('menu');
    }
  }
};

module.exports = Menu;

},{}],9:[function(require,module,exports){
/* Full tutorial: http://codevinsky.ghost.io/phaser-2-0-tutorial-flappy-bird-part-4/ */
'use strict';
var Bird = require('../prefabs/bird');
var Ground = require('../prefabs/ground');
var PipeGroup = require('../prefabs/pipeGroup');

function Play() {}
Play.prototype = {
  create: function() {
    // start the phaser arcade physics engine
    this.game.physics.startSystem(Phaser.Physics.ARCADE);


    // give our world an initial gravity of 1200
    this.game.physics.arcade.gravity.y = 1200;

    // add the background sprite
    this.background = this.game.add.sprite(0,0,'background');

    // create and add a new Bird object
    this.bird = new Bird(this.game, 100, this.game.height/2);
    this.game.add.existing(this.bird);

    // create and add a group to hold our pipeGroup prefabs
    this.pipes = this.game.add.group();

    // create and add a new Ground object
    this.ground = new Ground(this.game, 0, 400, 335, 112);
    this.game.add.existing(this.ground);


    // add keyboard controls
    this.flapKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.flapKey.onDown.add(this.bird.flap, this.bird);

    // add mouse/touch controls
    this.game.input.onDown.add(this.bird.flap, this.bird);

    // keep the spacebar from propogating up to the browser
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    // add a timer
    this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
    this.pipeGenerator.timer.start();

  },
  update: function() {
    // enable collisions between the bird and the ground
    this.game.physics.arcade.collide(this.bird, this.ground, this.deathHandler, null, this);

    // enable collisions between the bird and each group in the pipes group
    this.pipes.forEach(function(pipeGroup) {
        this.game.physics.arcade.collide(this.bird, pipeGroup, this.deathHandler, null, this);
    }, this);

  },
  shutdown: function() {
    this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
    this.bird.destroy();
    this.pipes.destroy();
  },
  deathHandler: function() {
    this.game.state.start('gameover');
  },
  generatePipes: function() {
    var pipeY = this.game.rnd.integerInRange(-100, 100);
    var pipeGroup = this.pipes.getFirstExists(false);
    if(!pipeGroup) {
        pipeGroup = new PipeGroup(this.game, this.pipes);
    }
    pipeGroup.reset(this.game.width, pipeY);
  }
};

module.exports = Play;

},{"../prefabs/bird":2,"../prefabs/ground":3,"../prefabs/pipeGroup":5}],10:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    // this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    // this.asset.anchor.setTo(0.5, 0.5);

    // this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    // this.load.setPreloadSprite(this.asset);
    // this.load.image('yeoman', 'assets/yeoman-logo.png');

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.asset = this.add.sprite(this.width/2, this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.asset);

    this.load.image('background', 'assets/background.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('title', 'assets/title.png');
    this.load.image('startButton', 'assets/start-button.png');

    this.load.spritesheet('bird', 'assets/bird.png', 34, 24, 3);
    this.load.spritesheet('pipe', 'assets/pipes.png', 54, 320, 2);

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('play');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])