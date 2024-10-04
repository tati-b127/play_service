import { TemplateStr } from "../../types/interfaces/TemplateSrt"
import { getElement } from "../../utility/getElement"

class TimeTrack{
    private templates: TemplateStr
    constructor(private time: number) {
        this.time = time
        this.templates = { trackTime:`<time class="tracks__item__time">${this.getTime()}</time>`}
    }
    render():HTMLElement {
        return getElement(this.templates.trackTime)
    }
    getTime():string { 
        const minutes = Math.floor(this.time / 60000);
        const seconds = ((this.time % 60000) / 1000).toFixed(0);
        return minutes + ":" + (parseInt(seconds) < 10 ? '0' : '') + seconds;        
    }

}
export {TimeTrack}