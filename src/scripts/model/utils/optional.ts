export type Optional<T> = T | undefined | null;

// maybe not that useful
export const isPresent = <T>(optional: Optional<T>): boolean => optional !== null && optional !== undefined;
export const ifPresent = <T>(optional: Optional<T>, callback: (opt: T) => unknown): void => { 
    if (isPresent(optional))
        callback(<T>optional);
};
export const map = <T, CT>(optional: Optional<T>, callback: (opt: T) => CT): Optional<CT> => { 
    if (isPresent(optional)) {
        return callback(<T>optional);
    }
    return null;
};
