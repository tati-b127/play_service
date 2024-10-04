import { HTTPService } from "../../api-config/config";
import { TemplateStr } from "../../types/interfaces/TemplateSrt";
import { getElement } from "../../utility/getElement";
import { ModalPlaylist } from "./modal-playlist";

class ModalPlayListItem {
    private element: HTMLElement|null = null;
    private templates: TemplateStr
    private playListId: number
    constructor( playListId: number, private name: string,  private amount: number, private image: string | undefined = 'img/playlists__1440%20(1).jpg') {
        this.name = name;
        this.image = image;
        this.amount = amount;
        this.playListId = playListId;
        this.templates = {
            modalContentItem: `<button class="playlists-modal__playlist" id="playlist-${this.playListId}">
            <img src="${this.image}" alt="${this.name}" class="playlists-modal__playlist__image" />
            <div class="playlists-modal__playlist__title">${this.name}</div>
            <div class="playlists-modal__playlist__info">${this.amount} треков</div>
          </button>`
        }
    }
    render(): HTMLElement {
        const btnAddPlayList = getElement(this.templates.modalContentItem)
        btnAddPlayList.addEventListener("click", (e) => {
            console.log(e);
            
            ModalPlayListItem.addPlayList(this.playListId)
        })
        return btnAddPlayList
    }
    getId(): number {
        return this.playListId
    }
    public static async addPlayList(id: number) {
        const trackID:number | undefined = ModalPlaylist.getIdModalId()
        if (trackID) {
           await HTTPService.addToPlaylist(id, trackID).then(() => {
                ModalPlaylist.element?.classList.remove('show')
            })
            
        }
        // ajax add playlist
        console.log(this, id);
    }
}
export {ModalPlayListItem}