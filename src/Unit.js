import Phaser from 'phaser';

var Unit = new Phaser.Class({
  Extends: Phaser.GameObjects.Sprite,

  initialize: function Unit(scene, x, y, texture, frame, type, hp, damage) {
    Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame);
    this.type = type;
    this.maxHp = this.hp = hp;
    this.damage = damage; // default damage
  },
  attack: function (target) {
    target.takeDamage(this.damage);
  },
  takeDamage: function (damage) {
    this.hp -= damage;
  },
});
// class Unit extends Phaser.GameObjects.Sprite {
//   constructor(scene, x, y, texture, frame, type, hp, damage) {
//     super(this, scene, x, y, texture, frame);
//     this.type = type;
//     this.maxHp = this.hp = hp;
//     this.damage = damage;
//   }
//   attack(target) {
//     target.takeDamage(this.damage);
//   }
//   takeDamage(damage) {
//     this.hp -= damage;
//   }
// }

export default Unit;
