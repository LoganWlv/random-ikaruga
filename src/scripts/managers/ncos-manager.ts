import Asteroid from "../model/non-character-objects/asteroid";
import Nco from "../model/non-character-objects/nco";

export default class NcosManager {
    ncos: Array<Nco>;
    // TODO - add a set of spawners to update

    constructor() {
        this.ncos = Array<Nco>();
        // this.#loadAsteroidsTilemap(); - WIP
    }

    spawnAsteroid(): void {
        const asteroid = new Asteroid();
        asteroid.display();
        asteroid.enableBody();
        asteroid.setStaticAcceleration();
        this.ncos.push(asteroid);
    }

    #timeSinceLastAsteroidSpawn: number = 0; // ms - should be encapsulated in a spawner
    update(time: number, delta: number): void {
        // spawn
        this.#timeSinceLastAsteroidSpawn += delta;
        if (time > 5000 && this.#timeSinceLastAsteroidSpawn > 2000) {
            this.spawnAsteroid();
            this.#timeSinceLastAsteroidSpawn = 0;
        }

        this.#cleanNcos();
    }

    // WIP
    // #loadAsteroidsTilemap(): void {
    //     Asteroid.loadTilemap(this.#scene);
    // }

    #cleanNcos(): void {
        const cleanableNcos = this.ncos.filter((nco) => {
            const position = nco.sprite?.body.position;
            if (position?.x && position?.y) {
                if (position.x > 900 || position.x < -100) return true;
                if (position.y > 700 || position.y < -100) return true;
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
