<script lang="ts">
    let { codeBlocks = $bindable([]), selected = $bindable(null), width = $bindable(0), height = $bindable(0), action = $bindable('adding') }: 
    { codeBlocks: CanvaCodeBlock[], selected: CanvaCodeBlock | null, width: number, height: number, action: 'adding' | 'changing' } = $props();

    type CanvaCodeBlock = {
        id: string,
        x: number,
        y: number
    }

    function handleDragStart(e: DragEvent) {
        const target = e.target as HTMLElement;
        width = target.clientWidth || 0;
        height = target.clientHeight || 0;
        action = 'adding';
    }

    function allowDrop(e: DragEvent) {
        e.preventDefault();
    }

    function drop(e: DragEvent) {
        e.preventDefault();
        
        if(action === 'changing') {
            codeBlocks = codeBlocks.filter((codeBlock) => codeBlock.id !== selected?.id)
        }
        width = 0
        height = 0
    }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="blocks" ondrop={drop} ondragover={allowDrop}>
    <p class="block" id="drag1" draggable="true" ondragstart={handleDragStart}>
        Block
    </p>
</div>

<style>
    .blocks {
        width: 100%;
        background-color: beige;
    }

    .block {
        background-color: lightcoral;
        color: white;
        display: inline-block;
        padding: 10px;
        border-radius: 5px;
    }

    .block:hover {
        cursor: move;
    }
</style>