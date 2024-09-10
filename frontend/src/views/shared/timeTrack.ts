import { TemplateStr } from "../../types/interfaces/TemplateSrt"
import { getElement } from "../../utility/getElement"

class TimeTrack{
    constructor(private time: string) {
        this.time = time
    }
    templates: TemplateStr = { trackTime:`<time class="tracks__item__time">${this.time}</time>`}
    render():HTMLElement {
        return getElement(this.templates.trackTime)
    }

}
export {TimeTrack}