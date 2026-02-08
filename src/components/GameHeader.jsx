export const GameHeader = ({ score, moves, onReset }) => {
    return (
        <div className="game-header">
            <h1>🎮 Memory Card Game</h1>
            <div className="stats">
                <div className="stat-item">
                    <span>Score:</span>{" "}
                    <span>{score}</span>
                </div>
                <div className="stat-item">
                    <span>Moves:</span>{" "}
                    <span>{moves}</span>
                </div>
            </div>
            <button onClick={onReset}>New Game</button>
        </div>
    )
}