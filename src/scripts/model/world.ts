import { Npc } from "./characters/npc";
import { Player } from "./characters/player";
import { WorldMap } from "./map/world-map";
import { Nco } from "./non-character-objects/nco";

export class World {
    static instance = this;
    private _player = new Player();
    private _npcs = Array<Npc>();
    private _ncos = Array<Nco>();
    private _worldMap = new WorldMap();
    
    public get player() : Player {
        return this._player;
    }

    public get npcs(): Npc[] {
        return this._npcs;
    }

    public get ncos(): Nco[] {
        return this._ncos;
    }

    public get worldMap(): WorldMap {
        return this._worldMap;
    }
    
    public resetWorld(): void {
        this._player = new Player();
        this._npcs = Array<Npc>();
    }
}
