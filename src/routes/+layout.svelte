<script lang="ts">
    import type { Snippet } from "svelte";
    import { setContextStore } from "$lib/utils/contextStore.svelte";
    import type { CodeBlock } from "$lib/types/codeBlock";

    let { children }: { children: Snippet } = $props();

    setContextStore<CodeBlock[]>('codeBlocks', [])
    setContextStore<CodeBlock | null>('selected', null)
    setContextStore<number>('width', 0)
    setContextStore<number>('height', 0)
    setContextStore<boolean>('dragging', false)
    setContextStore<'adding' | 'changing'>('action', 'adding')
</script>

<main>
    {@render children()}
</main>