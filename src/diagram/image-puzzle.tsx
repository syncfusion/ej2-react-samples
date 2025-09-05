import * as React from "react";
import { DiagramComponent, Node, NodeConstraints, SnapConstraints, SelectorConstraints, DiagramConstraints  } from '@syncfusion/ej2-react-diagrams';
import type {NodeModel, HtmlModel}from '@syncfusion/ej2-react-diagrams';
import { SampleBase } from "../common/sample-base";


interface ImageTheme {
    [key: number]: string;
}

let diagram: DiagramComponent;
let gameBoard: number[] = new Array(16);
let emptyIndex: number = 0;
let moveCount: number = 0;
let gameTimer: any = null;
let elapsedSeconds: number = 0;
let timeDisplay: string = "00:00";
let isPaused: boolean = false;
let gameStarted: boolean = false;
let showClue: boolean = false;
let isPuzzleSolved: boolean = false;
let diagramCreated: boolean = false;
let nodes: NodeModel[] = [];

// Image collections
let imageCollections: ImageTheme[] = [];
let currentImageMap: ImageTheme;
let currentThemeIndex: number = 0;
let imageRandom = Math.random;

// Constants
const tileWidth = 130;
const tileHeight = 130;
const gridSize = 4;


initializeImageCollections();
initializeGame();
setupTimer();

function initializeImageCollections(): void {
    // bridge theme
    const bridgeTheme: ImageTheme = {};
    // Nature theme
    const natureTheme: ImageTheme = {};
    // Man theme
    const manTheme: ImageTheme = {};

    for (let i = 1; i <= 16; i++) {
        const row = Math.ceil(i / 4);
        const col = ((i - 1) % 4) + 1;
        bridgeTheme[i] = `./src/diagram/Images/puzzle/bridge${col}x${row}.png`;
        natureTheme[i] = `./src/diagram/Images/puzzle/image${col}x${row}.png`;
        manTheme[i] = `./src/diagram/Images/puzzle/man${col}x${row}.png`;
    }

    imageCollections = [bridgeTheme, natureTheme, manTheme];
    currentImageMap = imageCollections[0];
    currentThemeIndex = 0;
}

function onCreated(): void {
    diagramCreated = true;
    diagram.fitToPage();
    setTimeout(()=>{
        // show diagram
        const container = document.querySelector('.diagram-puzzle-container') as HTMLElement;
        if (container) {
            container.style.opacity = '1';
        }
    }, 10)
}
function onLoad(): void {
    if (diagramCreated) {
        setTimeout(() => diagram.fitToPage(), 10);
    }
}

function createNodes(): void {
    nodes = [];
    // Background Node
    const backgroundNode: NodeModel = {
        id: "backgroundNode",
        offsetX: 788,
        offsetY: 392,
        height: 755,
        width: 639,
        style: {
            fill: "#B0C4DE",
            opacity: 0.5
        },
        constraints: NodeConstraints.None,
        shape: {
            type: 'Basic',
            shape: 'Rectangle',
            cornerRadius: 5
        }
    };
    nodes.push(backgroundNode);

    // Moves counter node
    const moveNode: NodeModel = {
        id: "moves",
        offsetX: 615,
        offsetY: 80,
        width: 160, height: 100,
        constraints: NodeConstraints.None,
        shape: {
            type: 'HTML',
            content: getMovesTemplate()
        }
    };
    nodes.push(moveNode);

    // Time node
    const timeNode: NodeModel = {
        id: "time",
        offsetX: 976,
        offsetY: 80,
        width: 160, height: 100,
        constraints: NodeConstraints.None,
        shape: {
            type: 'HTML',
            content: getTimeTemplate()
        }
    };
    nodes.push(timeNode);

    // New game button
    const newGameNode: NodeModel = {
        id: "newgame",
        offsetX: 610,
        offsetY: 725,
        width: 150, height: 50,
        constraints: NodeConstraints.PointerEvents,
        shape: {
            type: 'HTML',
            content: getNewGameTemplate()
        }
    };
    nodes.push(newGameNode);

    // Pause button
    const pauseNode: NodeModel = {
        id: "pause",
        offsetX: 980,
        offsetY: 725,
        width: 150, height: 50,
        constraints: NodeConstraints.PointerEvents,
        shape: {
            type: 'HTML',
            content: getPauseTemplate()
        }
    };
    nodes.push(pauseNode);

    // Clue button
    const clueNode: NodeModel = {
        id: "clue",
        offsetX: 795,
        offsetY: 725,
        width: 150, height: 50,
        constraints: NodeConstraints.PointerEvents,
        shape: {
            type: 'HTML',
            content: getClueTemplate()
        }
    };
    nodes.push(clueNode);

    // Create puzzle tiles
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] !== 0) {
            const pieceNumber = gameBoard[i];

            const node: NodeModel = {
                id: `tile${pieceNumber}`,
                width: tileWidth,
                height: tileHeight,
                offsetX: getTileX(i),
                offsetY: getTileY(i),
                annotations: [{
                    id: `annotation${pieceNumber}`,
                    width: 25,
                    height: 25,
                    template: getAnnotationTemplate(pieceNumber),
                    visibility: false,
                    offset: { x: 0.7, y: 0.1 },
                    horizontalAlignment: 'Center',
                    verticalAlignment: 'Center'
                }],
                style: {
                    strokeColor: "white"
                },
                shape: {
                    type: 'Image',
                    source: getImageSourceForTile(pieceNumber)
                }
            };

            if (canMoveTile(i)) {
                node.constraints = NodeConstraints.PointerEvents;
            } else {
                node.constraints = NodeConstraints.None;
            }

            nodes.push(node);
        }
    }
}

function getMovesTemplate(): string {
    return `<div class="moves-counter">
                    <span class="label">MOVES: </span>
                    <span class="count">${moveCount}</span>
                </div>`;
}

function getTimeTemplate(): string {
    return `<div class="timer">
                    <span class="label">TIME: </span>
                    <span class="time-display">${timeDisplay}</span>
                </div>`;
}

function getNewGameTemplate(): string {
    return `<button class="new-game-btn" id="newGameBtn">
                    <span class="icon">🎮</span>
                    NEW GAME
                </button>`;
}

function getClueTemplate(): string {
    return `<button class="clue-btn" id="clueBtn">
                    <span class="icon">💡</span>
                    <span class="text">${showClue ? "HIDE CLUE" : "SHOW CLUE"}</span>
                </button>`;
}

function getPauseTemplate(): string {
    return `<button class="pause-btn" id="pauseBtn">
                    <span class="icon">${isPaused ? "▶️" : "⏸️"}</span>
                    <span class="text">${isPaused ? "RESUME" : "PAUSE"}</span>
                </button>`;
}

function getAnnotationTemplate(pieceNumber: number): string {
    return `<div class="number-badge">${pieceNumber}</div>`;
}

function initializeGame(): void {
    // Initialize solved state
    gameBoard[0] = 1; gameBoard[1] = 2; gameBoard[2] = 3; gameBoard[3] = 4;
    gameBoard[4] = 5; gameBoard[5] = 6; gameBoard[6] = 7; gameBoard[7] = 8;
    gameBoard[8] = 9; gameBoard[9] = 10; gameBoard[10] = 11; gameBoard[11] = 12;
    gameBoard[12] = 13; gameBoard[13] = 14; gameBoard[14] = 15; gameBoard[15] = 0;

    emptyIndex = 15;
    shuffleBoard();
    moveCount = 0;
    isPuzzleSolved = false;
    elapsedSeconds = 0;
    updateTimeDisplay();
    gameStarted = false;
    createNodes();
}

function setupTimer(): void {
    gameTimer = setInterval(() => {
        onTimerElapsed();
    }, 1000);
}
function clearTimer(): void {
    clearInterval(gameTimer);
}

function onTimerElapsed(): void {
    if (!isPaused && gameStarted && !isPuzzleSolved) {
        elapsedSeconds++;
        updateTimeDisplay();
        updateUI();
    }
}

function updateTimeDisplay(): void {
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    timeDisplay = padZero(minutes) + ':' + padZero(seconds);
}
function padZero(num: number) {
  return (num < 10 ? '0' : '') + num;
}

function getTileX(index: number): number {
    const col = index % gridSize;
    const startX = 600;
    return startX + (col * tileWidth);
}

function getTileY(index: number): number {
    const row = Math.floor(index / gridSize);
    const startY = 200;
    return startY + (row * tileHeight);
}

function canMoveTile(tileIndex: number): boolean {
    const tileRow = Math.floor(tileIndex / 4);
    const tileCol = tileIndex % 4;
    const emptyRow = Math.floor(emptyIndex / 4);
    const emptyCol = emptyIndex % 4;

    const isVerticallyAdjacent = (Math.abs(tileRow - emptyRow) === 1 && tileCol === emptyCol);
    const isHorizontallyAdjacent = (Math.abs(tileCol - emptyCol) === 1 && tileRow === emptyRow);

    return isVerticallyAdjacent || isHorizontallyAdjacent;
}

function addFinalPiece(): void {
    const finalPiece: NodeModel = {
        id: "tile16final",
        width: 130,
        height: 130,
        offsetX: getTileX(15),
        offsetY: getTileY(15),
        style: {
            fill: "transparent",
            strokeColor: "#FFD700",
            strokeWidth: 4
        },
        shape: {
            type: 'Image',
            source: getImageSourceForTile(16)
        },
        annotations: [{
            id: "annotation16",
            width: 25,
            height: 25,
            template: getAnnotationTemplate(16),
            offset: { x: 0.7, y: 0.1 },
            horizontalAlignment: 'Center',
            verticalAlignment: 'Center'
        }],
        constraints: NodeConstraints.None
    };

    diagram.add(finalPiece);
}

function checkPuzzleSolved(): void {
    let solved = true;
    for (let i = 0; i < 15; i++) {
        if (gameBoard[i] !== i + 1) {
            solved = false;
            break;
        }
    }
    if (solved && gameBoard[15] !== 0) {
        solved = false;
    }
    if (solved && emptyIndex === 15) {
        isPuzzleSolved = true;
        if (gameTimer) {
            clearInterval(gameTimer);
        }

        addFinalPiece();
        showCompletionMessage();
    }
}

function moveTileToEmptySpace(tileNumber: number): void {
    const tileIndex = gameBoard.indexOf(tileNumber);
    if (!canMoveTile(tileIndex)) return;

    if (!gameStarted) {
        gameStarted = true;
        elapsedSeconds = 0;
        updateTimeDisplay();
    }

    const oldEmptyIndex = emptyIndex;
    gameBoard[emptyIndex] = tileNumber;
    gameBoard[tileIndex] = 0;
    emptyIndex = tileIndex;
    moveCount++;

    const node = diagram.getObject(`tile${tileNumber}`) as NodeModel;
    if (node) {
        node.offsetX = getTileX(oldEmptyIndex);
        node.offsetY = getTileY(oldEmptyIndex);
        diagram.dataBind();
    }

    enableAdjacentNodes();
    checkPuzzleSolved();
    updateUI();
}

function newGame(): void {
    if (gameTimer) {
        clearInterval(gameTimer);
    }
    selectRandomImageCollection();
    moveCount = 0;
    elapsedSeconds = 0;
    gameStarted = false;
    isPaused = false;
    isPuzzleSolved = false;
    showClue = false;

    // Reset board
    gameBoard[0] = 1; gameBoard[1] = 2; gameBoard[2] = 3; gameBoard[3] = 4;
    gameBoard[4] = 5; gameBoard[5] = 6; gameBoard[6] = 7; gameBoard[7] = 8;
    gameBoard[8] = 9; gameBoard[9] = 10; gameBoard[10] = 11; gameBoard[11] = 12;
    gameBoard[12] = 13; gameBoard[13] = 14; gameBoard[14] = 15; gameBoard[15] = 0;
    emptyIndex = 15;

    updateTimeDisplay();
    shuffleBoard();
    clearDiagramNodes();
    createNodes();
    diagram.nodes = nodes;
    enableAdjacentNodes();
    setupTimer();
    updateUI();
}

function shuffleBoard(): void {
    for (let i = 0; i < 1000; i++) {
        const validMoves = getValidMoves();
        if (validMoves.length > 0) {
            const randomMove = validMoves[Math.floor(imageRandom() * validMoves.length)];
            gameBoard[emptyIndex] = gameBoard[randomMove];
            gameBoard[randomMove] = 0;
            emptyIndex = randomMove;
        }
    }
}

function getValidMoves(): number[] {
    const validMoves: number[] = [];
    const emptyRow = Math.floor(emptyIndex / 4);
    const emptyCol = emptyIndex % 4;
    const directions = [-4, 4, -1, 1];

    for (const dir of directions) {
        const newIndex = emptyIndex + dir;
        if (newIndex >= 0 && newIndex < 16) {
            const newRow = Math.floor(newIndex / 4);
            const newCol = newIndex % 4;
            if ((dir === -1 || dir === 1) && Math.abs(newRow - emptyRow) === 0 && Math.abs(newCol - emptyCol) === 1) {
                validMoves.push(newIndex);
            } else if ((dir === -4 || dir === 4) && Math.abs(newRow - emptyRow) === 1 && Math.abs(newCol - emptyCol) === 0) {
                validMoves.push(newIndex);
            }
        }
    }

    return validMoves;
}

function togglePause(): void {
    isPaused = !isPaused;

    if (isPaused) {
        if (gameTimer) {
            clearInterval(gameTimer);
        }
        disableAllNodes();
    } else {
        setupTimer();
        enableAdjacentNodes();
    }

    updateUI();
}

function disableAllNodes(): void {
    for (const node of diagram.nodes) {
        if (node.id?.startsWith("tile")) {
            node.constraints = NodeConstraints.None;
        }
    }
    diagram.dataBind();
}

function clearDiagramNodes(): void {
    if (diagram) {
        const existingNodes = [...diagram.nodes];
        for (const node of existingNodes) {
            diagram.remove(node);
        }
    }
    nodes = [];
}

function enableAdjacentNodes(): void {
    for (const node of diagram.nodes) {
        if (node.id?.startsWith("tile")) {
            const tileNumber = parseInt(node.id.substring(4));
            const tileIndex = gameBoard.indexOf(tileNumber);

            if (canMoveTile(tileIndex)) {
                node.constraints = NodeConstraints.PointerEvents;
            } else {
                node.constraints = NodeConstraints.None;
            }
        }
    }
    diagram.dataBind();
}

function toggleClue(): void {
    showClue = !showClue;
    for (const node of diagram.nodes) {
        if (node.annotations && node.annotations.length > 0) {
            node.annotations[0].visibility = showClue;
        }
    }
    diagram.dataBind();
    updateUI();
}

function selectRandomImageCollection(): void {
    if (imageCollections.length > 1) {
        let newIndex: number;
        do {
            newIndex = Math.floor(imageRandom() * imageCollections.length);
        } while (newIndex === currentThemeIndex);

        currentThemeIndex = newIndex;
        currentImageMap = imageCollections[currentThemeIndex];
    }
}

function getImageSourceForTile(tileNumber: number): string {
    return currentImageMap && currentImageMap[tileNumber]
        ? currentImageMap[tileNumber]
        : "";
}

function showCompletionMessage(): void {
    const winDialog = document.getElementById('winDialog');
    const finalMoves = document.getElementById('finalMoves');
    const finalTime = document.getElementById('finalTime');

    if (finalMoves) {
        finalMoves.textContent = moveCount.toString();
    }
    if (finalTime) {
        finalTime.textContent = timeDisplay;
    }
    if (winDialog) {
        winDialog.style.display = 'flex';
    }
}

function closeWinDialog(): void {
    const winDialog = document.getElementById('winDialog');
    if (winDialog) {
        winDialog.style.display = 'none';
    }
    newGame();
}

function updateUI(): void {
    // Update moves counter
    const moveNode = diagram.getObject('moves') as NodeModel;
    if (moveNode && moveNode.shape && (moveNode.shape as HtmlModel).content) {
        (moveNode.shape as HtmlModel).content = getMovesTemplate();
    }

    // Update timer
    const timeNode = diagram.getObject('time') as NodeModel;
    if (timeNode && timeNode.shape && (timeNode.shape as HtmlModel).content) {
        (timeNode.shape as HtmlModel).content = getTimeTemplate();
    }

    // Update pause button
    const pauseNode = diagram.getObject('pause') as NodeModel;
    if (pauseNode && pauseNode.shape && (pauseNode.shape as HtmlModel).content) {
        (pauseNode.shape as HtmlModel).content = getPauseTemplate();
    }

    // Update clue button
    const clueNode = diagram.getObject('clue') as NodeModel;
    if (clueNode && clueNode.shape && (clueNode.shape as HtmlModel).content) {
        (clueNode.shape as HtmlModel).content = getClueTemplate();
    }

    diagram.dataBind();
}


function click(args: any) {
    if (args.actualObject instanceof Node) {
        const node: NodeModel = args.actualObject;
        if (node.id === 'newgame') {
            newGame();
        }
        else if (node.id === 'pause') {
            togglePause();
        }
        else if (node.id === 'clue') {
            toggleClue();
        }
        else if (node.id?.startsWith("tile")) {
            if (isPaused || isPuzzleSolved) return;

            if (!gameStarted) {
                gameStarted = true;
                elapsedSeconds = 0;
                updateTimeDisplay();
            }

            const nodeId = node.id;
            if (nodeId?.startsWith("tile")) {
                const tileNumber = parseInt(nodeId.substring(4));
                moveTileToEmptySpace(tileNumber);
            }
        }
    }
}

export class ImagePuzzle extends SampleBase<{}, {}> {
    componentDidMount() {
        diagram.fitToPage();
        setTimeout(() => {
            document.getElementById('winClose')!.addEventListener('click', () => closeWinDialog());
        }, 1000);
    }

    componentWillUnmount() {
        clearTimer();
    }

    render() {
        return (
            <div className="control-pane diagram-puzzle-container" style={{ opacity: 0 }}>
            <style>{SAMPLE_CSS}</style>
            <div className="control-section">
                <div className="content-wrapper" style={{ width: '100%' }}>
                    <DiagramComponent
                        id="diagram"
                        ref={(diagramref: any) => (diagram = diagramref)}
                        height="800px"
                        nodes={nodes}
                        constraints={DiagramConstraints.Default & ~DiagramConstraints.UndoRedo}
                        snapSettings={{
                            constraints: SnapConstraints.None
                        }}
                        selectedItems={{
                            constraints: SelectorConstraints.None
                        }}
                        click={click}
                        created={onCreated}
                        load={onLoad}
                        className="puzzle-diagram"
                    />

                    {/* Win Dialog */}
                        <div id="winDialog" style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0,0,0,0.7)',
                            display: 'none',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1000
                        }}>
                            <div style={{
                                background: '#2c2c2c',
                                padding: '40px',
                                borderRadius: '20px',
                                textAlign: 'center',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                color: 'white',
                                fontFamily: 'Arial, sans-serif',
                                position: 'relative',
                                display: 'inline-block'
                            }}>
                                {/* Close Icon */}
                                <div id="winClose"
                                    style={{
                                        position: 'absolute',
                                        top: '15px',
                                        right: '20px',
                                        fontSize: '24px',
                                        cursor: 'pointer',
                                        color: '#ccc'
                                    }}
                                    title="Close"
                                    onClick={closeWinDialog}
                                >✕</div>
                                
                                {/* Celebration Icon */}
                                <div style={{ fontSize: '80px', marginBottom: '20px' }}>🎉</div>
                                
                                {/* Congratulations Text */}
                                <h1 style={{ color: 'white', marginBottom: '20px', fontSize: '36px', fontWeight: 'bold' }}>
                                    Congratulations!
                                </h1>
                                
                                {/* Steps Text */}
                                <p style={{ color: '#ccc', fontSize: '18px', marginBottom: '30px' }}>
                                    you did it in <span id="finalMoves">{moveCount}</span> steps in <span id="finalTime">{timeDisplay}</span>
                                </p>
                            </div>
                        </div>
                </div>
            </div>
                <div id="action-description">
                    <p>
                        This sample showcases an interactive sliding image puzzle game built using the Syncfusion<sup>®</sup> EJ2 React Diagram component, transforming images into a 4x4 grid of draggable tiles, with features like move and time tracking.
                    </p>
                </div>
                <div id="description">
                    <p>
                        This interactive 4x4 sliding image puzzle challenges users to reconstruct an image by moving tiles adjacent to an empty space. The game dynamically tracks moves and time, offering multiple image themes, pause/resume functionality, and a "Clue" option. A congratulatory message with statistics appears upon puzzle completion.
                    </p>
                </div>
            </div>
        );
    }
}

const SAMPLE_CSS = `
    .diagram-puzzle-container .timer {
        display: flex;
        align-items: center;
        background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
        color: white;
        padding: 10px 20px;
        border-radius: 14px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 0 15px rgba(173, 216, 230, 0.2);
        border: 1px solid rgba(33, 150, 243, 0.3);
        transition: all 0.2s ease-in-out;
        justify-content: center;
        gap: 10px;
    }

    .diagram-puzzle-container .moves-counter {
        display: flex;
        align-items: center;
        background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
        color: white;
        padding: 10px 20px;
        border-radius: 14px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 0 15px rgba(144, 238, 144, 0.2);
        border: 1px solid rgba(76, 175, 80, 0.3);
        transition: all 0.2s ease-in-out;
        justify-content: center;
        gap: 10px;
    }

    .diagram-puzzle-container .moves-counter .label,
    .diagram-puzzle-container .timer .label {
        font-weight: 700;
        text-transform: uppercase;
        font-size: 15px;
        color: white;
        padding: 0
    }

    .diagram-puzzle-container .moves-counter .count,
    .diagram-puzzle-container .timer .time-display {
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 0.5px;
        color: white;
    }

    .diagram-puzzle-container .pause-btn {
        background-color: #2196F3;
        color: white;
        border: none;
        border-radius: 12px;
        padding: 12px 24px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 150px;
        gap: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transition: background-color 0.3s ease;
    }

    .diagram-puzzle-container .pause-btn:hover {
        background-color: #1976D2;
    }

    .diagram-puzzle-container .pause-btn .icon {
        font-size: 16px;
    }

    .diagram-puzzle-container .new-game-btn {
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 12px;
        padding: 12px 24px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 150px;
        gap: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transition: background-color 0.3s ease;
        white-space: nowrap;
    }

    .diagram-puzzle-container .new-game-btn:hover {
        background-color: #45a049;
    }

    .diagram-puzzle-container .new-game-btn .icon {
        font-size: 16px;
    }

    .diagram-puzzle-container .number-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-top: 2px;
        margin-left: 2px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, #333333 0%, #000000 100%);
        border: 3px solid #666;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.2), inset 0 -2px 4px rgba(0, 0, 0, 0.8);
        font-family: 'Arial Black', Arial, sans-serif;
        font-size: 18px;
        font-weight: bold;
        color: white;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8), -1px -1px 1px rgba(255, 255, 255, 0.1);
        position: relative;
        overflow: hidden;
    }

    .diagram-puzzle-container .number-badge::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
        transform: rotate(45deg);
        pointer-events: none;
    }

    .diagram-puzzle-container .game-button {
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        text-transform: uppercase;
        letter-spacing: 1px;
        min-width: 140px;
        position: relative;
        overflow: hidden;
    }

    .diagram-puzzle-container .game-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
    }

    .diagram-puzzle-container .game-button:hover::before {
        left: 100%;
    }

    .diagram-puzzle-container .new-game-btn {
        background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
        color: white;
        border: 2px solid #45a049;
    }

    .diagram-puzzle-container .new-game-btn:hover {
        background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(76, 175, 80, 0.4);
    }

    .diagram-puzzle-container .new-game-btn:active {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(76, 175, 80, 0.4);
    }

    .diagram-puzzle-container .pause-btn {
        background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
        color: white;
        border: 2px solid #1976D2;
    }

    .diagram-puzzle-container .pause-btn:hover {
        background: linear-gradient(135deg, #1976D2 0%, #1565C0 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(33, 150, 243, 0.4);
    }

    .diagram-puzzle-container .pause-btn:active {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(33, 150, 243, 0.4);
    }

    .diagram-puzzle-container .game-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none !important;
    }

    .diagram-puzzle-container .game-button:disabled:hover {
        transform: none;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .diagram-puzzle-container .puzzle-tile {
        position: relative;
        width: 90px;
        height: 90px;
        background: linear-gradient(135deg, #d4a574 0%, #c49660 50%, #b8864d 100%);
        border: 3px solid #8b6914;
        border-radius: 8px;
        box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.3), inset -2px -2px 4px rgba(0, 0, 0, 0.2), 2px 2px 8px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        transition: all 0.2s ease;
        overflow: hidden;
    }

    .diagram-puzzle-container .puzzle-tile:hover {
        transform: translateY(-2px);
        box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.4), inset -2px -2px 4px rgba(0, 0, 0, 0.3), 2px 4px 12px rgba(0, 0, 0, 0.4);
    }

    .diagram-puzzle-container .puzzle-tile.selected {
        border-color: #ffd700;
        box-shadow: 0 0 0 3px #ffd700, inset 2px 2px 4px rgba(255, 255, 255, 0.4), inset -2px -2px 4px rgba(0, 0, 0, 0.3), 2px 4px 12px rgba(255, 215, 0, 0.5);
    }

    .diagram-puzzle-container .tile-content {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: repeating-linear-gradient( 90deg, transparent, transparent 1px, rgba(139, 105, 20, 0.1) 1px, rgba(139, 105, 20, 0.1) 2px ), repeating-linear-gradient( 0deg, transparent, transparent 1px, rgba(139, 105, 20, 0.1) 1px, rgba(139, 105, 20, 0.1) 2px );
    }

    .diagram-puzzle-container .tile-number {
        font-family: 'Arial Black', Arial, sans-serif;
        font-size: 32px;
        font-weight: bold;
        color: #4a3728;
        text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.3), -1px -1px 0px rgba(0, 0, 0, 0.3);
        user-select: none;
    }

    .diagram-puzzle-container .tile-highlight {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%);
        pointer-events: none;
        border-radius: 5px;
    }

    .diagram-puzzle-container .puzzle-tile::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: radial-gradient(circle at 20% 50%, rgba(139, 105, 20, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 105, 20, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(139, 105, 20, 0.1) 0%, transparent 50%);
        pointer-events: none;
        border-radius: 5px;
    }

    .diagram-puzzle-container .puzzle-tile.disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none !important;
    }

    .diagram-puzzle-container .puzzle-tile.disabled:hover {
        transform: none;
        box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.3), inset -2px -2px 4px rgba(0, 0, 0, 0.2), 2px 2px 8px rgba(0, 0, 0, 0.3);
    }

    .diagram-puzzle-container .diagram-panel {
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #20B2AA 0%, #7B68EE 100%);
        border-radius: 20px;
        margin-right: 20px;
        box-shadow: 0 15px 35px rgba(32, 178, 170, 0.4);
        position: relative;
        overflow: hidden;
    }

    .diagram-puzzle-container .diagram-panel::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
        background-size: 30px 30px;
        pointer-events: none;
    }

    .diagram-puzzle-container .clue-btn {
        background: linear-gradient(135deg, #FF9800 0%, #F57C00 100%);
        color: white;
        border: 2px solid #F57C00;
        border-radius: 12px;
        padding: 12px 24px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 150px;
        gap: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        white-space: nowrap;
    }

    .diagram-puzzle-container .clue-btn:hover {
        background: linear-gradient(135deg, #F57C00 0%, #E65100 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(255, 152, 0, 0.4);
    }

    .diagram-puzzle-container .clue-btn:active {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(255, 152, 0, 0.4);
    }

    .diagram-puzzle-container .clue-btn .icon {
        font-size: 16px;
    }

    .diagram-puzzle-container .puzzle-diagram .e-diagram-selector {
        stroke-width: 0;
    }
`
