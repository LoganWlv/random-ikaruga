import { Math } from "phaser";
import GameManager from "../../managers/game-manager";
import Nco from "./nco";

export default class Asteroid extends Nco {
    static #asteroidDisplayParameters = {
        posX: 820,
        posY: 0,
        rotation: 0,
        scale: .6,
        spriteRef: 'asteroids'
    };
    
    static tilemapKeys = ['asteroid1', 'asteroid2']; // 'asteroid3', 'asteroid4'
    static loadTilemap(): void {
        const { scene } = GameManager;
        scene.anims.create({
            key: Asteroid.tilemapKeys[0],
            frames: scene.anims.generateFrameNumbers('asteroids', { frames: [ 0, 1, 2, 3 ] }),
            frameRate: 8,
            repeat: -1
        });

        scene.anims.create({
            key: Asteroid.tilemapKeys[1],
            frames: scene.anims.generateFrameNumbers('asteroids', { frames: [ 4, 5, 6, 7 ] }),
            frameRate: 8,
            repeat: -1
        });

        // don't use - overlap a little bit on sibbling tiles
        scene.anims.create({
            key: Asteroid.tilemapKeys[2],
            frames: scene.anims.generateFrameNumbers('asteroids', { frames: [ 8, 9, 10, 11 ] }),
            frameRate: 8,
            repeat: -1,
        });

        // don't use - overlap a little bit on sibbling tiles
        scene.anims.create({
            key: Asteroid.tilemapKeys[3],
            frames: scene.anims.generateFrameNumbers('asteroids', { frames: [ 12, 13, 14, 15 ] }),
            frameRate: 8,
            repeat: -1,
        });
    }

    constructor() {
        super();
        this.velocity = {x: Math.Between(-80, -120), y: Math.Between(-20, 20)}; // px/sec
        this.displaySpriteParameters = { ...Asteroid.#asteroidDisplayParameters, ...{posY: Math.Between(100, 500)} };
    }

    display(): void {
        super.display();
        const randomAnimationKey = Asteroid.tilemapKeys[Math.Between(0, Asteroid.tilemapKeys.length - 1)];
        this.sprite?.play(randomAnimationKey);
        this.sprite?.setCircle(35, 35, 35); // set custom circle hitbox
    }
}
