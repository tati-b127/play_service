import { TemplateStr } from "../../types/interfaces/TemplateSrt";
// import {TemplatePlayList} from "../../types/interfaces/TemplatePlayList";
import { getElement } from "../../utility/getElement";

// class PlayList implements TemplatePlayList {
  class PlayList {
  templates: TemplateStr = {
    sectionPlayList: `<section class="playlist section tabs-content" data-target="playlists"><h2 class="playlist__h2 visually-hidden">Плейлисты</h2></section>`,
    playList: `<ul class="playlist__list"></ul>`,
  }

  render(): HTMLElement{
    const sectionPlayListDOM = getElement(this.templates.sectionPlayList)
    return sectionPlayListDOM

  }
  getPlayList() : HTMLElement {
    return getElement(this.templates.playList)
  }
}

export {PlayList}