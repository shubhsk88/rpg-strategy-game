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

    this.scene.launch('UIScene');

    this.index = -1;
  }
  nextTurn() {
    this.index++;
    // if there are no more units, we start again from the first one
    if (this.index >= this.units.length) {
      this.index = 0;
    }
    if (this.units[this.index]) {
      // if its player hero
      if (this.units[this.index] instanceof PlayerCharacter) {
        this.events.emit('PlayerSelect', this.index);
      } else {
        // else if its enemy unit
        // pick random hero
        var r = Math.floor(Math.random() * this.heroes.length);
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
  }
  receivePlayerSelection(action, target) {
    if (action === 'attack') {
      this.units[this.index].attack(this.enemies[target]);
    }
    this.time.addEvent({
      delay: 3000,
      callback: this.nextTurn,
      callbackScope: this,
    });
  }
}

export default BattleScene;
