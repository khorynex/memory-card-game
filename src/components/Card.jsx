export const Card = ({card, clicked}) => {
    return (
        <div 
        className={`card ${card.isFlipped ? "flipped" : ""} ${card.isMatched ? "matched" : ""}`} 
        onClick={() => clicked(card)}>
            <div className="card-front">?</div>
            <div className="card-back">{card.value}</div>
        </div>
    )
}