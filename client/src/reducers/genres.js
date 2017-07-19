export function genresIsLoading(state = false, action) {
  switch (action.type) {
    case 'GENRES_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function genresLoadHasFailed(state = false, action) {
  switch (action.type) {
    case 'GENRES_LOAD_HAS_FAILED':
      return true;
    default:
      return state;
  }
}

export function genres(state = [], action) {
  switch (action.type) {
    case 'GENRES_LOAD_SUCCESS':
      return action.genres;
    case 'GENRES_ADD_SUCCESS':
      return state.concat([action.genre]);
    case 'GENRES_DELETE_SUCCESS':
      return state.filter(genre => genre.id !== action.id);
    default:
      return state;
  }
}

export function genresToggleDialog(state = false, action) {
  switch (action.type) {
    case 'GENRES_OPEN_DIALOG':
    case 'GENRES_CLOSE_DIALOG':
      return action.isDialogOpen;
    default:
      return state;
  }
}

export function genresIsAdding(state = false, action) {
  switch (action.type) {
    case 'GENRES_IS_ADDING':
      return action.isAdding;
    default:
      return state;
  }
}

export function genresAddHasFailed(state = false, action) {
  switch (action.type) {
    case 'GENRES_ADD_HAS_FAILED':
      return true;
    default:
      return state;
  }
}

export function genresIsDeleting(state = false, action) {
  switch (action.type) {
    case 'GENRES_IS_DELETING':
      return action.isDeleting;
    default:
      return state;
  }
}

export function genresDeleteHasFailed(state = false, action) {
  switch (action.type) {
    case 'GENRES_DELETE_HAS_FAILED':
      return true;
    default:
      return state;
  }
}
