import { combineReducers, createStore } from "redux";
import { sinhVienReducer } from "./reducers/sinhVienReducer";

const rootReducer = combineReducers({
	sinhVienReducer,
});

export const store = createStore(rootReducer);
