import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import BootScene from './BootScene';
import WorldScene from './WorldScene';
import UIScene from './UIScene';
import BattleScene from './BattleScene';
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
      debug: false,
    },
  },
  scene: [BootScene, WorldScene, BattleScene, UIScene],
};

const game = new Phaser.Game(config);
