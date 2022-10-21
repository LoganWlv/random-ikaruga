import { Npc } from "./characters/npc";
import { Player } from "./characters/player";

export class World {
    static WorldInstance = this;
    private _player = new Player();
    private _npcs = Array<Npc>();
    
    public get player() : Player {
        return this._player;
    }

    public get npcs(): Npc[] {
        return this._npcs;
    }
    
    public resetWorld(): void {
        this._player = new Player();
        this._npcs = Array<Npc>();
    }
}
