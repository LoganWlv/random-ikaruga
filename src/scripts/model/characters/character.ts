import { Math, Types } from "phaser";
import { Damageable, DamageableUtils } from "../interactions/damageable";
import { Displayable, DisplayableUtils, DisplaySpriteParameters } from "../interactions/displayable";
import { HittableUtils } from "../interactions/hittable";
import { Moveable, MoveableUtils } from "../interactions/moveable";
import { Optional } from "../utils/optional";

export default class Character implements Moveable, Damageable, Displayable {
    hp = 0.;
    velocity: Phaser.Types.Math.Vector2Like = { x: .0, y: .0 };
    displaySpriteParameters?: Optional<DisplaySpriteParameters>;
    sprite?: Optional<Types.Physics.Arcade.SpriteWithDynamicBody>;

    move(direction: Math.Vector2, delta: number): void {
        MoveableUtils.move(this, direction, delta);
    }

    accelerate(direction: Math.Vector2, delta: number): void {
        MoveableUtils.accelerate(this, direction, delta);
    }

    isHit(): boolean {
        return HittableUtils.isHit(this);
    }

    takeDamages(dmg: number): void {
        DamageableUtils.takeDamages(this, dmg);
    }

    display(): void {
        DisplayableUtils.displaySprite(this);
    };

    enableBody(): void {
        HittableUtils.enableBody(this);
    }
}
