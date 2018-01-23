import {combineReducers} from 'redux';
import { reducer as mopidy } from './ducks/mopidy';
import { reducer as playback } from './ducks/playback';
import { reducer as search } from './ducks/search';
import { reducer as tracklist } from './ducks/tracklist';

const rootReducer = combineReducers({
	mopidy,
	playback,
	search,
	tracklist
});
export default rootReducer;