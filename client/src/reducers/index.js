import { combineReducers } from 'redux';
import { games, gamesHasFailedLoading, gamesIsLoading } from './games';

export default combineReducers({
  games,
  gamesHasFailedLoading,
  gamesIsLoading
});
