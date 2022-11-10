import { HittableUtils } from "../../model/interactions/hittable";
import Asteroid from "../../model/non-character-objects/asteroid";
import BlueStar from "../../model/non-character-objects/blue-star";
import Nco from "../../model/non-character-objects/nco";
import GameManager from "../game-manager";

export default class NcosManager {
    ncos: Array<Nco>;
    // TODO - add a set of spawners to update

    constructor() {
        this.ncos = Array<Nco>();
        Asteroid.loadTilemap();
    }

    spawnAsteroid(): void {
        const asteroid = new Asteroid();
        asteroid.display();
        asteroid.enableBody();
        asteroid.setStaticAcceleration();
        asteroid.sprite?.setBounce(3, 3);
        HittableUtils.enableCollision(asteroid, GameManager.playerManager.player, () => undefined);
        this.ncos.push(asteroid);
    }

    spawnBlueStar(): void {
        const star = new BlueStar();
        star.display();
        star.enableBody();
        star.setStaticAcceleration();
        HittableUtils.enableOverlap(star, GameManager.playerManager.player, () => {
            this.ncos = this.ncos.filter((nco) => nco !== star);
            star.sprite?.destroy();
        });
        this.ncos.push(star);
    }

    #timeSinceLastAsteroidSpawn: number = 0; // ms - should be encapsulated in a spawner
    #timeSinceLastStarSpawn: number = 0; // ms - should be encapsulated in a spawner
    update(time: number, delta: number): void {
        // spawns
        this.#timeSinceLastAsteroidSpawn += delta;
        if (time > 10000 && this.#timeSinceLastAsteroidSpawn > 2500) {
            this.spawnAsteroid();
            this.#timeSinceLastAsteroidSpawn = 0;
        }

        this.#timeSinceLastStarSpawn += delta;
        if (time > 4000 && this.#timeSinceLastStarSpawn > 2000) {
            this.spawnBlueStar();
            this.#timeSinceLastStarSpawn = 0;
        }

        this.#cleanNcos();
    }

    #cleanNcos(): void {
        const cleanableNcos = this.ncos.filter((nco) => {
            const position = nco.sprite?.body?.position;
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
