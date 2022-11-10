import NcosManager from "./ncos-manager";
import PlayerManager from "./player-manager";
import Player from "../../model/characters/player";
import WorldMap from "./world-map";
import NpcsManager from "./npcs-manager";

export default class World {
    static #ERROR_INSTANCE_NOT_SET = 'You should initialize the instance';
    #playerManager?: PlayerManager;
    #ncosManager?: NcosManager;
    #npcsManager?: NpcsManager;
    #worldMap?: WorldMap;

    get playerManager(): PlayerManager {
        if (!this.#playerManager) {
            throw new Error(World.#ERROR_INSTANCE_NOT_SET);
        }
        return this.#playerManager;
    }

    get ncosManager(): NcosManager {
        if (!this.#ncosManager) {
            throw new Error(World.#ERROR_INSTANCE_NOT_SET);
        }
        return this.#ncosManager;
    }

    get npcsManager(): NpcsManager {
        if (!this.#npcsManager) {
            throw new Error(World.#ERROR_INSTANCE_NOT_SET);
        }
        return this.#npcsManager;
    }
    
    get worldMap(): WorldMap {
        if (!this.#worldMap) {
            throw new Error(World.#ERROR_INSTANCE_NOT_SET);
        }
        return this.#worldMap;
    }

    initWorldMap(): void {
        this.#worldMap = new WorldMap();
    }

    initPlayerManager(): void {
        this.#playerManager = new PlayerManager(new Player());
    }

    initNcosManager(): void {
        this.#ncosManager = new NcosManager();
    }

    initNpcsManager(): void {
        this.#npcsManager = new NpcsManager();
    }

    update(time: number, delta: number): void {
        // we update only if the dedicated manager is set
        this.#worldMap?.udpateMap(delta);
        this.#playerManager?.update(delta);
        this.#ncosManager?.update(time, delta);
    }
}
