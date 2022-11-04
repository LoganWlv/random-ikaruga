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
    displaySpriteParameters?: Optional<DisplaySpriteParameters>;
    sprite?: Optional<Types.Physics.Arcade.SpriteWithDynamicBody>;
    display: () => void;
}

export class DisplayableUtils {
    static displaySprite(displayable: Displayable): void {
        ifPresent(displayable.displaySpriteParameters, (displaySpriteParameters) =>
            displayable.sprite = GameManager.world.sceneManager.displaySprite(displaySpriteParameters)
        );
    }
}
