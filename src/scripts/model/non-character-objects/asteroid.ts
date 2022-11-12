import { Math } from "phaser";
import GameManager from "../../managers/game-manager";
import SceneManager from "../../managers/scene-manager";
import { DisplaySpriteParameters } from "../interactions/displayable";
import Nco from "./nco";

export default class Asteroid extends Nco {
    static asteroidDisplayParameters: DisplaySpriteParameters = {
        posX: SceneManager.viewPort.width,
        posY: SceneManager.viewPort.height / 2,
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
        this.velocity = {x: 100, y: 0}; // default
    }

    display(displaySpriteParameters: DisplaySpriteParameters): void {
        super.display(displaySpriteParameters);
        const randomAnimationKey = Asteroid.tilemapKeys[Math.Between(0, Asteroid.tilemapKeys.length - 1)];
        this.sprite?.play(randomAnimationKey);
    }

    enableBody(): void {
        super.enableBody();
        this.sprite?.setCircle(35, 35, 35); // custom circle hitbox
    }
}
