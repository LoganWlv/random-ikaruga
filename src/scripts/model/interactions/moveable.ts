import { Types } from "phaser";
import { Vector2D } from "../utils/custom-math";
import { Optional } from "../utils/optional";

export interface Moveable {
    sprite?: Optional<Types.Physics.Arcade.SpriteWithDynamicBody>;
    velocity: Vector2D;
    move: (direction: Phaser.Math.Vector2, delta: number) => void;
    accelerate: (direction: Phaser.Math.Vector2, delta: number) => void;
}

export class MoveableUtils {
    // velocity - override moveable velocity (vector2d {x: px/sec, y: px/sec})
    // direction - vector2d
    // delta - time in ms
    static forceMove(moveable: Moveable, velocity: Vector2D, direction: Phaser.Math.Vector2, delta: number): void {
        if (!moveable.sprite) { return; }
        
        const normDirection = direction.normalize();
        moveable.sprite.x += (delta/1000) * normDirection.x * velocity.x;
        moveable.sprite.y += (delta/1000) * normDirection.y * velocity.y;
    }

    // direction - vector2d
    // delta - time in ms
    static move(moveable: Moveable, direction: Phaser.Math.Vector2, delta: number): void {
        if (!moveable.sprite) { return; }

        const normDirection = direction.normalize();
        moveable.sprite.x += (delta/1000) * normDirection.x * moveable.velocity.x;
        moveable.sprite.y += (delta/1000) * normDirection.y * moveable.velocity.y;
    }

    // direction - vector2d
    // delta - time in ms
    // increase the velocity of the object and not its position
    static accelerate(moveable: Moveable, direction: Phaser.Math.Vector2, delta: number): void {
        if (!moveable.sprite) { return; }

        // accelerate smoothly
        const normDirection = direction.normalize();
        moveable.sprite.body.velocity.x += (delta/200) * normDirection.x * moveable.velocity.x; // acceleration to velocity speed (px/sec) in .2 sec
        // cap velocity
        if (moveable.velocity.x ** 2 < moveable.sprite.body.velocity.x ** 2) {
            const sign = moveable.sprite.body.velocity.x < 0 ? -1 : 1;
            moveable.sprite.body.velocity.x = moveable.velocity.x * sign;
        }
        moveable.sprite.body.velocity.y += (delta/200) * normDirection.y * moveable.velocity.y; // acceleration to velocity speed (px/sec) in .2 sec
        // cap velocity
        if (moveable.velocity.y ** 2 < moveable.sprite.body.velocity.y ** 2) {
            const sign = moveable.sprite.body.velocity.y < 0 ? -1 : 1;
            moveable.sprite.body.velocity.y = moveable.velocity.y * sign;
        }
    }

    // direction - vector2d
    // delta - time in ms
    // stabilise without input
    static stabiliseSpeed(moveable: Moveable, direction: Phaser.Math.Vector2, delta: number) {
        if (!moveable.sprite) { return; }
        const normDirection = direction.normalize();
        const noInput = (normDirection.x * normDirection.x + normDirection.y * normDirection.y) === 0;
        if (noInput) {
            let sign = moveable.sprite.body.velocity.x < 0 ? -1 : 1;
            if (moveable.sprite.body.velocity.x ** 2 > ((delta/1000) * moveable.velocity.x) ** 2) {
                moveable.sprite.body.velocity.x -= sign * (delta/1000) * moveable.velocity.x; // deceleration to velocity speed (px/sec) in .5 sec
            } else {
                moveable.sprite.body.velocity.x = 0;
            }

            sign = moveable.sprite.body.velocity.y < 0 ? -1 : 1;
            if (moveable.sprite.body.velocity.y ** 2 > ((delta/1000) * moveable.velocity.y) ** 2) {
                moveable.sprite.body.velocity.y -= sign * (delta/1000) * moveable.velocity.y; // deceleration to velocity speed (px/sec) in .5 sec
            } else {
                moveable.sprite.body.velocity.y = 0;
            }
        }
    }

    // direction - vector2d
    static setStaticAcceleration(moveable: Moveable, direction: Phaser.Math.Vector2): void {
        if (!moveable.sprite) { return; }
        const normDirection = direction.normalize();
        moveable.sprite.body.velocity.x = moveable.velocity.x * normDirection.x;
        moveable.sprite.body.velocity.y = moveable.velocity.y * normDirection.y;
    }
}
