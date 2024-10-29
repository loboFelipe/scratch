import { writable } from "svelte/store";
import { getContext, setContext } from "svelte";


export function setContextStore<T>(key: string, initialValue: T) {
    const contextStore = writable<T>(initialValue);
    return setContext(key, contextStore)
}


export function getContextStore<T>(key: string) {
    return getContext<ReturnType<typeof setContextStore<T>>>(key)
}
