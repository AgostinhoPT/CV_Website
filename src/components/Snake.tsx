import { useState, useEffect, useRef, useCallback } from 'react';
import { RefreshCw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Trophy, Trash2 } from 'lucide-react';

const GRID_SIZE = 20;
const TICK_RATE = 150;

const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 },
};

const INITIAL_SNAKE = [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
];

const getRandomFood = (snake: { x: number; y: number }[]) => {
    let newFood;
    while (true) {
        newFood = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
        };
        const onSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
        if (!onSnake) break;
    }
    return newFood;
};

const Snake = () => {
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState({ x: 5, y: 5 });
    const [direction, setDirection] = useState(DIRECTIONS.UP);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const savedMove = useRef<(() => void) | null>(null);
    const lastProcessedDirection = useRef(DIRECTIONS.UP);

    const [highScore, setHighScore] = useState(() => {
        const saved = localStorage.getItem('snake-high-score');
        return saved ? parseInt(saved) : 0;
    });

    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('snake-high-score', score.toString());
        }
    }, [score, highScore]);

    const resetHighScore = () => {
        localStorage.removeItem('snake-high-score');
        setHighScore(0);
    };

    const move = useCallback(() => {
        if (gameOver) return;

        setSnake((prevSnake) => {
            const head = prevSnake[0];

            const newHead = {
                x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
                y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
            };

            if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
                setGameOver(true);
                return prevSnake;
            }

            const newSnake = [newHead, ...prevSnake];

            if (newHead.x === food.x && newHead.y === food.y) {
                setScore((s) => s + 10);
                setFood(getRandomFood(newSnake));
            } else {
                newSnake.pop();
            }

            lastProcessedDirection.current = direction;
            return newSnake;
        });
    }, [direction, food, gameOver]);

    useEffect(() => {
        savedMove.current = move;
    }, [move]);

    useEffect(() => {
        const tick = () => {
            if (savedMove.current) savedMove.current();
        };
        const interval = setInterval(tick, TICK_RATE);
        return () => clearInterval(interval);
    }, []);

    const restart = () => {
        setSnake(INITIAL_SNAKE);
        setDirection(DIRECTIONS.UP);
        lastProcessedDirection.current = DIRECTIONS.UP;
        setFood(getRandomFood(INITIAL_SNAKE));
        setGameOver(false);
        setScore(0);
    };

    const changeDirection = (newDir: typeof DIRECTIONS.UP) => {
        const current = lastProcessedDirection.current;
        if (newDir.x + current.x === 0 && newDir.y + current.y === 0) return;
        setDirection(newDir);
    };

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'R'].includes(e.key)) e.preventDefault();

            if (e.key === 'ArrowUp') changeDirection(DIRECTIONS.UP);
            if (e.key === 'ArrowDown') changeDirection(DIRECTIONS.DOWN);
            if (e.key === 'ArrowLeft') changeDirection(DIRECTIONS.LEFT);
            if (e.key === 'ArrowRight') changeDirection(DIRECTIONS.RIGHT);
            if (e.key.toLowerCase() === 'r') restart();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    const getSegmentStyle = (index: number, current: { x: number, y: number }) => {
        if (index !== 0 && index !== snake.length - 1) return 'rounded-none';

        const neighbor = index === 0 ? snake[1] : snake[index - 1];

        if (!neighbor) return 'rounded-md';

        let dx = neighbor.x - current.x;
        let dy = neighbor.y - current.y;

        if (dx > 1) dx = -1;
        else if (dx < -1) dx = 1;
        if (dy > 1) dy = -1;
        else if (dy < -1) dy = 1;

        if (dx === 1) return 'rounded-l-md';
        if (dx === -1) return 'rounded-r-md';
        if (dy === 1) return 'rounded-t-md';
        if (dy === -1) return 'rounded-b-md';

        return 'rounded-none';
    };

    const getCellClass = (x: number, y: number) => {
        if (food.x === x && food.y === y) return 'bg-red-500 rounded-full scale-75 shadow-lg shadow-red-500/50';

        const index = snake.findIndex(s => s.x === x && s.y === y);

        if (index === -1) return 'bg-background/80';

        const roundedClass = getSegmentStyle(index, { x, y });

        if (index === 0) {
            return `bg-green-400 ${roundedClass} z-10`;
        }

        return `bg-green-600 ${roundedClass} opacity-90`;
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <h2 className="text-4xl font-black tracking-widest mb-2 drop-shadow-md cursor-default select-none text-green-500">
                SNAKE
            </h2>

            <div className="flex justify-between w-[340px] text-sm font-mono font-bold text-primary mb-2">
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

            <div className="bg-secondary/50 p-1 rounded-lg border-2 border-primary/20 relative">

                {gameOver && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 rounded-lg backdrop-blur-sm">
                        <div className="text-red-500 font-black text-3xl animate-bounce border-4 border-red-500 px-6 py-4 rounded-xl bg-background shadow-2xl drop-shadow-lg transform rotate-[-5deg]">
                            GAME OVER
                        </div>
                    </div>
                )}

                <div
                    className="grid"
                    style={{
                        gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                        width: '320px',
                        height: '320px'
                    }}
                >
                    {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                        const x = i % GRID_SIZE;
                        const y = Math.floor(i / GRID_SIZE);
                        return (
                            <div
                                key={`${x}-${y}`}
                                className={`w-full h-full border border-white/5 ${getCellClass(x, y)}`}
                            />
                        );
                    })}
                </div>
            </div>

            <div className="flex flex-col items-center justify-center text-center text-sm text-muted-foreground">
                R - Restart game <br />
                Arrows - Move
            </div>

            <div className="flex gap-4 mt-2">
                <div className="grid grid-cols-3 gap-1">
                    <div />
                    <button title="Move Up" onClick={() => changeDirection(DIRECTIONS.UP)} className="p-3 bg-card border rounded-lg hover:bg-primary/20 transition-colors"><ArrowUp /></button>
                    <div />

                    <button title="Move Left" onClick={() => changeDirection(DIRECTIONS.LEFT)} className="p-3 bg-card border rounded-lg hover:bg-primary/20 transition-colors"><ArrowLeft /></button>
                    <button title="Move Down" onClick={() => changeDirection(DIRECTIONS.DOWN)} className="p-3 bg-card border rounded-lg hover:bg-primary/20 transition-colors"><ArrowDown /></button>
                    <button title="Move Right" onClick={() => changeDirection(DIRECTIONS.RIGHT)} className="p-3 bg-card border rounded-lg hover:bg-primary/20 transition-colors"><ArrowRight /></button>
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    title="Restart Game"
                    onClick={restart}
                    className="p-3 bg-card border rounded-full hover:bg-primary/20 transition-colors"
                >
                    <RefreshCw className="w-6 h-6" />
                </button>

                <button
                    title="Reset High Score"
                    onClick={resetHighScore}
                    className="p-3 bg-card border rounded-full hover:bg-red-500/10 text-red-500 border-red-500/20 transition-colors"
                >
                    <Trash2 className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default Snake;