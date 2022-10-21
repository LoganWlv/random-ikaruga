export interface Moveable {
    position: {x: number, y: number}; // need to check if there is a phaser position or create an interface
    speed: number;
    move: (direction: {dx: number, dy: number}) => void; // need to check if there is a phaser 2Ddirection or create an interface
}

export class MoveableUtils {
    static move(moveable: Moveable ,direction: {dx: number, dy: number}): void {
        moveable.position.x += direction.dx * moveable.speed;
        moveable.position.y += direction.dy * moveable.speed;
    }
}
