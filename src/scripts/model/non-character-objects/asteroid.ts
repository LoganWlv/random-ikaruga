import { Math } from "phaser";
import Nco from "./nco";

export default class Asteroid extends Nco {
    static #asteroidDisplayParameters = {
        posX: 820,
        posY: 0,
        rotation: 0,
        scale: 1,
        spriteRef: 'star', // 'asteroid1' // default - WIP
    };
    
    // static tilemapKeys = ['asteroid1', 'asteroid2', 'asteroid3', 'asteroid4'] - WIP
    // static loadTilemap(scene: Phaser.Scene): void {
    //     scene.anims.create({
    //         key: Asteroid.tilemapKeys[0],
    //         frames: scene.anims.generateFrameNumbers('asteroids', { frames: [ 0, 1, 2, 3 ] }),
    //         frameRate: 8,
    //         repeat: -1
    //     });

    //     scene.anims.create({
    //         key: Asteroid.tilemapKeys[1],
    //         frames: scene.anims.generateFrameNumbers('asteroids', { frames: [ 4, 5, 6, 7 ] }),
    //         frameRate: 8,
    //         repeat: -1
    //     });

    //     scene.anims.create({
    //         key: Asteroid.tilemapKeys[2],
    //         frames: scene.anims.generateFrameNumbers('asteroids', { frames: [ 8, 9, 10, 11 ] }),
    //         frameRate: 8,
    //         repeat: -1,
    //     });

    //     scene.anims.create({
    //         key: Asteroid.tilemapKeys[3],
    //         frames: scene.anims.generateFrameNumbers('asteroids', { frames: [ 12, 13, 14, 15 ] }),
    //         frameRate: 8,
    //         repeat: -1,
    //     });
    // }

    constructor() {
        super();
        this.velocity = {x: Math.Between(-100, -150), y: Math.Between(-20, 20)}; // px/sec
        this.displaySpriteParameters = { ...Asteroid.#asteroidDisplayParameters, ...{posY: Math.Between(100, 500)} };
    }
}
