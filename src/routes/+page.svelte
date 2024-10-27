<script lang="ts">
	import { onMount } from "svelte";

    type CanvaCodeBlock = {
        id: string,
        x: number,
        y: number
    }

    let codeBlocks = $state<CanvaCodeBlock[]>([])
    let selected = $state<CanvaCodeBlock>()
    let snapshots = $state<CanvaCodeBlock[][]>([])
    let history = $state(-1)

    let width = 0
    let height = 0
    
    function allowDrop(e: DragEvent) {
        e.preventDefault();
        
        const svgEl = e.target as SVGElement;
        const { left, top } = svgEl.getBoundingClientRect();
        const x = +(e.clientX - left).toFixed();
        const y = +(e.clientY - top).toFixed();
    }

    function drop(e: DragEvent) {
        e.preventDefault();
        
        const svgEl = e.target as SVGElement;
        const { left, top } = svgEl.getBoundingClientRect();
        const x = +((e.clientX - left) - width / 2).toFixed();
        const y = +((e.clientY - top) - height / 2).toFixed();

        const codeBlock = {
			id: window.crypto.randomUUID(),
			x: x,
			y: y,
		}

        codeBlocks.push(codeBlock)
        selected = codeBlock

        width = 0
        height = 0


        // let data = e.dataTransfer.getData("Text");
        // e.target.appendChild(document.getElementById(data));
        // e.preventDefault();
        // console.log("drop");
    }

    $inspect(codeBlocks)
</script>

<div class="container">
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div style="background-color: lightcyan; position: relative; width: 100%; height: 100vh" id="div1" ondrop={drop} ondragover={allowDrop}>
        {#each codeBlocks as codeBlock}
            <p style="position: absolute; left: {codeBlock.x}px; top: {codeBlock.y}px;" class="block" id="drag1" draggable="true">
                Block
            </p>
        {/each}
    </div>
    <div class="blocks">
        <p class="block" id="drag1" draggable="true" ondragstart={(e) => {
            console.log(e)
            width = e?.srcElement?.clientWidth || 0
            height = e?.srcElement?.clientHeight || 0
        }}>
            Block
        </p>
    </div>
</div>

<style>
    :global(body) {
        margin: 0;
    }

    .container {
        display: grid;
        grid-template-columns: 3fr 1fr;
        gap: 1rem;
    }

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