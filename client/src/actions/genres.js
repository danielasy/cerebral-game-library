export function genresIsLoading(isLoading) {
  return {
    type: 'GENRES_IS_LOADING',
    isLoading,
  };
}

export function genresLoadSuccess(genres) {
  return {
    type: 'GENRES_LOAD_SUCCESS',
    genres,
  };
}

export function genresLoadHasFailed() {
  return {
    type: 'GENRES_LOAD_HAS_FAILED',
  };
}

export function genresFetchData(url) {
  return (dispatch) => {
    dispatch(genresIsLoading(true));

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(genresIsLoading(false));

        return response;
      })
      .then(response => response.json())
      .then(genres => dispatch(genresLoadSuccess(genres)))
      .catch(() => dispatch(genresLoadHasFailed()));
  };
}

export function genresOpenDialog() {
  return {
    type: 'GENRES_OPEN_DIALOG',
    isDialogOpen: true,
  };
}

export function genresCloseDialog() {
  return {
    type: 'GENRES_CLOSE_DIALOG',
    isDialogOpen: false,
  };
}

export function genresIsAdding(name, isAdding) {
  return {
    type: 'GENRES_IS_ADDING',
    name,
    isAdding,
  };
}

export function genresAddSuccess(genre) {
  return {
    type: 'GENRES_ADD_SUCCESS',
    genre,
  };
}

export function genresAddHasFailed(error) {
  return {
    type: 'GENRES_ADD_HAS_FAILED',
    error,
  };
}

export function genresAdd(name, url) {
  return (dispatch) => {
    dispatch(genresIsAdding(name, true));

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name})
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(genresIsAdding(name, false));

        return response;
      })
      .then(response => response.json())
      .then(genre => dispatch(genresAddSuccess(genre)))
      .catch(error => dispatch(genresAddHasFailed(error)));
  };
}

export function genresIsDeleting(id, isDeleting) {
  return {
    type: 'GENRES_IS_DELETING',
    id,
    isDeleting,
  };
}

export function genresDeleteSuccess(id) {
  return {
    type: 'GENRES_DELETE_SUCCESS',
    id,
  };
}

export function genresDeleteHasFailed(error) {
  return {
    type: 'GENRES_DELETE_HAS_FAILED',
    error,
  };
}

export function genresDelete(id, url) {
  return (dispatch) => {
    dispatch(genresIsDeleting(id, true));

    fetch(`${url}/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(genresIsDeleting(id, false));

        return id;
      })
      .then(id => dispatch(genresDeleteSuccess(id)))
      .catch(error => dispatch(genresDeleteHasFailed(error)));
  };
}
