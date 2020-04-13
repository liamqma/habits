interface LocalStorage {
    getItem(name: string): string;
    setItem(name: string, data: string): void;
}

declare module "global/window" {
    function alert(message: string): void;
    function confirm(message: string): boolean;
    export const localStorage: LocalStorage;
}
