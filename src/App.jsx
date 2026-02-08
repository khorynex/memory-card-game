import {GameHeader} from "./components/GameHeader"
import {Card} from "./components/Card"
import {WinMessage} from "./components/WinMessage"
import {useGameLogic} from "./hooks/useGameLogic"

const cardValues = [
  "🍉",
  "🍋‍🟩",
  "🍈",
  "🍍",
  "🍌",
  "🍋",
  "🍊",
  "🍎",
  "🍉",
  "🍋‍🟩",
  "🍈",
  "🍍",
  "🍌",
  "🍋",
  "🍊",
  "🍎"
]

const App = () => {
  const { score, moves, initializeGame, isGameComplete, cards, handleCardClick } = useGameLogic( cardValues )

  return (
    <div className="app">
      <GameHeader score={score} moves={moves} onReset={initializeGame}/>

      {isGameComplete && <WinMessage moves={moves} />}

      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} clicked={ handleCardClick }/>
        ))}
      </div>
    </div>
  )
}

export default App