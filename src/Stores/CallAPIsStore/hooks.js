import { useContext } from "react";
import Context from "./Context";

const api_key = 'e54b0a145eb4c5ba60b099f7f2ad2322'

export const useCallAPIsStore = () => {
    const [state, dispatch] = useContext(Context);

    return [state, dispatch];
}

export const getPhotosAPI = async (page = 1, text = 'nature') => {
    const res = await fetch("https://api.flickr.com/services/rest/?method=flickr.photos.search"
                            + `&api_key=${api_key}`
                            + `&page=${page}`
                            + '&per_page=32'
                            + `&text=${text}`
                            + '&format=json'
                            + '&nojsoncallback=1')
    const obj = await res.json()
    if (obj.stat === 'fail') {
        return obj
    }

    // const splitPhotosToChunk = (oldPhotos) => {
    //     const chunkSize = 4;
    //     const newPhotos = [];
    //     for (let i = 0; i < oldPhotos.length; i += chunkSize) {
    //         const chunk = oldPhotos.slice(i, i + chunkSize);            
    //         newPhotos.push(chunk)
    //     }
    //     return newPhotos
    // }

    const analyzeToURL = (arrRawPhoto) => {
        return arrRawPhoto.map(item => (
            `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`
        ))
    }

    const largePhotos = (arrRawPhoto) => {
        return arrRawPhoto.map(item => (
            `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`
        ))
    }

    const smallestPhotos = (arrRawPhoto) => {
        return arrRawPhoto.map(item => (
            `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_s.jpg`
        ))
    }

    const photos = { ...obj.photos, 
                    photo: analyzeToURL(obj.photos.photo), 
                    large_photos: largePhotos(obj.photos.photo),
                    smallest_photos: smallestPhotos(obj.photos.photo)
                   }
    return { ...obj, photos }
}