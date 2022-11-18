import { Math, Types } from "phaser";
import { Damageable, DamageableUtils } from "../interactions/damageable";
import { Displayable, DisplayableUtils, DisplaySpriteParameters } from "../interactions/displayable";
import { HittableUtils } from "../interactions/hittable";
import { Moveable, MoveableUtils } from "../interactions/moveable";
import { Vector2D } from "../utils/custom-math";
import { Optional } from "../utils/optional";

export default abstract class Character implements Moveable, Damageable, Displayable {
    hp = 0.;
    velocity: Vector2D = { x: .0, y: .0 };
    sprite?: Optional<Types.Physics.Arcade.SpriteWithDynamicBody>;

    move(direction: Math.Vector2, delta: number): void {
        MoveableUtils.move(this, direction, delta);
    }

    accelerate(direction: Math.Vector2, _delta?: number): void {
        MoveableUtils.setStaticAcceleration(this, direction);
    }

    isHit(): boolean {
        return HittableUtils.isHit(this);
    }

    takeDamages(dmg: number): void {
        DamageableUtils.takeDamages(this, dmg);
    }

    display(displaySpriteParameters: DisplaySpriteParameters): void {
        DisplayableUtils.displaySprite(this, displaySpriteParameters);
    };

    enableBody(): void {
        HittableUtils.enableBody(this);
    }
}
