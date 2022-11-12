import { Spawnable } from "../interactions/spawnable";
import { Optional } from "../utils/optional";

interface SpawnerConfig<T extends Spawnable> {
    startingTime?: number;
    waitingTime?: number;
    repeat?: integer;
    spawnPattern: () => T;
}

export default class Spawner<T extends Spawnable> {
    #startingTime = 0.; // ms
    #waitingTime = 1000.; // ms
    #waitedTime = 1000.; // ms
    #repeat: integer = -1; // ms, -1 means infinite
    #spawnPattern: () => T;

    constructor(config: SpawnerConfig<T>) {
        if (config.startingTime) {
            this.#startingTime = config.startingTime;
        }
        if (config.waitingTime) {
            this.#waitingTime = config.waitingTime;
            this.#waitedTime = config.waitingTime; // enable first spawn
        }
        if (config.repeat) {
            this.#repeat = config.repeat;
        }
        this.#spawnPattern = config.spawnPattern;
    }

    update(time: number, delta: number): Optional<T> {
        let spawned = null;
        if (this.#startingTime < time) {
            this.#waitedTime += delta;
        }

        const isTimeToSpawn = this.#waitedTime > this.#waitingTime;
        const isEnemyLeftToSpawn = this.#repeat !== 0;
        if (isTimeToSpawn && isEnemyLeftToSpawn) {
            this.#repeat --;
            this.#waitedTime = 0;
            spawned = this.spawn();
        }
        return spawned
    }

    // calling spawn manually doesn't affect the spawn loop and the number of enemies to spawn
    spawn(): T {
       return this.#spawnPattern();
    }
}