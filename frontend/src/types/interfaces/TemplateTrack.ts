import {LikeFormat} from './LikeFormat'
interface TemplateTrack {
    id: number
    name: string
    filename: string
    artist: {
        id: number
        createdAt: Date 
        image: string
        name: string
    }
    album: {
        id: number
        createdAt: Date 
        image: string
        name: string
    }
    duration: number
    createdAt: Date
    path: string
    image: string
    likes: Array<LikeFormat>
}
// const timeFormat: RegExp = new RegExp((?:[0-5][0-9]):[0-5][0-9])
// ^([0-1]\d|2[0-3])(:[0-5]\d){2}$
export {TemplateTrack}