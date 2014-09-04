
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
