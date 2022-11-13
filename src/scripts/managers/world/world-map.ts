import { GameObjects } from "phaser";
import GameManager from "../game-manager";
import SceneManager from "../scene-manager";

export default class WorldMap {
    #backgroundParallax: {ratioX: number; sprite: GameObjects.TileSprite }[];

    constructor() {
        this.#backgroundParallax = [];
    }

    initSkyBackground(): void {
        GameManager.sceneManager.setBackground(0, 0, 'sky');
    }

    initStarsBackground(): void {
        GameManager.sceneManager.setBackground(0, 0, 'stars');
    }

    // create & add stars parallax to the scene
    initStarsParallaxBackground(): void {
        const spriteSun = GameManager.sceneManager.setBackgroundTileSprite(0, 0, SceneManager.viewPort.width, SceneManager.viewPort.height, 'sun-transparent-bg');
        this.#backgroundParallax.push({
            ratioX: 0.01,
            sprite: spriteSun
        });

        const spriteBrightStars = GameManager.sceneManager.setBackgroundTileSprite(0, 0, SceneManager.viewPort.width, SceneManager.viewPort.height, 'bright-stars-transparent-bg');
        this.#backgroundParallax.push({
            ratioX: 0.05,
            sprite: spriteBrightStars
        });
        GameManager.sceneManager.setTweensEffect({
            sprite: spriteBrightStars,
            y: 5,
            duration: 1200,
            repeat: -1
        });

        const spriteStars = GameManager.sceneManager.setBackgroundTileSprite(0, 0, SceneManager.viewPort.width, SceneManager.viewPort.height, 'stars-transparent-bg');
        this.#backgroundParallax.push({
            ratioX: 0.2,
            sprite: spriteStars
        });
        GameManager.sceneManager.setTweensEffect({
            sprite: spriteStars,
            y: 10,
            duration: 1200,
            repeat: -1
        });
    }

    udpateMap(delta: number) {
        this.#updateParallax(delta);
    }

    #updateParallax(delta: number): void {
        this.#backgroundParallax.forEach(bg => {
            // scroll parallax background with time
            bg.sprite.tilePositionX += bg.ratioX * delta;// * scene.cameras.main.scrollX -> disabled, was used to follow the camera
        });
    }
}
