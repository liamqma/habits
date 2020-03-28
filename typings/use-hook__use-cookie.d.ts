declare module "@use-hook/use-cookie" {
    export function useCookie<Value>(
        key: string,
        initialValue: string
    ): [
        string,
        (value: string, options: { domain?: string; expires?: number }) => void
    ];
}
