import GameManager from '../scripts/managers/game-manager';

export default class DemoScene extends Phaser.Scene {
  constructor() {
    super('GameScene - DEMO');
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('stars', 'assets/stars.png');
    this.load.image('sun-transparent-bg', 'assets/sun-transparent-bg.png');
    this.load.image('stars-transparent-bg', 'assets/stars-transparent-bg.png');
    this.load.image('bright-stars-transparent-bg', 'assets/bright-stars-transparent-bg.png');
    this.load.image('ship', 'assets/ship.png');
    // this.load.spritesheet('asteroids', 'assets/animations/asteroids125x125-tilemap.png', { frameWidth: 125, frameHeight: 125 });
  }

  create() {
    const { world } = GameManager.INSTANCE;
    world.initSceneManager(this);
    world.initWorldMap();
    world.initPlayerManager();
    world.initNcosManager();
    world.initNpcsManager();
    // ifPresent(world.playerManager.player.sprite, (sprite) => {
      // this.cameras.main.startFollow(sprite);
    // });
  }

  update(time: number, delta: number): void {
    GameManager.INSTANCE.world.update(time, delta);
  }
}
