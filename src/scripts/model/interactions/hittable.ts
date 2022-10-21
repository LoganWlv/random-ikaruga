export interface Hittable {
    isHit: () => boolean;
}

export class HittableUtils {
    static isHit(hittable: Hittable): boolean {
        throw new Error("Not implemented");
    }
}
