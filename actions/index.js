export const INIT_DECKS = 'INIT_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export function initDecks (decks) {
  return {
    type: INIT_DECKS,
    decks,
  }
}

export function addDeck (title) {
  return {
    type: ADD_DECK,
    title,
  }
}

export function addCardDispatch (title, card) {
  return {
    type: ADD_CARD,
    title,
    card,
  }
}
