import { sortGames as sort } from '../helpers/sort';

export function gamesIsLoading(state = false, action) {
  switch (action.type) {
    case 'GAMES_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function gamesLoadHasFailed(state = false, action) {
  switch (action.type) {
    case 'GAMES_LOAD_HAS_FAILED':
      return true;
    default:
      return state;
  }
}

export function games(state = [], action) {
  switch (action.type) {
    case 'GAMES_LOAD_SUCCESS':
      return action.games;
    case 'GAMES_ADD_SUCCESS':
      return state.concat([action.game]);
    case 'GAMES_DELETE_SUCCESS':
      return state.filter(game => game.id !== action.id);
    case 'GAMES_SORT':
      return sort(state, action.sortBy);
    default:
      return state;
  }
}

export function gamesToggleDialog(state = false, action) {
  switch (action.type) {
    case 'GAMES_OPEN_DIALOG':
    case 'GAMES_CLOSE_DIALOG':
      return action.isDialogOpen;
    default:
      return state;
  }
}

export function gamesIsAdding(state = false, action) {
  switch (action.type) {
    case 'GAMES_IS_ADDING':
      return action.isAdding;
    default:
      return state;
  }
}

export function gamesAddHasFailed(state = false, action) {
  switch (action.type) {
    case 'GAMES_ADD_HAS_FAILED':
      return true;
    default:
      return state;
  }
}

export function gamesIsDeleting(state = false, action) {
  switch (action.type) {
    case 'GAMES_IS_DELETING':
      return action.isDeleting;
    default:
      return state;
  }
}

export function gamesDeleteHasFailed(state = false, action) {
  switch (action.type) {
    case 'GAMES_DELETE_HAS_FAILED':
      return true;
    default:
      return state;
  }
}

export function gamesSetSortBy(state = 'title-asc', action) {
  switch (action.type) {
    case 'GAMES_SORT':
      return action.sortBy;
    default:
      return state;
  }
}
