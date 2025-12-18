import { useState } from 'react';
import { Gamepad2, Ghost } from "lucide-react";
import Tetris from './Tetris';
import Snake from './Snake';

const gamesList = [
    { id: 'tetris', name: 'Tetris', icon: Gamepad2, component: <Tetris /> },
    { id: 'snake', name: 'Snake', icon: Ghost, component: <Snake /> },
    { id: 'coming_soon', name: 'More Games Coming Soon', icon: Ghost, component: <div className="h-96 flex items-center justify-center text-muted-foreground">Coming Soon...</div> },
];

const Games = () => {
    const [activeGame, setActiveGame] = useState<typeof gamesList[0] | null>(null);

    return (
        <section id="arcade" className="py-24 px-4 bg-background">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Arcade</h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                    <p className="mt-4 text-muted-foreground">Take a break and play a game as a reward for taking the time to visit my website 🫡.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 min-h-[600px]">
                    {/* Game Selector Sidebar */}
                    <div className="w-full md:w-64 flex flex-col gap-3">
                        <h3 className="text-lg font-semibold mb-2 px-2">Select Game</h3>
                        {gamesList.map((game) => (
                            <button
                                key={game.id}
                                onClick={() => setActiveGame(game)}
                                className={`flex items-center gap-3 p-4 rounded-xl transition-all text-left border ${activeGame?.id === game.id
                                        ? 'bg-primary/10 border-primary text-primary'
                                        : 'bg-card border-border hover:border-primary/50 text-muted-foreground'
                                    }`}
                            >
                                <game.icon className="w-5 h-5" />
                                <span className="font-medium">{game.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Game Screen Area */}
                    <div className="flex-1 bg-card border border-border rounded-3xl p-8 shadow-xl flex flex-col items-center justify-center min-h-[500px]">
                        {activeGame ? (
                            activeGame.component
                        ) : (
                            <div className="flex flex-col items-center text-muted-foreground">
                                <Gamepad2 className="w-16 h-16 mb-4 opacity-50" />
                                <h3 className="text-2xl font-bold">Pick a game</h3>
                                <p>Select an option from the menu to start playing</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Games;