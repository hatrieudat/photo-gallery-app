import { SET_SEARCH, SET_SEARCH_INPUT } from './constants'

export const setSearchInput = payload => ({
    type: SET_SEARCH_INPUT,
    payload
})

export const setSearch = payload => ({
    type: SET_SEARCH,
    payload
})