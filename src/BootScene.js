import Phaser from 'phaser';
import spritesheet from './assets/map/spritesheet.png';
import map from './assets/map/map.json';
import rpg from './assets/RPG_assets.png';
var BootScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function BootScene() {
    Phaser.Scene.call(this, { key: 'BootScene' });
  },

  preload: function () {
    this.load.image('tiles', spritesheet);

    // map in json format
    this.load.tilemapTiledJSON('map', map);

    // our two characters
    this.load.spritesheet('player', rpg, {
      frameWidth: 16,
      frameHeight: 16,
    });

    // load the resources here
  },

  create: function () {
    this.scene.start('WorldScene');
  },
});

export default BootScene;
