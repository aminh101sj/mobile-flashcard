import { INIT_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case INIT_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      return {
        ...state,
        [action.title]: { title: action.title, questions: [] },
      }
    case ADD_CARD:
      let questions = state[action.title].questions;
      questions.push(action.card);
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
         questions: questions, 
        }
      }
    default :
      return state
  }
}

export default decks
