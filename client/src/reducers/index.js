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
});
