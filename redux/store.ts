import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { announcementReducer } from "./reducers/reducer";
import logger from "redux-logger";
// import { reducer as somethingReducer } from "./states/something/reducer";

export const initStore = (initialState: any) => {
	return createStore(
		// combineReducers({
		// 	announcement: announcementReducer
		// }),
		announcementReducer,
		initialState,
		composeWithDevTools(applyMiddleware(thunkMiddleware, logger))
	);
};
