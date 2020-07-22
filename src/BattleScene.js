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
  }
}

export default BattleScene;
