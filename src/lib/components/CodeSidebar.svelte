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


    // types of blocks
    // Events
        // when flag clicked
        // when {$key} key pressed
        // When this sprite cliecked
    // Control
        // wait {$seconds} seconds
        // repeat {$times} times
        // forever
        // If {$condition} then
        // If {$condition} then else then
        // Wait until 
        // Stop {all / this script}
    // Motion
        // Move {$steps} steps
        // Turn right {$degrees} degrees
        // Turn left {$degrees} degrees

    // categories - types
    // type - if_else | repeat | wait | move | turn | stop | start
    // shapes - hat | stack | c-block c-1 | c-block c-2
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="sidebar">
    <div class="sidebar-list">
        <button>
            <span class="icon">↔️</span>
            <span>Motion</span>
        </button>
        <button>
            <span class="icon">🏁</span>
            <span>Events</span>
        </button>
        <button>
            <span class="icon">🕹️</span>
            <span>Control</span>
        </button>
    </div>
    <div class="blocks" ondrop={drop} ondragover={allowDrop}>
        <p class="block" id="drag1" draggable="true" ondragstart={handleDragStart}>
            Block
        </p>
    </div>
</div>

<style>
    .sidebar {
        width: 100%;
        background-color: white;
        border-right: 1px solid lightgray;
        display: flex;
    }
    .sidebar-list {
        width: 50%;
        background-color: white;
        border-right: 1px solid lightgray;
    }
    .sidebar-list button {
        width: 100%;
        background-color: transparent;
        border: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px;
        gap: 5px;
        margin-bottom: 2px;
    }
    .sidebar-list button:hover {
        background-color: rgba(0, 0, 0, 0.1);
        cursor: pointer;
    }
    .sidebar-list button .icon {
        font-size: large;
    }
    .blocks {
        width: 100%;
        background-color: white;
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