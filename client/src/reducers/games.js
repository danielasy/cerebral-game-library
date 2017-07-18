export function gamesHasFailedLoading(state = false, action) {
  switch (action.type) {
    case 'GAMES_HAS_FAILED_LOADING':
      return action.hasFailed;
    default:
      return state;
  }
}

export function gamesIsLoading(state = false, action) {
  switch (action.type) {
    case 'GAMES_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function games(state = [], action) {
  switch (action.type) {
    case 'GAMES_LOAD_SUCCESS':
      return action.games;
    default:
      return state;
  }
}
