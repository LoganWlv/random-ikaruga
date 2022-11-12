import { Math, Types } from "phaser";
import { Displayable, DisplayableUtils, DisplaySpriteParameters } from "../interactions/displayable";
import { Hittable, HittableUtils } from "../interactions/hittable";
import { Moveable, MoveableUtils } from "../interactions/moveable";
import { Spawnable } from "../interactions/spawnable";
import { Optional } from "../utils/optional";

export default class Nco implements Moveable, Hittable, Displayable, Spawnable {
    velocity: Phaser.Types.Math.Vector2Like = { x: .0, y: .0 };
    sprite?: Optional<Types.Physics.Arcade.SpriteWithDynamicBody>;

    isHit(): boolean {
        return HittableUtils.isHit(this);
    }

    display(displaySpriteParameters: DisplaySpriteParameters): void {
        DisplayableUtils.displaySprite(this, displaySpriteParameters);
    }
    
    enableBody(): void {
        HittableUtils.enableBody(this);
    }

    move(direction: Math.Vector2, delta: number): void {
        MoveableUtils.move(this, direction, delta);
    }

    accelerate(direction: Math.Vector2, _delta?: number): void {
        MoveableUtils.setStaticAcceleration(this, direction);
    }
}
