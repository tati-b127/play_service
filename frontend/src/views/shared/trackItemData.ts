import { HTTPService } from "../../api-config/config";
import { TemplateStr } from "../../types/interfaces/TemplateSrt";
import { getElement } from "../../utility/getElement";
import {LikeBtn} from "./likeBtn";
// import {DayFormat} from "../../types/interfaces/DayFormat"
class TrackItemData {
    private templates: TemplateStr;
    constructor (private number: number, private date: Date, private active: boolean) {
        this.date = date
        this.number = number
        this.active = active
        this.templates = { trackData:`<div class="tracks__item__data flex"><span class="data__text">${this.getCurrentDate()}</span></div>`}
    }
    render(): HTMLElement {
        const trackData = getElement(this.templates.trackData)
        const likeBtn = new LikeBtn(this.active)
        let likeBtnDOM = likeBtn.render()
        trackData.appendChild(likeBtnDOM)
        likeBtnDOM.addEventListener('click', async () =>{
            // likeBtn.activeBtn = this.active
            console.log(likeBtn.activeBtn);
            
            if (this.active) {
                await  HTTPService.removeLike(this.number).then(() =>{
                    console.log('Removed', likeBtn.activeBtn, this.active);
                    
                    this.active = !this.active
                    likeBtn.activeBtn = this.active

                    likeBtnDOM = likeBtn.changeActive()
                    console.log('Removed', likeBtn.activeBtn, this.active, likeBtnDOM);

                    trackData.appendChild(likeBtnDOM)       
                })
            } else if (!this.active) {
                await  HTTPService.addLike(this.number).then(() =>{
                    console.log('Added');
                    
                    this.active = !this.active
                    likeBtn.activeBtn = this.active

                    likeBtnDOM = likeBtn.changeActive()
                    trackData.appendChild(likeBtnDOM)       
                })
            }
            // this.active = !this.active
            // likeBtnDOM = likeBtn.changeActive()
            // trackData.appendChild(likeBtnDOM)

        })
        return trackData
    }
    getDate() {
        return this.date
    }
    getCurrentDate() {
        // const day = new Date(this.date)
        // const dayAgo = day.toLocaleDateString('ru-RU')
        return new Date(this.date).toLocaleDateString('ru-RU')
    }
}
export {TrackItemData}