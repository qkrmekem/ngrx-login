import { State } from "./state.interface";

export const selectAccessToken = (state:State) => {
    console.log('accessToken 셀렉터', state);
    
    return state.accessToken
};

export const selectError = (state: State) => {
    console.log('error 셀렉터', state);
    
    return state.error;
}