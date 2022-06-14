import { PENDING, SUCCESS, ERROR, UPDATE } from "./constants";

export const pendingAPI = () => ({
    type: PENDING
})

export const successAPI = payload => ({
    type: SUCCESS,
    payload
})

export const errorAPI = payload => ({
    type: ERROR,
    payload
})

export const updatePhotos = payload => ({
    type: UPDATE,
    payload
})