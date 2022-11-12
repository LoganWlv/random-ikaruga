import { Types } from "phaser";
import GameManager from "../../managers/game-manager";
import { ifPresent, Optional } from "../utils/optional";

export interface DisplaySpriteParameters {
    posX: number;
    posY: number;
    rotation: number;
    scale: number;
    spriteRef: string;
}

export interface Displayable {
    sprite?: Optional<Types.Physics.Arcade.SpriteWithDynamicBody>;
    display: (displaySpriteParameters: DisplaySpriteParameters) => void;
}

export class DisplayableUtils {
    static displaySprite(displayable: Displayable, displaySpriteParameters: DisplaySpriteParameters): void {
        displayable.sprite = GameManager.sceneManager.displaySprite(displaySpriteParameters);
    }
}
