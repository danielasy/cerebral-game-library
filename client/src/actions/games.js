export function gamesIsLoading(isLoading) {
  return {
    type: 'GAMES_IS_LOADING',
    isLoading,
  };
}

export function gamesLoadSuccess(games) {
  return {
    type: 'GAMES_LOAD_SUCCESS',
    games,
  };
}

export function gamesLoadHasFailed() {
  return {
    type: 'GAMES_LOAD_HAS_FAILED',
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
      .catch(() => dispatch(gamesLoadHasFailed()));
  };
}

export function gamesOpenDialog() {
  return {
    type: 'GAMES_OPEN_DIALOG',
    isDialogOpen: true,
  };
}

export function gamesCloseDialog() {
  return {
    type: 'GAMES_CLOSE_DIALOG',
    isDialogOpen: false,
  };
}

export function gamesIsAdding(game, isAdding) {
  return {
    type: 'GAMES_IS_ADDING',
    game,
    isAdding,
  };
}

export function gamesAddSuccess(game) {
  return {
    type: 'GAMES_ADD_SUCCESS',
    game,
  };
}

export function gamesAddHasFailed(error) {
  return {
    type: 'GAMES_ADD_HAS_FAILED',
    error,
  };
}

export function gamesAdd(game, url) {
  return (dispatch) => {
    dispatch(gamesIsAdding(game, true));

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(game)
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(gamesIsAdding(game, false));

        return response;
      })
      .then(response => response.json())
      .then(game => dispatch(gamesAddSuccess(game)))
      .catch(error => dispatch(gamesAddHasFailed(error)));
  };
}

export function gamesIsDeleting(id, isDeleting) {
  return {
    type: 'GAMES_IS_DELETING',
    id,
    isDeleting,
  };
}

export function gamesDeleteSuccess(id) {
  return {
    type: 'GAMES_DELETE_SUCCESS',
    id,
  };
}

export function gamesDeleteHasFailed(error) {
  return {
    type: 'GAMES_DELETE_HAS_FAILED',
    error,
  };
}

export function gamesDelete(id, url) {
  return (dispatch) => {
    dispatch(gamesIsDeleting(id, true));

    fetch(`${url}/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(gamesIsDeleting(id, false));

        return id;
      })
      .then(id => dispatch(gamesDeleteSuccess(id)))
      .catch(error => dispatch(gamesDeleteHasFailed(error)));
  };
}

export function gamesSort(sortBy) {
  return {
    type: 'GAMES_SORT',
    sortBy,
  };
}
