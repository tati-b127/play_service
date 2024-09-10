import {LikeBtn} from "./likeBtn";
import {TemplateStr} from "../../types/interfaces/TemplateSrt";
import { getElement } from "../../utility/getElement";
class PlayerItem {
    constructor (private title: string, private author: string,  private urlImg: string, private active: boolean) {
        this.title = title
        this.author = author
        this.urlImg = urlImg
        this.active = active
    }
    templates: TemplateStr  = {
        playerTrackName: `<div class="player__track-name flex"></div>`,
        trackImg: `<img class="player__track__img" src="${this.urlImg}" alt="${this.title}">`,
        trackTitle: `<h3 class="player__track__h3">${this.title}</h3>`,
        trackHeader: `<div class="flex player__name__header"></div>`,
        trackContent: `<div class="player__track-name__content"></div>`,
        trackAuthor: `<p class="player__track__author">${this.author}</p>`
    }
    render():HTMLElement {
        const name = getElement(this.templates.playerTrackName)
        const img = getElement(this.templates.trackImg)
        const title = getElement(this.templates.trackTitle)
        const header = getElement(this.templates.trackHeader)
        const content = getElement(this.templates.trackContent)
        const author = getElement(this.templates.trackAuthor)
        const likeBtn = new LikeBtn(this.active)
        let likeBtnDOM = likeBtn.render()
        likeBtnDOM.addEventListener('click', () =>{
            this.active = !this.active
            likeBtn.activeBtn = this.active
            likeBtnDOM = likeBtn.changeActive()
            header.appendChild(likeBtnDOM)
        })

        name.appendChild(img)
        header.appendChild(title)
        header.appendChild(likeBtnDOM)

        content.appendChild(header)
        content.appendChild(author)
        name.appendChild(content)
        return name

    }
}
export {PlayerItem}