import {useState, useEffect} from "react"

export const useGameLogic = (cardValues) => {
    const [cards, setCards] = useState( [] )
    const [flippedCards, setFlippedCards] = useState( [] )
    const [matchedCards, setMatchedCards] = useState( [] )
    const [score, setScore] = useState( 0 )
    const [moves, setMoves] = useState( 0 )
    const [block, setBlock] = useState( false )

    function shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }


    const initializeGame = () => {
        const shuffled = shuffle(cardValues)
        const finalCards = shuffled.map( (value, index) => ({
            id: index,
            value,
            isFlipped: false,
            isMatched: false
        })
        )

        setCards( finalCards )
        setScore( 0 )
        setMoves( 0 )
        setFlippedCards( [] )
        setMatchedCards( [] )
    }

    useEffect( () => {
        initializeGame()
    }, [])

    const handleCardClick = (card) => {
        if( card.isFlipped || card.isMatched || block || flippedCards.length === 2 )
        return

        const newCards = cards.map( (c) => {
        if( c.id === card.id )
            return { ...c, isFlipped: true }
        else
            return c
        })

        setCards( newCards )
        const newFlippedCards = [ ...flippedCards, card.id ]
        setFlippedCards( newFlippedCards )

        if( flippedCards.length === 1 ) {
        setBlock( true )
        const firstCard = cards[flippedCards[0]]

        if( firstCard.value === card.value ){
            setTimeout( () => {
            setMatchedCards( (prev) => [ ...prev, firstCard.id, card.id] )

            setCards( (prev) =>
                prev.map( (c) => {
                if( c.id === card.id || c.id === firstCard.id )
                    return {...c, isMatched: true }
                else
                    return c
                })
            )
            setFlippedCards( [] )
            setBlock( false )
            },500)
            setScore( (i) => i + 1 )
        }
        else {
            setTimeout( () => {
            const flippedBackCards = newCards.map( (c) => {
                if (newFlippedCards.includes(c.id) || c.id === card.id)
                return { ...c, isFlipped: false }
                else
                return c
            })

            setCards( flippedBackCards )
            setFlippedCards( [] )
            setBlock( false )
            }, 500)
        }
        setMoves( (prev) => prev + 1 )
        }
    }

    const isGameComplete = matchedCards.length === cardValues.length
    return {score, moves, initializeGame, isGameComplete, cards, handleCardClick }
}