import { PENDING, SUCCESS, ERROR, UPDATE } from "./constants";

const initialState = {
    isLoading: false,
    photos: [],
    page: 0,
    pages: 0,
    error: null,
    largeSizePhotos: [],
    smallestSizePhotos: []
}

const reducer = (state, action) => {
    switch (action.type) {
        case PENDING:
            return {
                ...state,
                isLoading: true
            }
        case SUCCESS:
            const { page, pages, photo, large_photos, smallest_photos } = action.payload
            return {
                ...state,
                isLoading: false,
                page,
                pages,
                photos: photo,
                largeSizePhotos: large_photos,
                smallestSizePhotos: smallest_photos
            }
        case ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case UPDATE:
            return {
                ...state,
                page: action.payload.page,
                photos: state.photos.concat(action.payload.photo),
                largeSizePhotos: state.largeSizePhotos.concat(action.payload.large_photos),
                smallestSizePhotos: state.smallestSizePhotos.concat(action.payload.smallest_photos)
            }
        default:
            throw new Error("Invalid action in CallAPIsReducer!")
    }
}

export { initialState }
export default reducer