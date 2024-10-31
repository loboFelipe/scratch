<script lang="ts">
    import CodeSidebar from "$lib/components/CodeSidebar.svelte";
    import CodeblocksCanva from "$lib/components/CodeblocksCanva.svelte";
    import OutputCanva from "$lib/components/OutputCanva.svelte";
</script>

<div class="container">
    <CodeSidebar />
    <CodeblocksCanva/>
    <OutputCanva />
</div>

<style>
    :global(body) {
        margin: 0;
    }

    .container {
        display: grid;
        grid-template-columns: 0.5fr 1fr 0.75fr;
        gap: 0;
    }
</style>