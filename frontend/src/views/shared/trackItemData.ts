import { TemplateStr } from "../../types/interfaces/TemplateSrt";
import { getElement } from "../../utility/getElement";
import {LikeBtn} from "./likeBtn";
class TrackItemData {
    constructor (private date: string, private active: boolean) {
        this.date = date
        this.active = active
    }
    templates:TemplateStr = { trackData:`<div class="tracks__item__data flex"><span class="data__text">${this.date}</span></div>`}
    render(): HTMLElement {
        const trackData = getElement(this.templates.trackData)
        const likeBtn = new LikeBtn(this.active)
        let likeBtnDOM = likeBtn.render()
        trackData.appendChild(likeBtnDOM)
        likeBtnDOM.addEventListener('click', () =>{
            this.active = !this.active
            likeBtn.activeBtn = this.active
            likeBtnDOM = likeBtn.changeActive()
            trackData.appendChild(likeBtnDOM)

        })
        return trackData
    }
}
export {TrackItemData}