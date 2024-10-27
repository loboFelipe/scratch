<script lang="ts">
    let { codeBlocks = $bindable([]), selected = $bindable(null), width = $bindable(0), height = $bindable(0), action = $bindable('adding') }: 
    { codeBlocks: CanvaCodeBlock[], selected: CanvaCodeBlock | null, width: number, height: number, action: 'adding' | 'changing' } = $props();

    type CanvaCodeBlock = {
        id: string,
        x: number,
        y: number
    }
    
    function allowDrop(e: DragEvent) {
        e.preventDefault();
    }

    function drop(e: DragEvent) {
        e.preventDefault();
        
        if(action === 'changing') {
            codeBlocks = codeBlocks.filter((codeBlock) => codeBlock.id !== selected?.id)
        }

        const svgEl = e.target as SVGElement;
        const { left, top } = svgEl.getBoundingClientRect();
        const x = +((e.clientX - left) - (width / 2)).toFixed();
        const y = +((e.clientY - top) - (height)).toFixed();

        const codeBlock = {
            id: window.crypto.randomUUID(),
            x: x,
            y: y,
        }

        codeBlocks.push(codeBlock)
        selected = codeBlock
        width = 0
        height = 0
    }

    function handleDragStart(e: DragEvent, codeBlock: CanvaCodeBlock) {
        const target = e.target as HTMLElement;
        width = target.clientWidth || 0;
        height = target.clientHeight || 0;
        selected = codeBlock
        action = 'changing'
    }

    $inspect(codeBlocks)
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div style="background-color: lightcyan; position: relative; width: 100%; height: 100vh" id="div1" ondrop={drop} ondragover={allowDrop}>
    {#each codeBlocks as codeBlock}
        <p style="position: absolute; left: {codeBlock.x}px; top: {codeBlock.y}px;" class="block" draggable="true" ondragstart={(e) => {
            handleDragStart(e, codeBlock)
        }}>
            Block
        </p>
    {/each}
</div>

<style>
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