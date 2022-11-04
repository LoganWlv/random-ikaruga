import { Types } from "phaser";
import { Optional } from "../utils/optional";

export interface Moveable {
    sprite?: Optional<Types.Physics.Arcade.SpriteWithDynamicBody>;
    velocity: Phaser.Types.Math.Vector2Like;
    move: (direction: Phaser.Math.Vector2, delta: number) => void;
    accelerate: (direction: Phaser.Math.Vector2, delta: number) => void;
}

export class MoveableUtils {
    // velocity - override moveable velocity
    // direction - any vector from a point to another
    // delta - interpolation factor based on time
    static forceMove(moveable: Moveable, velocity: Phaser.Types.Math.Vector2Like, direction: Phaser.Math.Vector2, delta: number): void {
        if (!moveable.sprite) { return; }
        
        const normDirection = direction.normalize();
        if (velocity?.x) {
            moveable.sprite.x += delta * normDirection.x * velocity.x;
        }
        if (velocity?.y) {
            moveable.sprite.y += delta * normDirection.y * velocity.y;
        }
    }

    // direction - any vector from a point to another
    // delta - interpolation factor based on time
    static move(moveable: Moveable, direction: Phaser.Math.Vector2, delta: number): void {
        if (!moveable.sprite) { return; }

        const normDirection = direction.normalize();
        if (moveable.velocity?.x) {
            moveable.sprite.x += delta * normDirection.x * moveable.velocity.x;
        }
        if (moveable.velocity?.y) {
            moveable.sprite.y += delta * normDirection.y * moveable.velocity.y;
        }
    }

    // direction - any vector from a point to another
    // delta - interpolation factor based on time
    // in this function we increase the velocity of the object and not its position
    static accelerate(moveable: Moveable, direction: Phaser.Math.Vector2, delta: number): void {
        if (!moveable.sprite) { return; }

        // accelerate smoothly
        const normDirection = direction.normalize();
        moveable.sprite.body.velocity.x += (delta / 6) * normDirection.x;
        moveable.sprite.body.velocity.y += (delta / 6) * normDirection.y;
        
        // cap to moveable.velocity
        if (moveable.velocity?.x && moveable.velocity.x ** 2 < moveable.sprite.body.velocity.x ** 2) {
            const sign = moveable.sprite.body.velocity.x < 0 ? -1 : 1;
            moveable.sprite.body.velocity.x = moveable.velocity.x * sign;
        }
        if (moveable.velocity?.y && moveable.velocity.y ** 2 < moveable.sprite.body.velocity.y ** 2) {
            const sign = moveable.sprite.body.velocity.y < 0 ? -1 : 1;
            moveable.sprite.body.velocity.y = moveable.velocity.y * sign;
        }
    }

    // stabilise without input
    static stabiliseSpeed(moveable: Moveable, direction: Phaser.Math.Vector2) {
        if (!moveable.sprite) { return; }
        const normDirection = direction.normalize();
        const noInput = (normDirection.x * normDirection.x + normDirection.y * normDirection.y) === 0;
        if (noInput) {
            moveable.sprite.body.velocity.x = moveable.sprite.body.velocity.x * 0.98;
            moveable.sprite.body.velocity.y = moveable.sprite.body.velocity.y * 0.98;
        }
    }

    // direction - any vector from a point to another
    static setStaticAcceleration(moveable: Moveable): void {
        if (!moveable.sprite) { return; }
        if (moveable.velocity.x) {
            moveable.sprite.body.velocity.x = moveable.velocity.x;
        }
        if (moveable.velocity.y) {
            moveable.sprite.body.velocity.y = moveable.velocity.y;
        }
    }
}
