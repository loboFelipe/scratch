<div class="output-canva">
    <div class="actions">
        <button>
            🏁
        </button>
        <button>
            🛑
        </button>
    </div>
    <div class="canva">

    </div>
</div>

<style>
    .actions {
        padding: 10px;
        width: 100%;
    }
    
    .actions button {
        padding: 5px;
        background-color: transparent;
        border: none;
        font-size: large;
    }
    .actions button:hover {
        background-color: rgba(0, 0, 0, 0.1);
        cursor: pointer;
    }

    .output-canva {
        background-color: lightcyan;
        width: 100%; 
        height: 100vh;
        position: relative;
    }

    .canva {
        position: absolute;
        top: 50px;
        bottom: 50%;
        right: 10px;
        left: 10px;
        background-color: white;
        border: 1px solid lightgray;
        border-radius: 5px;
    }
</style>