import { Hittable, HittableUtils } from "../interactions/hittable";

export class Nco implements Hittable {
    protected _position = {x: 0 , y: 0};

    public get position() : {x: number , y: number} {
        return this._position;
    }

    public isHit(): boolean {
        return HittableUtils.isHit(this);
    }
}
