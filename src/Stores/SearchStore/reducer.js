import { SET_SEARCH, 
         SET_SEARCH_INPUT } from './constants'

const initialState = {
    isLoading: true,
    error: '',
    searchInput: '',
    search: '',
    result: [],
}

const reducer = (state, action) => {
    switch (action.type) {
        case SET_SEARCH_INPUT:
            return {
                ...state,
                searchInput: action.payload
            }
        case SET_SEARCH:
            return {
                ...state,
                search: action.payload
            }
        default:
            throw new Error('Invalid action in SearchReducer!')
    }
}

export {initialState};
export default reducer;