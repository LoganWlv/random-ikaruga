export type Optional<T> = T | undefined | null;

export const isPresent = <T>(optional: Optional<T>): optional is T => optional !== null && optional !== undefined;
export const ifPresent = <T>(optional: Optional<T>, callback: (opt: T) => unknown): void => { 
    if (isPresent(optional))
        callback(optional);
};
export const combineifPresent = <T extends object>(source: {
    [key in keyof T]: Optional<T[key]>;
  }): Optional<T> => {
    for (let value in source) {
        if (isPresent(value) !== true) {
            return null;
        }
    }
    return Object.entries(source)
        .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), <T>{});
};
export const map = <T, CT>(optional: Optional<T>, callback: (opt: T) => CT): Optional<CT> => { 
    if (isPresent(optional)) {
        return callback(optional);
    }
    return null;
};
