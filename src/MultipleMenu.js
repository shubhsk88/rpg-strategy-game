import Phaser from 'phaser';
import Menu from './Menu';

class HeroesMenu extends Menu {
  constructor(x, y, scene) {
    console.log(this);
    super(this, x, y, scene);
  }
}

class ActionsMenu extends Menu {
  constructor(x, y, scene) {
    super(this, x, y, scene);
    this.addMenuItems('Attack');
  }
  confirm() {}
}

class EnemiesMenu extends Menu {
  constructor(x, y, scene) {
    super(this, x, y, scene);
  }
  confirm() {}
}

export { EnemiesMenu, HeroesMenu, ActionsMenu };
