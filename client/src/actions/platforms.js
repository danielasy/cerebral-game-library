export function platformsIsLoading(isLoading) {
  return {
    type: 'PLATFORMS_IS_LOADING',
    isLoading,
  };
}

export function platformsLoadSuccess(platforms) {
  return {
    type: 'PLATFORMS_LOAD_SUCCESS',
    platforms,
  };
}

export function platformsLoadHasFailed() {
  return {
    type: 'PLATFORMS_LOAD_HAS_FAILED',
  };
}

export function platformsFetchData(url) {
  return (dispatch) => {
    dispatch(platformsIsLoading(true));

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(platformsIsLoading(false));

        return response;
      })
      .then(response => response.json())
      .then(platforms => dispatch(platformsLoadSuccess(platforms)))
      .catch(() => dispatch(platformsLoadHasFailed()));
  };
}

export function platformsOpenDialog() {
  return {
    type: 'PLATFORMS_OPEN_DIALOG',
    isDialogOpen: true,
  };
}

export function platformsCloseDialog() {
  return {
    type: 'PLATFORMS_CLOSE_DIALOG',
    isDialogOpen: false,
  };
}

export function platformsIsAdding(name, isAdding) {
  return {
    type: 'PLATFORMS_IS_ADDING',
    name,
    isAdding,
  };
}

export function platformsAddSuccess(platform) {
  return {
    type: 'PLATFORMS_ADD_SUCCESS',
    platform,
  };
}

export function platformsAddHasFailed(error) {
  return {
    type: 'PLATFORMS_ADD_HAS_FAILED',
    error,
  };
}

export function platformsAdd(name, url) {
  return (dispatch) => {
    dispatch(platformsIsAdding(name, true));

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

        dispatch(platformsIsAdding(name, false));

        return response;
      })
      .then(response => response.json())
      .then(platform => dispatch(platformsAddSuccess(platform)))
      .catch(error => dispatch(platformsAddHasFailed(error)));
  };
}

export function platformsIsDeleting(id, isDeleting) {
  return {
    type: 'PLATFORMS_IS_DELETING',
    id,
    isDeleting,
  };
}

export function platformsDeleteSuccess(id) {
  return {
    type: 'PLATFORMS_DELETE_SUCCESS',
    id,
  };
}

export function platformsDeleteHasFailed(error) {
  return {
    type: 'PLATFORMS_DELETE_HAS_FAILED',
    error,
  };
}

export function platformsDelete(id, url) {
  return (dispatch) => {
    dispatch(platformsIsDeleting(id, true));

    fetch(`${url}/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(platformsIsDeleting(id, false));

        return id;
      })
      .then(id => dispatch(platformsDeleteSuccess(id)))
      .catch(error => dispatch(platformsDeleteHasFailed(error)));
  };
}
