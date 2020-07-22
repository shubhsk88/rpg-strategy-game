import Phaser from 'phaser';

class MenuItem extends Phaser.GameObjects.Text {
  constructor(x, y, text, scene) {
    super(this, scene, x, y, text, { color: '#ffffff' });
  }
  select() {
    this.setColor('#f8ff38');
  }

  deselect() {
    this.setColor('#ffffff');
  }
}

export default MenuItem;
