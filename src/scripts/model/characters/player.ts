import { HittableUtils } from "../interactions/hittable";
import { MoveableUtils } from "../interactions/moveable";
import Character from "./character";

export default class Player extends Character {
    static #spaceshipDisplayParameters = {
        posX: 400,
        posY: 300,
        rotation: 90,
        scale: 0.6,
        spriteRef: 'ship'
    };

    constructor() {
        super();
        this.velocity = {x: 160, y: 160}; // px/sec
        this.displaySpriteParameters = Player.#spaceshipDisplayParameters;
    }

    accelerate(direction: Phaser.Math.Vector2, delta: number): void {
        super.accelerate(direction, delta);
        MoveableUtils.stabiliseSpeed(this, direction, delta);
        console.log('velocity : ', this.sprite?.body?.velocity);
    }

    enableBody(): void {
        super.enableBody();
    }

    enableWorldCollision(): void {
        HittableUtils.enableWorldBounds(this);
    }
}
