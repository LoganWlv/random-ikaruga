import Npc from "../../model/characters/npc";
import Spawner from "../../model/spawners/spawner";
import { isPresent } from "../../model/utils/optional";
import SceneManager from "../scene-manager";

export default class NpcsManager {
    npcs: Array<Npc>;
    #spawners: Array<Spawner<Npc>> = [];

    constructor() {
        this.npcs = Array<Npc>();
    }

    destroyNco(npc: Npc): void {
        this.npcs = this.npcs.filter((current) => current !== npc);
        npc.sprite?.destroy();
    }

    addSpawner(spawner: Spawner<Npc>): void {
        this.#spawners.push(spawner);
    }

    removeSpawner(spawner: Spawner<Npc>): void {
        this.#spawners = this.#spawners.filter(s => s !== spawner);
    }

    update(time: number, delta: number): void {
        const spawnedNpcs = this.#spawners
            .map((spawner) => spawner.update(time, delta))
            .filter((npc) => isPresent(npc)) as Npc[];
        this.npcs.push(
            ...spawnedNpcs
        );
        this.#cleanNpcs();
    }

    #cleanNpcs(): void {
        const cleanableNpcs = this.npcs.filter((npc) => {
            const position = npc.sprite?.body.position;
            if (position?.x && position?.y) {
                if (position.x > SceneManager.viewPort.width + 100 || position.x < -100) return true;
                if (position.y > SceneManager.viewPort.height || position.y < -100) return true;
            }
        });
        cleanableNpcs.forEach((cleanableNpc) => {
            // TODO - this is costly if many npc get created & destroy
            // a good way to manage perf is to use factory and simply object.setActive(false).setVisible(false);
            // then the ref of the inactive game object can be reused to spawn a new npc of the same kind
            cleanableNpc.sprite?.destroy();
        });
        this.npcs = this.npcs.filter((npc) => !cleanableNpcs.includes(npc))
    }
}
