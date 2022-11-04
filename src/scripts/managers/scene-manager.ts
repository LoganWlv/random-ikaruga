import { GameObjects, Tweens, Types } from "phaser";
import { DisplaySpriteParameters } from "../model/interactions/displayable";
import { Optional } from "../model/utils/optional";

export default class SceneManager {
    static #viewPort = {width: 800, height: 600};
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        // 10px inner padding
        this.scene.physics.world.setBounds(10, 10, SceneManager.#viewPort.width - 20, SceneManager.#viewPort.height - 20);
    }

    // create & add fix background image to the scene
    setBackground(posX: number, posY: number, texture: string): GameObjects.Image {
        return this.scene.add
            .image(posX, posY, texture)
            .setOrigin(0, 0)
            .setScrollFactor(0);
    }

    // create & add fix background tile sprite to the scene
    setBackgroundTileSprite(posX: number, posY: number, width: number, height: number,texture: string): GameObjects.TileSprite {
        return this.scene.add.tileSprite(posX, posY, width, height, texture)
            .setOrigin(0, 0)
            .setScrollFactor(0);
    }

    setTweensEffect(params: {y: number, duration: number, repeat: number, sprite: GameObjects.TileSprite}): Tweens.Tween {
        return this.scene.tweens.add({
            targets: params.sprite,
            ease: 'Sine.inOut',
            yoyo: true,
            ...params
        });
    }

    // add a game object to the scene
    displayGameObject(existing: GameObjects.GameObject): void {
        this.scene.add.existing(existing);
    }

    // create & add a sprite to the scene
    displaySprite(params: DisplaySpriteParameters): Optional<Types.Physics.Arcade.SpriteWithDynamicBody> {
        const { posX, posY, rotation, scale, spriteRef } = params;
        // new SpriteWithDynamicBody(scene, posX, posY, spriteRef) from physics factory
        const sprite = this.scene.physics.add.sprite(posX, posY, spriteRef);
        sprite.angle = rotation;
        sprite.scale = scale;
        this.scene.add.existing(sprite);
        return sprite;
    }
}
