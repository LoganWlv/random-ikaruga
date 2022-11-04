import { Math, Types } from "phaser";
import { Displayable, DisplayableUtils, DisplaySpriteParameters } from "../interactions/displayable";
import { Hittable, HittableUtils } from "../interactions/hittable";
import { Moveable, MoveableUtils } from "../interactions/moveable";
import { Optional } from "../utils/optional";

export default class Nco implements Moveable, Hittable, Displayable {
    velocity: Phaser.Types.Math.Vector2Like = { x: .0, y: .0 };
    displaySpriteParameters?: Optional<DisplaySpriteParameters>;
    sprite?: Optional<Types.Physics.Arcade.SpriteWithDynamicBody>;

    isHit(): boolean {
        return HittableUtils.isHit(this);
    }

    display(): void {
        DisplayableUtils.displaySprite(this);
    }
    
    enableBody(): void {
        HittableUtils.enableBody(this);
    }

    move(direction: Math.Vector2, delta: number): void {
        MoveableUtils.move(this, direction, delta);
    }

    accelerate(direction: Math.Vector2, delta: number): void {
        MoveableUtils.accelerate(this, direction, delta);
    }

    setStaticAcceleration(): void {
        MoveableUtils.setStaticAcceleration(this);
    }
}
