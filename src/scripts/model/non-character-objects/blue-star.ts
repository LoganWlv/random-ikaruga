import { Math } from "phaser";
import Nco from "./nco";

export default class BlueStar extends Nco {
    static #starDisplayParameters = {
        posX: 820,
        posY: 0,
        rotation: 0,
        scale: 1,
        spriteRef: 'star'
    };

    constructor() {
        super();
        this.velocity = {x: Math.Between(-140, -180), y: Math.Between(-20, 20)}; // px/sec
        this.displaySpriteParameters = { ...BlueStar.#starDisplayParameters, ...{posY: Math.Between(100, 500)} };
    }
}
