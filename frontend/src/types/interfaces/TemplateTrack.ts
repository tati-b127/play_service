interface TemplateTrack {
    id: number
    name: string
    filename: string
    artist: string
    album: string
    duration: string
    createdAt: Date
    path: string
    image: string
}
// const timeFormat: RegExp = new RegExp((?:[0-5][0-9]):[0-5][0-9])
// ^([0-1]\d|2[0-3])(:[0-5]\d){2}$
export {TemplateTrack}