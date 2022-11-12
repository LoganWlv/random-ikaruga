import Asteroid from "../../model/non-character-objects/asteroid";
import Nco from "../../model/non-character-objects/nco";
import Spawner from "../../model/spawners/spawner";
import { isPresent } from "../../model/utils/optional";
import SceneManager from "../scene-manager";

export default class NcosManager {
    ncos: Array<Nco>;
    #spawners: Array<Spawner<Nco>> = [];

    constructor() {
        this.ncos = Array<Nco>();
        Asteroid.loadTilemap();
    }
    
    destroyNco(nco: Nco): void {
        this.ncos = this.ncos.filter((current) => current !== nco);
        nco.sprite?.destroy();
    }

    addSpawner(spawner: Spawner<Nco>): void {
        this.#spawners.push(spawner);
    }

    removeSpawner(spawner: Spawner<Nco>): void {
        this.#spawners = this.#spawners.filter(s => s !== spawner);
    }

    update(time: number, delta: number): void {
        const spawnedNcos = this.#spawners
            .map((spawner) => spawner.update(time, delta))
            .filter((nco) => isPresent(nco)) as Nco[];
        this.ncos.push(
            ...spawnedNcos
        );
        this.#cleanNcos();
    }

    #cleanNcos(): void {
        const cleanableNcos = this.ncos.filter((nco) => {
            const position = nco.sprite?.body?.position;
            if (position?.x && position?.y) {
                if (position.x > SceneManager.viewPort.width + 100 || position.x < -100) return true;
                if (position.y > SceneManager.viewPort.height || position.y < -100) return true;
            }
        });
        cleanableNcos.forEach((cleanableNco) => {
            // TODO - this is costly if many ncos get created & destroy
            // a good way to manage perf is to use factory and simply object.setActive(false).setVisible(false);
            // then the ref of the inactive game object can be reused to spawn a new nco of the same kind
            cleanableNco.sprite?.destroy();
        });
        this.ncos = this.ncos.filter((nco) => !cleanableNcos.includes(nco))
    }
}
