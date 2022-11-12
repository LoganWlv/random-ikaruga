import SceneManager from "../../managers/scene-manager";
import { DisplaySpriteParameters } from "../interactions/displayable";
import Nco from "./nco";

export default class BlueStar extends Nco {
    static starDisplayParameters: DisplaySpriteParameters = {
        posX: SceneManager.viewPort.width,
        posY: SceneManager.viewPort.height / 2,
        rotation: 0,
        scale: 1,
        spriteRef: 'star'
    };

    constructor() {
        super();
        this.velocity = {x: 160, y: 0}; // default
    }
}
