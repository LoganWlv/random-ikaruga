import { Damageable, DamageableUtils } from "../interactions/damageable";
import { HittableUtils } from "../interactions/hittable";
import { Moveable, MoveableUtils } from "../interactions/moveable";

export class Character implements Moveable, Damageable {
    protected _hp = 0.;
    protected _speed = 0.;
    protected _position = {x: 0 , y: 0};

    
    public get hp() : number {
        return this._hp;
    }

    public get speed() : number {
        return this._speed;
    }

    public get position() : {x: number , y: number} {
        return this._position;
    }


    public move(direction: {dx: number, dy: number}): void {
        MoveableUtils.move(this, direction);
    }

    public isHit(): boolean {
        return HittableUtils.isHit(this);
    }

    public takeDamages(dmg: number): void {
        DamageableUtils.takeDamages(this, dmg);
    }
}
