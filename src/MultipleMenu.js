import Phaser from 'phaser';
import Menu from './Menu';

var HeroesMenu = new Phaser.Class({
  Extends: Menu,

  initialize: function HeroesMenu(x, y, scene) {
    Menu.call(this, x, y, scene);
  },
});
class ActionsMenu extends Menu {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.addMenuItem('Attack');
  }
  confirm() {
    this.scene.events.emit('SelectedEnemies');
  }
}

class EnemiesMenu extends Menu {
  constructor(x, y, scene) {
    super(x, y, scene);
  }
  confirm() {
    this.scene.events.emit('Enemy', this.menuItemIndex);
  }
}

export { EnemiesMenu, HeroesMenu, ActionsMenu };
