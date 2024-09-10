import { TemplateStr } from "../../types/interfaces/TemplateSrt"
import { getElement } from "../../utility/getElement"
class TrackItemName{

    constructor(private number: number, private title: string, private author: string, private album:string, private urlImg: string, private url:string) {
        this.number = number
        this.title = title
        this.author = author
        this.album = album
        this.urlImg = urlImg
        this.url = url
    }
    templates:TemplateStr = {
        trackName: `<li class="tracks__item flex"><div class="tracks__item__number">${this.number}</div>
                   <div class="tracks__item__name">
                  <img class="track__img" src="${this.urlImg}" alt="${this.title}">
                  <div class="track__content">
                    <h3 class="track__name"><a class="track__name__link" href="${this.url}">${this.title}</a></h3>
                    <span
                      class="track__author">${this.author}
                     </span>
                  </div>
                </div>
                <div class="tracks__item__albom">${this.album}</div></li>`
    } 

    render() :HTMLElement {
        return getElement(this.templates.trackName)
    }

}
export {TrackItemName}