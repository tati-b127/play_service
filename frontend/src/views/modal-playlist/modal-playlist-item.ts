import { TemplateStr } from "../../types/interfaces/TemplateSrt";
import { getElement } from "../../utility/getElement";

class ModalPlayListItem {
    private element: HTMLElement|null = null;
    constructor( private name: string, private image: string, private amount: number, private playListId: number) {
        this.name = name;
        this.image = image;
        this.amount = amount;
        this.playListId = playListId;
    }
    templates: TemplateStr = {
        modalContentItem: `<button class="playlists-modal__playlist" id="playlist-${this.playListId}">
        <img src="${this.image}" alt="${this.name}" class="playlists-modal__playlist__image" />
        <div class="playlists-modal__playlist__title">${this.name}</div>
        <div class="playlists-modal__playlist__info">${this.amount} треков</div>
      </button>`
    }
    render(): HTMLElement {
        const btnAddPlayList = getElement(this.templates.modalContentItem)
        btnAddPlayList.addEventListener("click", () => {
            this.addPlayList()
        })
        return btnAddPlayList
    }
    addPlayList() {
        // ajax add playlist
        console.log(this.playListId);
        
    }
}
export {ModalPlayListItem}