<script lang="ts">
	import type { CodeBlock } from "$lib/types/codeBlock";
	import { getContextStore } from "$lib/utils/contextStore.svelte";

	const codeBlocks = getContextStore<CodeBlock[]>('codeBlocks');
    const selected = getContextStore<CodeBlock | null>('selected');
    const width = getContextStore<number>('width');
    const height = getContextStore<number>('height');
    const dragging = getContextStore<boolean>('dragging');
    const action = getContextStore<'adding' | 'changing'>('action');

    function handleDragStart(e: DragEvent) {
        const target = e.target as HTMLElement;
        $width = target.clientWidth || 0;
        $height = target.clientHeight || 0;
        $action = 'adding';
        $dragging = true;
    }

    function allowDrop(e: DragEvent) {
        e.preventDefault();
    }

    function drop(e: DragEvent) {
        e.preventDefault();
        
        if($action === 'changing') {
            $codeBlocks = $codeBlocks.filter((codeBlock) => codeBlock.id !== $selected?.id)
        }
        $width = 0
        $height = 0
        $dragging = false;
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