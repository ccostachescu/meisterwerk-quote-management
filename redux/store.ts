import { legacy_createStore as createStore } from "redux";
import enhancers from "./enhancers";
import { initialState, reducers } from "./modules";

export default createStore(reducers, initialState, enhancers);
