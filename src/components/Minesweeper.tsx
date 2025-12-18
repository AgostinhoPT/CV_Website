import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Flag, Bomb, Trophy, Timer, Settings, X } from 'lucide-react';

type Cell = {
  x: number;
  y: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  count: number;
};

// Helper to get neighbors of a cell
const getNeighbors = (x: number, y: number, rows: number, cols: number) => {
  const neighbors = [];
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
        neighbors.push({ x: nx, y: ny });
      }
    }
  }
  return neighbors;
};

const createBoard = (rows: number, cols: number, mines: number): Cell[][] => {
  // Initialize empty board
  let board: Cell[][] = Array(rows).fill(null).map((_, y) =>
    Array(cols).fill(null).map((_, x) => ({
      x,
      y,
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      count: 0,
    }))
  );

  // Place Mines
  let minesPlaced = 0;
  const maxMines = rows * cols - 1; 
  const actualMines = Math.min(mines, maxMines); // Safety check

  while (minesPlaced < actualMines) {
    const x = Math.floor(Math.random() * cols);
    const y = Math.floor(Math.random() * rows);
    if (!board[y][x].isMine) {
      board[y][x].isMine = true;
      minesPlaced++;
    }
  }

  // Calculate Counts
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (!board[y][x].isMine) {
        let count = 0;
        getNeighbors(x, y, rows, cols).forEach(n => {
          if (board[n.y][n.x].isMine) count++;
        });
        board[y][x].count = count;
      }
    }
  }

  return board;
};

const Minesweeper = () => {
  // Config State
  const [config, setConfig] = useState({ rows: 10, cols: 10, mines: 15 });
  const [draftConfig, setDraftConfig] = useState(config);
  const [showSettings, setShowSettings] = useState(false);

  // Game State
  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [flagsUsed, setFlagsUsed] = useState(0);

  // Initialize board on load
  useEffect(() => {
    setBoard(createBoard(config.rows, config.cols, config.mines));
  }, []);

  const [bestTime, setBestTime] = useState(() => {
    const saved = localStorage.getItem('minesweeper-best-time');
    return saved ? parseInt(saved) : null;
  });

  useEffect(() => {
    let interval: any;
    if (isRunning && !gameOver && !gameWon) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, gameOver, gameWon]);

  useEffect(() => {
    if (gameOver) {
        setIsRunning(false);
        return;
    } 
    if (board.length === 0) return;

    let revealedCount = 0;
    board.forEach(row => row.forEach(cell => {
      if (cell.isRevealed) revealedCount++;
    }));

    const totalCells = config.rows * config.cols;
    if (revealedCount === totalCells - config.mines) {
      setGameWon(true);
      setIsRunning(false);
      
      if (bestTime === null || timer < bestTime) {
        setBestTime(timer);
        localStorage.setItem('minesweeper-best-time', timer.toString());
      }
    }
  }, [board, gameOver, timer, bestTime, config]);

  const revealCell = (x: number, y: number) => {
    if (gameOver || gameWon || board[y][x].isFlagged || board[y][x].isRevealed) return;

    if (!isRunning) setIsRunning(true);

    const newBoard = [...board];
    const cell = newBoard[y][x];

    if (cell.isMine) {
      cell.isRevealed = true;
      setGameOver(true);
      setBoard(newBoard);
      return;
    }

    const floodFill = (cx: number, cy: number) => {
      if (cx < 0 || cx >= config.cols || cy < 0 || cy >= config.rows) return;
      if (newBoard[cy][cx].isRevealed || newBoard[cy][cx].isFlagged) return;

      newBoard[cy][cx].isRevealed = true;

      if (newBoard[cy][cx].count === 0) {
        getNeighbors(cx, cy, config.rows, config.cols).forEach(n => floodFill(n.x, n.y));
      }
    };

    floodFill(x, y);
    setBoard(newBoard);
  };

  const toggleFlag = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault();
    if (gameOver || gameWon || board[y][x].isRevealed) return;

    if (!isRunning) setIsRunning(true);

    const newBoard = [...board];
    newBoard[y][x].isFlagged = !newBoard[y][x].isFlagged;
    setBoard(newBoard);
    setFlagsUsed(prev => newBoard[y][x].isFlagged ? prev + 1 : prev - 1);
  };

  const restart = (newConfig = config) => {
    setBoard(createBoard(newConfig.rows, newConfig.cols, newConfig.mines));
    setGameOver(false);
    setGameWon(false);
    setTimer(0);
    setIsRunning(false);
    setFlagsUsed(0);
  };

  const applySettings = () => {
    // Basic validation constraints
    const r = Math.max(10, Math.min(20, draftConfig.rows)); // Limit rows 10-20
    const c = Math.max(10, Math.min(15, draftConfig.cols)); // Limit cols 10-15 (to fit mobile)
    
    const maxMines = (r * c) - 1;
    const m = Math.max(1, Math.min(maxMines, draftConfig.mines));

    const validatedConfig = { rows: r, cols: c, mines: m };
    
    setConfig(validatedConfig);
    setDraftConfig(validatedConfig);
    restart(validatedConfig);
    setShowSettings(false);
  };

  const getNumberColor = (count: number) => {
    switch (count) {
      case 1: return 'text-blue-400';
      case 2: return 'text-green-400';
      case 3: return 'text-red-400';
      case 4: return 'text-purple-400';
      default: return 'text-yellow-400';
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-4xl font-black tracking-widest mb-2 drop-shadow-md cursor-default select-none text-red-500">
        MINES
      </h2>

      {/* Stats Bar */}
      <div className="flex justify-between w-full max-w-[340px] text-sm font-mono font-bold text-primary mb-2 px-2">
        <div className="flex flex-col">
           <span className="flex items-center gap-1 text-xs text-muted-foreground">
             <Bomb className="w-3 h-3" /> MINES
          </span>
          <span className="text-xl">{config.mines - flagsUsed}</span>
        </div>

        <div className="flex flex-col items-center">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
             <Timer className="w-3 h-3" /> TIME
          </span>
          <span className="text-xl">{timer}s</span>
        </div>

        <div className="flex flex-col items-end">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
             <Trophy className="w-3 h-3 text-yellow-500" /> BEST
          </span>
          <span className="text-xl text-yellow-500">{bestTime === null ? '--' : `${bestTime}s`}</span>
        </div>
      </div>

      {/* Game Board Container */}
      <div className="bg-secondary/50 p-1 rounded-lg border-2 border-primary/20 relative">
        
        {/* Game Over / Win Overlay */}
        {(gameOver || gameWon) && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 rounded-lg backdrop-blur-sm">
             <div className={`font-black text-3xl animate-bounce border-4 px-6 py-4 rounded-xl bg-background shadow-2xl drop-shadow-lg transform rotate-[-5deg] ${gameWon ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'}`}>
               {gameWon ? 'YOU WON!' : 'GAME OVER'}
             </div>
          </div>
        )}

        {/* Settings Overlay */}
        {showSettings && (
           <div className="absolute inset-0 z-30 flex items-center justify-center bg-background/95 rounded-lg backdrop-blur-sm p-4">
             <div className="flex flex-col gap-4 w-full max-w-xs">
                <div className="flex justify-between items-center border-b border-border pb-2">
                    <h3 className="font-bold text-lg">Game Settings</h3>
                    <button onClick={() => setShowSettings(false)}><X className="w-5 h-5" /></button>
                </div>
                
                <div className="space-y-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-muted-foreground">Rows (10-20)</label>
                        <input 
                            type="number" 
                            className="bg-card border border-border rounded p-2 text-sm"
                            value={draftConfig.rows}
                            onChange={(e) => setDraftConfig({...draftConfig, rows: parseInt(e.target.value) || 0})} 
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-muted-foreground">Columns (10-15)</label>
                        <input 
                            type="number" 
                            className="bg-card border border-border rounded p-2 text-sm"
                            value={draftConfig.cols}
                            onChange={(e) => setDraftConfig({...draftConfig, cols: parseInt(e.target.value) || 0})} 
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-muted-foreground">Mines</label>
                        <input 
                            type="number" 
                            className="bg-card border border-border rounded p-2 text-sm"
                            value={draftConfig.mines}
                            onChange={(e) => setDraftConfig({...draftConfig, mines: parseInt(e.target.value) || 0})} 
                        />
                    </div>
                </div>

                <button 
                    onClick={applySettings}
                    className="bg-primary text-primary-foreground p-2 rounded font-bold hover:opacity-90 transition-opacity"
                >
                    Apply & Restart
                </button>
             </div>
           </div>
        )}

        <div 
          className="grid gap-px bg-primary/20 border border-white/5"
          style={{ 
            gridTemplateColumns: `repeat(${config.cols}, minmax(0, 1fr))`,
            maxWidth: '90vw'
          }}
        >
          {board.map((row, y) => row.map((cell, x) => (
             <button
               key={`${x}-${y}`}
               onClick={() => revealCell(x, y)}
               onContextMenu={(e) => toggleFlag(e, x, y)}
               className={`
                 w-8 h-8 flex items-center justify-center font-bold text-sm transition-colors duration-75
                 ${cell.isRevealed 
                    ? 'bg-background/40 cursor-default' 
                    : 'bg-secondary hover:bg-secondary/80 border-b-2 border-r-2 border-black/20'
                 }
                 ${cell.isRevealed && cell.isMine ? 'bg-red-500/50' : ''}
               `}
             >
               {cell.isRevealed ? (
                 cell.isMine ? <Bomb className="w-5 h-5 text-red-500 animate-pulse" /> : 
                 cell.count > 0 ? <span className={getNumberColor(cell.count)}>{cell.count}</span> : ''
               ) : (
                 cell.isFlagged ? <Flag className="w-4 h-4 text-red-500" fill="currentColor" /> : ''
               )}
             </button>
          )))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mt-2">
         <button 
           title="Restart Game" 
           onClick={() => restart()} 
           className="p-3 bg-card border rounded-full hover:bg-primary/20 transition-colors"
         >
           <RefreshCw className="w-6 h-6" />
         </button>

         <button 
           title="Settings" 
           onClick={() => {
               setDraftConfig(config); // Reset draft to current config
               setShowSettings(true);
           }} 
           className="p-3 bg-card border rounded-full hover:bg-primary/20 transition-colors"
         >
           <Settings className="w-6 h-6" />
         </button>
      </div>
      
      <div className="text-center text-xs text-muted-foreground mt-2">
          Left Click: Reveal • Right Click: Flag
      </div>
    </div>
  );
};

export default Minesweeper;