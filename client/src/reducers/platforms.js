export function platformsIsLoading(state = false, action) {
  switch (action.type) {
    case 'PLATFORMS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function platformsLoadHasFailed(state = false, action) {
  switch (action.type) {
    case 'PLATFORMS_LOAD_HAS_FAILED':
      return true;
    default:
      return state;
  }
}

export function platforms(state = [], action) {
  switch (action.type) {
    case 'PLATFORMS_LOAD_SUCCESS':
      return action.platforms;
    case 'PLATFORMS_ADD_SUCCESS':
      return state.concat([action.platform]);
    case 'PLATFORMS_DELETE_SUCCESS':
      return state.filter(platform => platform.id !== action.id);
    default:
      return state;
  }
}

export function platformsToggleDialog(state = false, action) {
  switch (action.type) {
    case 'PLATFORMS_OPEN_DIALOG':
    case 'PLATFORMS_CLOSE_DIALOG':
      return action.isDialogOpen;
    default:
      return state;
  }
}

export function platformsIsAdding(state = false, action) {
  switch (action.type) {
    case 'PLATFORMS_IS_ADDING':
      return action.isAdding;
    default:
      return state;
  }
}

export function platformsAddHasFailed(state = false, action) {
  switch (action.type) {
    case 'PLATFORMS_ADD_HAS_FAILED':
      return true;
    default:
      return state;
  }
}

export function platformsIsDeleting(state = false, action) {
  switch (action.type) {
    case 'PLATFORMS_IS_DELETING':
      return action.isDeleting;
    default:
      return state;
  }
}

export function platformsDeleteHasFailed(state = false, action) {
  switch (action.type) {
    case 'PLATFORMS_DELETE_HAS_FAILED':
      return true;
    default:
      return state;
  }
}
