import { Types } from "phaser";
import GameManager from "../../managers/game-manager";
import { ifPresent, Optional } from "../utils/optional";

export interface Hittable {
    sprite?: Optional<Types.Physics.Arcade.SpriteWithDynamicBody>;
    isHit: () => boolean;
    enableBody: () => void;
}

export class HittableUtils {
    static enableBody(hittable: Hittable): void {
        ifPresent(hittable.sprite, (sprite) => {
            GameManager.scene.physics.world.enable(sprite);
        });
    }

    static enableWorldBounds(hittable: Hittable): void {
        ifPresent(hittable.sprite, (sprite) => {
            sprite.setCollideWorldBounds(true);
            sprite.setBounce(0.5, 0.5);
        });
    }

    static isHit(hittable: Hittable): boolean {
        throw new Error("Not implemented");
    }
}
