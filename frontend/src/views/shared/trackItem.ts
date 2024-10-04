// import { TemplateTrack } from "../../types/interfaces/TemplateTrack";
import {TrackItemName} from "./trackItemName";
import {TrackItemData} from "./trackItemData";
import {TrackItemDrop} from "./trackItemDrop";
import {TimeTrack} from "./timeTrack";

// class TrackItem implements TemplateTrack{
class TrackItem {
    private element: HTMLElement | null = null;
        constructor(private number: number, private title: string, private author: string, private album:string, private urlImg: string, private url:string, private date: Date, private active: boolean, private time: number, private playListId?: string) {
            this.number = number
            this.title = title
            this.author = author
            this.album = album
            this.urlImg = urlImg
            this.url = url
            this.date = date
            this.active = active
            this.time = time
            this.playListId = playListId
        }
    
    render():HTMLElement{
    const trackItemDOM = new TrackItemName(this.number, this.title, this.author, this.album, this.urlImg, this.url).render()
    const trackItemDataDOM = new TrackItemData(this.number, this.date, this.active).render()
    const trackTimeDOM = new TimeTrack(this.time).render()
    this.element = trackItemDOM.querySelector('a')
    let trackItemDropDOM: HTMLElement
    //changed id track
    if(this.playListId){
        trackItemDropDOM = new TrackItemDrop(this.number, this.playListId).render()
    } else {
        trackItemDropDOM = new TrackItemDrop(this.number).render()

    }

        trackItemDOM.append(trackItemDataDOM)
        trackItemDOM.append(trackTimeDOM)
        trackItemDOM.append(trackItemDropDOM)

        return trackItemDOM
    }
    public getTrackLink() {
        return this.element
    }
}

export {TrackItem}