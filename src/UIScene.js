import Phaser from 'phaser';
import { EnemiesMenu, HeroesMenu, ActionsMenu } from './MultipleMenu';
import Message from './Message';

class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
  }
  remapHeroes() {
    var heroes = this.battleScene.heroes;
    this.heroesMenu.remap(heroes);
  }
  remapEnemies() {
    var enemies = this.battleScene.enemies;
    this.enemiesMenu.remap(enemies);
  }
  create() {
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x031f4c, 1);
    this.graphics.strokeRect(2, 150, 90, 100);
    this.graphics.fillRect(2, 150, 90, 100);
    this.graphics.strokeRect(95, 150, 90, 100);
    this.graphics.fillRect(95, 150, 90, 100);
    this.graphics.strokeRect(188, 150, 130, 100);
    this.graphics.fillRect(188, 150, 130, 100);

    this.menus = this.add.container();

    this.heroesMenu = new HeroesMenu(195, 153, this);
    this.actionsMenu = new ActionsMenu(100, 153, this);
    this.enemiesMenu = new EnemiesMenu(8, 153, this);

    this.currentMenu = this.actionsMenu;

    this.menus.add(this.heroesMenu);
    this.menus.add(this.actionsMenu);
    this.menus.add(this.enemiesMenu);

    this.battleScene = this.scene.get('BattleScene');

    // listen for keyboard events
    this.input.keyboard.on('keydown', this.onKeyInput, this);

    // when its player cunit turn to move
    this.battleScene.events.on('PlayerSelect', this.onPlayerSelect, this);

    // when the action on the menu is selected
    // for now we have only one action so we dont send and action id
    this.events.on('SelectedEnemies', this.onSelectedEnemies, this);

    // an enemy is selected
    this.events.on('Enemy', this.onEnemy, this);

    // when the scene receives wake event
    this.sys.events.on('wake', this.createMenu, this);

    // the message describing the current action
    this.message = new Message(this, this.battleScene.events);
    this.add.existing(this.message);

    this.createMenu();
  }

  createMenu() {
    this.remapHeroes();
    this.remapEnemies();
    this.battleScene.nextTurn();
  }
  onKeyInput(event) {
    console.log;
    if (this.currentMenu && this.currentMenu.selected) {
      if (event.code === 'ArrowUp') {
        this.currentMenu.moveSelectionUp();
      } else if (event.code === 'ArrowDown') {
        this.currentMenu.moveSelectionDown();
      } else if (event.code === 'ArrowRight' || event.code === 'Shift') {
      } else if (event.code === 'Space' || event.code === 'ArrowLeft') {
        console.log(event.code);
        this.currentMenu.confirm();
      }
    }
  }
  onEnemy(index) {
    this.heroesMenu.deselect();
    this.actionsMenu.deselect();
    this.enemiesMenu.deselect();
    this.currentMenu = null;
    this.battleScene.receivePlayerSelection('attack', index);
  }

  onPlayerSelect(id) {
    console.log(this.heroesMenu);
    this.heroesMenu.select(id);
    this.actionsMenu.select(0);
    this.currentMenu = this.actionsMenu;
  }
  onSelectedEnemies() {
    this.currentMenu = this.enemiesMenu;
    this.enemiesMenu.select(0);
  }
}

export default UIScene;
