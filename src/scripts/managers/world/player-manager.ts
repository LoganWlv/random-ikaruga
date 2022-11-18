import { Input, Math } from "phaser";
import Player from "../../model/characters/player";
import GameManager from "../game-manager";

export default class PlayerManager {
    static #KEY_BINDINGS: {[key: string]: number} = {
        UP: Input.Keyboard.KeyCodes.UP,
        RIGHT: Input.Keyboard.KeyCodes.RIGHT,
        DOWN: Input.Keyboard.KeyCodes.DOWN,
        LEFT: Input.Keyboard.KeyCodes.LEFT,
        FIRE: Input.Keyboard.KeyCodes.SPACE,
    };
    player: Player;
    KEYS_CONTROL: any; // mb enforce type with keybindings keys 🤷‍♂️

    constructor(player: Player) {
        this.player = player;
        this.KEYS_CONTROL = GameManager.scene.input.keyboard.addKeys(PlayerManager.#KEY_BINDINGS);
        Player.loadTilemap();
    }

    spawn(): void {
        this.player.display(Player.spaceshipDisplayParameters);
        this.player.enableBody();
        this.player.enableWorldCollision();
    }

    #vector2Instance = new Math.Vector2({x: 0,y: 0});
    update(delta: number): void {
        this.#vector2Instance.y = this.KEYS_CONTROL.UP.isDown ? -1 : 0;
        this.#vector2Instance.y += this.KEYS_CONTROL.DOWN.isDown ? 1 : 0;
        this.#vector2Instance.x = this.KEYS_CONTROL.RIGHT.isDown ? 1 : 0;
        this.#vector2Instance.x += this.KEYS_CONTROL.LEFT.isDown ? -1 : 0;
        this.player.accelerate(this.#vector2Instance, delta);
    }
}
