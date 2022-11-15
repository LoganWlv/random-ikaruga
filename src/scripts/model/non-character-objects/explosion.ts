import Nco from "./nco";
import GameManager from '../../managers/game-manager';
import { DisplaySpriteParameters } from '../interactions/displayable';

export default class Explosion extends Nco {
  static displaySpriteParameters: DisplaySpriteParameters = {
    posX: 0,
    posY: 0,
    rotation: 0,
    scale: 1,
    spriteRef: 'explosion'
  }

  #cumulatedTime = 0. // ms
  #lifeTime = 5000.; // ms

  static loadTilemap(): void {
    const { scene } = GameManager;
    scene.anims.create({
      key: 'explode',
      frames: scene.anims.generateFrameNumbers('explosion',
        { start: 0, end: 7 }
      ),
      frameRate: 8,
      repeat: 0,
      hideOnComplete: true
    });
  }

  displayExplosion(displaySpriteParameters: DisplaySpriteParameters): void {
    super.display(displaySpriteParameters);
    this.sprite?.play('explode');
  }

  update(time: number, delta: number) {
    this.#cumulatedTime += delta;

    if(this.#cumulatedTime > this.#lifeTime) {
      this.#cumulatedTime = 0;
      GameManager.ncosManager.destroyNco(this);
    }
  }

  constructor() {
    super();
  }
}
