import Phaser from 'phaser';
import PlayerCharacter from './Player';
import Enemy from './Enemy';

class BattleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BattleScene' });
  }
  create() {
    // Run UI Scene at the same time

    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
    this.startBattle();

    this.sys.events.on('wake', this.startBattle, this);
  }

  startBattle() {
    const warrior = new PlayerCharacter(
      this,
      250,
      50,
      'player',
      1,
      'Warrior',
      100,
      20
    );
    this.add.existing(warrior);
    const mage = new PlayerCharacter(
      this,
      250,
      100,
      'player',
      4,
      'Mage',
      80,
      8
    );
    this.add.existing(mage);
    const dragonBlue = new Enemy(
      this,
      50,
      50,
      'dragonblue',
      null,
      'Dragon',
      50,
      3
    );
    this.add.existing(dragonBlue);

    const dragonOrange = new Enemy(
      this,
      50,
      100,
      'dragonorange',
      null,
      'Dragon2',
      50,
      3
    );

    this.add.existing(dragonOrange);
    this.heroes = [warrior, mage];
    this.enemies = [dragonBlue, dragonOrange];

    this.units = this.heroes.concat(this.enemies);

    this.index = -1;
    this.scene.run('UIScene');
  }
  nextTurn() {
    // if we have victory or game over
    console.log('checking');
    if (this.checkEndBattle()) {
      this.endBattle();
      return;
    }
    do {
      // currently active unit
      this.index++;
      // if there are no more units, we start again from the first one
      if (this.index >= this.units.length) {
        this.index = 0;
      }
    } while (!this.units[this.index].living);
    // if its player hero
    if (this.units[this.index] instanceof PlayerCharacter) {
      // we need the player to select action and then enemy
      this.events.emit('PlayerSelect', this.index);
    } else {
      // else if its enemy unit
      // pick random living hero to be attacked
      var r;
      do {
        r = Math.floor(Math.random() * this.heroes.length);
      } while (!this.heroes[r].living);
      // call the enemy's attack function
      this.units[this.index].attack(this.heroes[r]);
      // add timer for the next turn, so will have smooth gameplay
      this.time.addEvent({
        delay: 3000,
        callback: this.nextTurn,
        callbackScope: this,
      });
    }
  }

  receivePlayerSelection(action, target) {
    if (action == 'attack') {
      this.units[this.index].attack(this.enemies[target]);
    }
    this.time.addEvent({
      delay: 3000,
      callback: this.nextTurn,
      callbackScope: this,
    });
  }

  checkEndBattle() {
    var victory = true;
    // if all enemies are dead we have victory
    for (var i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].living) victory = false;
    }

    var gameOver = true;
    // if all heroes are dead we have game over
    for (var i = 0; i < this.heroes.length; i++) {
      if (this.heroes[i].living) gameOver = false;
    }
    return victory || gameOver;
  }
  endBattle() {
    // clear state, remove sprites
    this.heroes.length = 0;
    this.enemies.length = 0;
    for (var i = 0; i < this.units.length; i++) {
      // link item
      this.units[i].destroy();
    }
    this.units.length = 0;
    // sleep the UI
    this.scene.sleep('UIScene');
    // return to WorldScene and sleep current BattleScene
    this.scene.switch('WorldScene');
  }
}

export default BattleScene;
