import SceneManager from "../../managers/scene-manager";
import { DisplaySpriteParameters } from "../interactions/displayable";
import { HittableUtils } from "../interactions/hittable";
import { MoveableUtils } from "../interactions/moveable";
import Character from "./character";

export default class Player extends Character {
    static spaceshipDisplayParameters: DisplaySpriteParameters  = {
        posX: SceneManager.viewPort.width / 2,
        posY: SceneManager.viewPort.height / 2,
        rotation: 90,
        scale: 0.6,
        spriteRef: 'ship'
    };

    constructor() {
        super();
        this.velocity = {x: 160, y: 160}; // px/sec
    }

    accelerate(direction: Phaser.Math.Vector2, delta: number): void {
        MoveableUtils.accelerate(this, direction, delta);
        MoveableUtils.stabiliseSpeed(this, direction, delta);
    }

    enableBody(): void {
        super.enableBody();
    }

    enableWorldCollision(): void {
        HittableUtils.enableWorldBounds(this);
    }
}
