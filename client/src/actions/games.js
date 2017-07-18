export function gamesHasFailedLoading() {
  return {
    type: 'GAMES_HAS_FAILED_LOADING',
    hasFailed: true,
  };
}

export function gamesIsLoading(bool) {
  return {
    type: 'GAMES_IS_LOADING',
    isLoading: bool,
  };
}

export function gamesLoadSuccess(games) {
  return {
    type: 'GAMES_LOAD_SUCCESS',
    games,
  };
}

export function gamesFetchData(url) {
  return (dispatch) => {
    dispatch(gamesIsLoading(true));

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(gamesIsLoading(false));

        return response;
      })
      .then((response) => response.json())
      .then((games) => dispatch(gamesLoadSuccess(games)))
      .catch(() => dispatch(gamesHasFailedLoading(true)));
  };
}
