import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, ArrowDown, ArrowLeft, ArrowRight, RotateCw, Trophy } from 'lucide-react';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const TICK_RATE = 800;

const TETROMINOS = {
    I: { shape: [[1, 1, 1, 1]], color: 'bg-cyan-500' },
    J: { shape: [[1, 0, 0], [1, 1, 1]], color: 'bg-blue-500' },
    L: { shape: [[0, 0, 1], [1, 1, 1]], color: 'bg-orange-500' },
    O: { shape: [[1, 1], [1, 1]], color: 'bg-yellow-500' },
    S: { shape: [[0, 1, 1], [1, 1, 0]], color: 'bg-green-500' },
    T: { shape: [[0, 1, 0], [1, 1, 1]], color: 'bg-purple-500' },
    Z: { shape: [[1, 1, 0], [0, 1, 1]], color: 'bg-red-500' },
};

const createBoard = () => Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0));

const getRandomTetromino = () => {
    const keys = Object.keys(TETROMINOS);
    const key = keys[Math.floor(Math.random() * keys.length)];
    return { ...TETROMINOS[key as keyof typeof TETROMINOS], pos: { x: 3, y: 0 } };
};

const Tetris = () => {
    const [board, setBoard] = useState(createBoard());
    const [activePiece, setActivePiece] = useState(getRandomTetromino());
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const [highScore, setHighScore] = useState(() => {
        const saved = localStorage.getItem('tetris-high-score');
        return saved ? parseInt(saved) : 0;
    });

    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('tetris-high-score', score.toString());
        }
    }, [score, highScore]);

    const checkCollision = (piece: any, moveX: number, moveY: number, newShape?: any) => {
        const shape = newShape || piece.shape;
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    const newY = piece.pos.y + y + moveY;
                    const newX = piece.pos.x + x + moveX;
                    if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT || (newY >= 0 && board[newY][newX])) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    const mergePiece = () => {
        const newBoard = [...board];
        activePiece.shape.forEach((row: number[], y: number) => {
            row.forEach((value, x) => {
                if (value) newBoard[activePiece.pos.y + y][activePiece.pos.x + x] = activePiece.color;
            });
        });

        const clearedBoard = newBoard.filter(row => row.some(cell => cell === 0));
        const linesCleared = BOARD_HEIGHT - clearedBoard.length;
        const cleanRows = Array.from({ length: linesCleared }, () => Array(BOARD_WIDTH).fill(0));

        if (linesCleared > 0) {
            setScore(prev => prev + (linesCleared * 100));
        }

        setBoard([...cleanRows, ...clearedBoard]);

        const newPiece = getRandomTetromino();
        if (checkCollision(newPiece, 0, 0)) {
            setGameOver(true);
        }
        setActivePiece(newPiece);
    };

    const move = useCallback((x: number, y: number) => {
        if (gameOver) return;
        if (!checkCollision(activePiece, x, y)) {
            setActivePiece(prev => ({ ...prev, pos: { x: prev.pos.x + x, y: prev.pos.y + y } }));
        } else if (y > 0) {
            mergePiece();
        }
    }, [activePiece, board, gameOver]);

    const rotate = () => {
        if (gameOver) return;
        const rotated = activePiece.shape[0].map((_: any, i: number) => activePiece.shape.map((row: any) => row[i]).reverse());
        if (!checkCollision(activePiece, 0, 0, rotated)) {
            setActivePiece(prev => ({ ...prev, shape: rotated }));
        }
    };

    const restart = () => {
        setBoard(createBoard());
        setActivePiece(getRandomTetromino());
        setGameOver(false);
        setScore(0);
    }

    useEffect(() => {
        const interval = setInterval(() => move(0, 1), TICK_RATE);
        return () => clearInterval(interval);
    }, [move]);



    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'R'].includes(e.key)) e.preventDefault();
            if (e.key === 'ArrowLeft') move(-1, 0);
            if (e.key === 'ArrowRight') move(1, 0);
            if (e.key === 'ArrowDown') move(0, 1);
            if (e.key === 'ArrowUp') rotate();
            if (e.key.toLowerCase() === 'r') restart();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [move, rotate]);

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Colorful Title */}
            <h2 className="text-4xl font-black tracking-widest mb-2 drop-shadow-md cursor-default select-none">
                <span className="text-red-500">T</span>
                <span className="text-orange-500">E</span>
                <span className="text-yellow-500">T</span>
                <span className="text-green-500">R</span>
                <span className="text-cyan-500">I</span>
                <span className="text-purple-500">S</span>
            </h2>

            {/* Score Board */}
            <div className="flex justify-between w-64 text-sm font-mono font-bold text-primary mb-2">
                <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">SCORE</span>
                    <span className="text-xl">{score}</span>
                </div>

                <div className="flex flex-col items-end">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Trophy className="w-3 h-3 text-yellow-500" /> BEST
                    </span>
                    <span className="text-xl text-yellow-500">{highScore}</span>
                </div>
            </div>

            {/* Game Board with Overlay */}
            <div className="bg-secondary/50 p-1 rounded-lg border-2 border-primary/20 relative">

                {/* GAME OVER OVERLAY (Moved Here) */}
                {gameOver && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 rounded-lg backdrop-blur-sm">
                        <div className="text-red-500 font-black text-3xl animate-bounce border-4 border-red-500 px-6 py-4 rounded-xl bg-background shadow-2xl drop-shadow-lg transform rotate-[-5deg]">
                            GAME OVER
                        </div>
                    </div>
                )}

                {board.map((row, y) => (
                    <div key={y} className="flex">
                        {row.map((cell, x) => {
                            let color = 'bg-background/80';
                            if (cell !== 0) color = cell;
                            else if (
                                !gameOver &&
                                y >= activePiece.pos.y && y < activePiece.pos.y + activePiece.shape.length &&
                                x >= activePiece.pos.x && x < activePiece.pos.x + activePiece.shape[0].length &&
                                activePiece.shape[y - activePiece.pos.y]?.[x - activePiece.pos.x]
                            ) {
                                color = activePiece.color;
                            }
                            return <div key={`${y}-${x}`} className={`w-6 h-6 border border-white/5 ${color}`} />;
                        })}
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center justify-center text-center">
                R - Restart game <br />
                Arrows - Move / Rotate
            </div>

            <div className="flex gap-4 mt-2">
                <button
                    title="Restart Game"
                    onClick={restart}
                    className="p-3 bg-card border rounded-full hover:bg-primary/20 transition-colors"
                >
                    <RefreshCw className="w-6 h-6" />
                </button>

                <div className="grid grid-cols-3 gap-1">
                    <button title="Move Left" onClick={() => move(-1, 0)} className="p-3 bg-card border rounded-lg hover:bg-primary/20 transition-colors"><ArrowLeft /></button>
                    <button title="Move Down" onClick={() => move(0, 1)} className="p-3 bg-card border rounded-lg hover:bg-primary/20 transition-colors"><ArrowDown /></button>
                    <button title="Move Right" onClick={() => move(1, 0)} className="p-3 bg-card border rounded-lg hover:bg-primary/20 transition-colors"><ArrowRight /></button>
                </div>
                <button title="Rotate" onClick={rotate} className="p-3 bg-card border rounded-full hover:bg-primary/20 transition-colors"><RotateCw className="w-6 h-6" /></button>
            </div>
        </div>
    );
};

export default Tetris;