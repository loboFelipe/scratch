<script lang="ts">
    import CodeSidebar from "$lib/components/CodeSidebar.svelte";
    import CodeblocksCanva from "$lib/components/CodeblocksCanva.svelte";
    import OutputCanva from "$lib/components/OutputCanva.svelte";

    type CanvaCodeBlock = {
        id: string,
        x: number,
        y: number
    }

    let codeBlocks = $state<CanvaCodeBlock[]>([])
    let selected = $state<CanvaCodeBlock | null>(null)

    // svelte-ignore non_reactive_update
    let width: number = 0;
    // svelte-ignore non_reactive_update
    let height: number = 0;
    // svelte-ignore non_reactive_update
    let action: 'adding' | 'changing' = 'adding';
</script>

<div class="container">
    <CodeSidebar bind:width bind:height bind:action bind:codeBlocks bind:selected />
    <CodeblocksCanva bind:width bind:height bind:action bind:codeBlocks bind:selected />
    <OutputCanva />
</div>

<style>
    :global(body) {
        margin: 0;
    }

    .container {
        display: grid;
        grid-template-columns: 0.5fr 1fr 1fr;
        gap: 0.5rem;
    }
</style>