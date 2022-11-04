import { Game, Scene } from "phaser";
import NcosManager from "./ncos-manager";
import NpcsManager from "./npcs-manager";
import PlayerManager from "./player-manager";
import SceneManager from "./scene-manager";
import World from "./world";
import WorldMap from "./world-map";

export default class GameManager {
    static #ERROR_INSTANCE_NOT_SET = 'You should initialize the GameManager with a Phaser.Game instance';
    static #ERROR_CREATE_OUTSIDE = 'Not able to create a GameManager instance outside the class';
    // GLOBAL
    static #INSTANCE: GameManager;
    static #CREATING_FROM_INSTANCE = false; // private constructor pattern

    static get INSTANCE(): GameManager {
        if (!this.#INSTANCE)
            throw new Error(this.#ERROR_INSTANCE_NOT_SET);
        return this.#INSTANCE;
    }

    static initializeGameManager(game: Game): void {
        GameManager.#CREATING_FROM_INSTANCE = true;
        GameManager.#INSTANCE = new GameManager(game);
        GameManager.#CREATING_FROM_INSTANCE = false;
    }

    static get game(): Game {
        return GameManager.INSTANCE.#game;
    }

    static get world(): World {
        return GameManager.INSTANCE.#world;
    }

    static get worldMap(): WorldMap {
        return GameManager.INSTANCE.#world.worldMap;
    }

    static get sceneManager(): SceneManager {
        return GameManager.INSTANCE.#world.sceneManager;
    }

    static get scene(): Scene {
        return GameManager.INSTANCE.#world.sceneManager.scene;
    }

    static get playerManager(): PlayerManager {
        return GameManager.INSTANCE.#world.playerManager;
    }

    static get npcsManager(): NpcsManager {
        return GameManager.INSTANCE.#world.npcsManager;
    }

    static get ncosManager(): NcosManager {
        return GameManager.INSTANCE.#world.ncosManager;
    }

    // INSTANCE
    #game: Game;
    #world: World;

    constructor(game: Game) {
        if (!GameManager.#CREATING_FROM_INSTANCE)
            throw new Error(GameManager.#ERROR_CREATE_OUTSIDE);
        if (!game)
            throw new Error(GameManager.#ERROR_INSTANCE_NOT_SET);
        this.#game = game;
        this.#world = new World();
    }
}
