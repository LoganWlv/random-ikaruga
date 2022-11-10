import Npc from "../../model/characters/npc";

export default class NpcsManager {
    npcs: Array<Npc>;
    // TODO - add a set of spawners to update

    constructor() {
        this.npcs = Array<Npc>();
    }

    #cleanNcos(): void {
        const cleanableNcos = this.npcs.filter((npc) => {
            const position = npc.sprite?.body.position;
            if (position?.x && position?.y) {
                if (position.x > 900 || position.x < -100) return true;
                if (position.y > 700 || position.y < -100) return true;
            }
        });
        cleanableNcos.forEach((cleanableNco) => {
            // TODO - this is costly if many npc get created & destroy
            // a good way to manage perf is to use factory and simply object.setActive(false).setVisible(false);
            // then the ref of the inactive game object can be reused to spawn a new nco of the same kind
            cleanableNco.sprite?.destroy();
        });
        this.npcs = this.npcs.filter((npc) => !cleanableNcos.includes(npc))
    }
}
