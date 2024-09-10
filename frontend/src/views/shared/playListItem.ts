import { getElement } from "../../utility/getElement";
import { TemplateStr } from "../../types/interfaces/TemplateSrt";
// import { TemplatePlayList } from "../../types/interfaces/TemplatePlayList";
// class PlayListItem implements TemplatePlayList {

  class PlayListItem  {
  // private id: number
  // private name: string
  // private image: string
  // private amount: number
  // id: number;
  // name: string;
  // image: string;
  // amount: number;
  constructor(private id: number, private name: string, private image: string, private amount: number) {
    this.id = id
    this.name = name
    this.image = image
    this.amount = amount
  }
  templates: TemplateStr = {
    playListItem: `<li class="playlist__item">
        <picture>
          <source srcset="${this.image}" media="(max-width: 576px)">
          <source srcset="img/playlists__1440%20(1).jpg" media="(max-width: 1440px)"><img class="playlist__img"
            src="${this.image}" alt="${this.name}">
        </picture>
      </li>`,
    playListContant: `<div class="playlist__content"></div>`,
    playListTitle: `<h3 class="playlist__h3"></h3>`,
    playListLInk: `<a class="playlist__h3__link" id="playlist${this.id}" href="/">${this.name}</a>`,
    playListTracks: `<span class="playlist__count">${this.amount} треков</span>`

  }
  render(): HTMLElement {
    const playListItemDOM = getElement(this.templates.playListItem)
    const playListContantDOM = getElement(this.templates.playListContant)
    const playListTitleDOM = getElement(this.templates.playListTitle)
    const playListLInkDOM = getElement(this.templates.playListLInk)
    const playListTracksDOM = getElement(this.templates.playListTracks)
    playListTitleDOM.appendChild(playListLInkDOM)
    playListContantDOM.appendChild(playListTitleDOM)
    playListContantDOM.appendChild(playListTracksDOM)
    playListItemDOM.appendChild(playListContantDOM)
    return playListItemDOM
  }
}
export { PlayListItem }