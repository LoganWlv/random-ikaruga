import { Hittable } from "./hittable";

export interface Damageable extends Hittable {
    hp: number;
    takeDamages: (dmg: number) => void;
}

export class DamageableUtils {
    static takeDamages(damageable: Damageable ,dmg: number): void {
        if (damageable.isHit()) {
            damageable.hp -= dmg;
        }
    }
}
