import { Math } from 'phaser';
import GameManager from '../scripts/managers/game-manager';
import SceneManager from '../scripts/managers/scene-manager';
import { DisplaySpriteParameters } from '../scripts/model/interactions/displayable';
import { HittableUtils } from '../scripts/model/interactions/hittable';
import Asteroid from '../scripts/model/non-character-objects/asteroid';
import BlueStar from '../scripts/model/non-character-objects/blue-star';
import Spawner from '../scripts/model/spawners/spawner';
import Explosion from '../scripts/model/non-character-objects/explosion';

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
    this.load.spritesheet('asteroids', 'assets/ncos/animations/asteroids125x125-tilemap.png', { frameWidth: 125, frameHeight: 125 });
    this.load.spritesheet('explosion', 'assets/ncos/animations/explosion.png', { frameWidth: 64, frameHeight: 64, endFrame: 23 });
  }

  #asteroidSpawner?: Spawner<Asteroid>;
  create() {
    const { world } = GameManager;
    GameManager.initSceneManager(this);
    world.initWorldMap();
    world.worldMap.initStarsBackground();
    world.worldMap.initStarsParallaxBackground();
    world.initPlayerManager();
    world.playerManager.spawn();

    world.initNcosManager();
    // should be isolated in a dedicated spawner for real scenes (inherited spawner)
    const asteroidSpawnPattern = () => {
        const asteroid = new Asteroid();
        const displayParams: DisplaySpriteParameters = { ...Asteroid.asteroidDisplayParameters, posY: Math.Between(100, SceneManager.viewPort.height - 100) }
        asteroid.display(displayParams); // add missing params
        asteroid.enableBody();
        asteroid.velocity = {x: Math.Between(80, 120), y: Math.Between(-20, 20)}; // px/sec
        asteroid.accelerate(new Math.Vector2({x: -1, y: 1})); // direction
        // custom bounce effect for asteroid coming from that spawner
        HittableUtils.enableCollision(asteroid, GameManager.playerManager.player, () => undefined);
        asteroid.sprite?.setBounce(3, 3);
        return asteroid;
    };
    this.#asteroidSpawner = new Spawner<Asteroid>({startingTime: 10000, waitingTime: 2500, spawnPattern: asteroidSpawnPattern});
    world.ncosManager.addSpawner(this.#asteroidSpawner);

    // same
    const blueStarSpawnPattern = () => {
      const blueStar = new BlueStar();
      const displayParams: DisplaySpriteParameters = { ...BlueStar.starDisplayParameters, posY: Math.Between(100, SceneManager.viewPort.height - 100) }
      blueStar.display(displayParams); // add missing params
      blueStar.enableBody();
      blueStar.velocity = {x: Math.Between(140, 180), y: Math.Between(-20, 20)}; // px/sec
      blueStar.accelerate(new Math.Vector2({x: -1, y: 1})); // direction
      // custom behaviour: disappear
      HittableUtils.enableOverlap(blueStar, GameManager.playerManager.player, () => {
          GameManager.ncosManager.destroyNco(blueStar);
          const explosion = new Explosion();
          GameManager.ncosManager.addNco(explosion);
          explosion.displayExplosion({
            ...Explosion.displaySpriteParameters,
            posX: blueStar.sprite?.x ?? 0,
            posY: blueStar.sprite?.y ?? 0,
          });
      });
      return blueStar;
    };
    const blueStarSpawner = new Spawner<BlueStar>({startingTime: 4000, waitingTime: 2000, spawnPattern: blueStarSpawnPattern});
    world.ncosManager.addSpawner(blueStarSpawner);

    world.initNpcsManager();
  }

  #wallOfAsteroid = 15;
  update(time: number, delta: number): void {
    GameManager.world.update(time, delta);

    // special event (could be done with a dedicated spawn directly)
    if (time > 15000 && this.#wallOfAsteroid) {
        this.#asteroidSpawner?.spawn();
        this.#wallOfAsteroid --;
    }
  }
}
