import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import BootScene from './BootScene';
import WorldScene from './WorldScene';

const config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 320,
  height: 240,
  zoom: 2,
  pixelart: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [BootScene, WorldScene],
};

const game = new Phaser.Game(config);
