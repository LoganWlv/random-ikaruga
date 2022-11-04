import GameManager from '../scripts/managers/game-manager';

export default class DemoScene extends Phaser.Scene {
  constructor() {
    super('GameScene - DEMO');
  }

  preload() {
    this.load.image('sky', 'assets/background/sky.png');
    this.load.image('stars', 'assets/background/stars.png');
    this.load.image('star', 'assets/ncos/star.png');
    this.load.image('sun-transparent-bg', 'assets/background/sun-transparent-bg.png');
    this.load.image('stars-transparent-bg', 'assets/background/stars-transparent-bg.png');
    this.load.image('bright-stars-transparent-bg', 'assets/background/bright-stars-transparent-bg.png');
    this.load.image('ship', 'assets/player/ship.png');
    // this.load.spritesheet('asteroids', 'assets/ncos/animations/asteroids125x125-tilemap.png', { frameWidth: 125, frameHeight: 125 });
  }

  create() {
    const { world } = GameManager;
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
    GameManager.world.update(time, delta);
  }
}
