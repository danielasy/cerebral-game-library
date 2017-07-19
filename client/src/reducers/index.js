import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { games, gamesHasFailedLoading, gamesIsLoading } from './games';
import {
  genres,
  genresLoadHasFailed,
  genresIsLoading,
  genresToggleDialog,
  genresIsAdding,
  genresAddHasFailed,
  genresIsDeleting,
  genresDeleteHasFailed,
} from './genres';
import {
  platforms,
  platformsLoadHasFailed,
  platformsIsLoading,
  platformsToggleDialog,
  platformsIsAdding,
  platformsAddHasFailed,
  platformsIsDeleting,
  platformsDeleteHasFailed,
} from './platforms';

export default combineReducers({
  form: formReducer,
  games,
  gamesHasFailedLoading,
  gamesIsLoading,
  genres,
  genresLoadHasFailed,
  genresIsLoading,
  genresIsDialogOpen: genresToggleDialog,
  genresIsAdding,
  genresAddHasFailed,
  genresIsDeleting,
  genresDeleteHasFailed,
  platforms,
  platformsLoadHasFailed,
  platformsIsLoading,
  platformsIsDialogOpen: platformsToggleDialog,
  platformsIsAdding,
  platformsAddHasFailed,
  platformsIsDeleting,
  platformsDeleteHasFailed,
});
