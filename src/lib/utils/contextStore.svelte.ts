import { writable, type Writable } from "svelte/store";
import { getContext, setContext } from "svelte";


export function setContextStore<T>(key: string, initialValue: T) {
    const contextStore = $state<Writable<T>>(writable(initialValue))
    return setContext(key, contextStore)
}


export function getContextStore<T>(key: string) {
    return getContext<ReturnType<typeof setContextStore<T>>>(key)
}
