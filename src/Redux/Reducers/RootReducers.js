import { combineReducers } from "redux";
import { signIn, signUp, authState, sentPost, snapShot } from './Reducers';

export const rootReducer = combineReducers({
    signIn,
    signUp,
    snapShot,
    authState,
    sentPost
})