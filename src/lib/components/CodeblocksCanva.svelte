<script lang="ts">
    import type { CodeBlock } from "$lib/types/codeBlock";
	import { getContextStore } from "$lib/utils/contextStore.svelte";

	const codeBlocks = getContextStore<CodeBlock[]>('codeBlocks');
    const selected = getContextStore<CodeBlock | null>('selected');
    const width = getContextStore<number>('width');
    const height = getContextStore<number>('height');
    const action = getContextStore<'adding' | 'changing'>('action');
    const dragging = getContextStore<boolean>('dragging');
    
    function allowDrop(e: DragEvent) {
        e.preventDefault();
        e.stopPropagation();
    }

    function drop(e: DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        
        if($action === 'changing') {
            $codeBlocks = $codeBlocks.filter((codeBlock) => codeBlock.id !== $selected?.id)
        }

        const svgEl = e.target as SVGElement;
        const { left, top } = svgEl.getBoundingClientRect();
        const x = +((e.clientX - left) - ($width / 2)).toFixed();
        const y = +((e.clientY - top) - ($height)).toFixed();

        const codeBlock = {
            id: window.crypto.randomUUID(),
            x: x,
            y: y,
        }

        $codeBlocks = [...$codeBlocks, codeBlock]
        $selected = codeBlock
        $width = 0
        $height = 0
        $dragging = false;
    }

    function handleDragStart(e: DragEvent, codeBlock: CodeBlock) {
        const target = e.target as HTMLElement;
        $width = target.clientWidth || 0;
        $height = target.clientHeight || 0;
        $selected = codeBlock
        $action = 'changing'
        $dragging = true;
    }

    $inspect($dragging)
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div style="background-color: lightcyan; position: relative; width: 100%; height: 100vh" id="div1" ondrop={drop} ondragover={allowDrop}>
    {#each $codeBlocks as codeBlock}
        <p data-id={codeBlock.id} style="position: absolute; left: {codeBlock.x}px; top: {codeBlock.y}px;" class="block" draggable="true" ondragstart={(e) => {
            handleDragStart(e, codeBlock)
        }} ondragover={(e: DragEvent) => {
            const target = e.target as HTMLElement;
            if (target.dataset.id !== $selected?.id) {
                const clientY = e.clientY;
                const targetTop = target.offsetTop;
                console.log('on drag over', e);
                if (clientY < targetTop + target.offsetHeight / 2) {
                    target.style.borderTop = '5px solid yellow';
                    target.style.borderBottom = '';
                } else {
                    target.style.borderBottom = '5px solid yellow';
                    target.style.borderTop = '';
                }
            }
        }} ondragleave={(e: DragEvent) => {
            const target = e.target as HTMLElement;
            if (target.dataset.id !== $selected?.id) {
                console.log('on drag leave', e);
                target.style.borderBottom = '';
                target.style.borderTop = '';
            }
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