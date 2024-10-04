import { getElement } from "../../utility/getElement"
import { TemplateStr } from "../../types/interfaces/TemplateSrt"
import { ModalPlaylist } from "../modal-playlist/modal-playlist"
import { HTTPService } from "../../api-config/config"
class TrackItemDrop {
    private element: HTMLElement | null = null
    templates: TemplateStr
    constructor(private songId: number, private playListId?: string) {
      this.songId = songId
      this.playListId = playListId
      this.templates = { 
        trackDropDown:`<div class="tracks__item__drop"></div>`,
        btnDropDown: `<button class="track__btn-dropdown"><svg width="23" height="4" viewBox="0 0 23 4" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                        <circle cx="11.5" cy="2" r="2" fill="#C4C4C4" />
                        <circle cx="21" cy="2" r="2" fill="#C4C4C4" />
                      </svg>
                    </button>`,
        dropdown: `<div class="track__dropdown">
                    </div>`,
                    btnAddPlayList: `<button class="track__add-btn" id="track__add-btn-${this.songId}">Добавить в плейлист</button>`,
                    btnDeletePlayList: `<button class="track__delete-btn">Удалить из плейлиста</button>`
                  }
    }
    render(): HTMLElement {
        const btnDropDown = getElement(this.templates.btnDropDown)
        const trackDropdown = getElement(this.templates.trackDropDown)
        trackDropdown.appendChild(btnDropDown)
        this.element = trackDropdown
        btnDropDown.addEventListener('click', () => {
          this.showDropDown()
        })
        return trackDropdown
    }

    showDropDown() {
      const dropdown = getElement(this.templates.dropdown)
      const btnAddPlayList = getElement(this.templates.btnAddPlayList)
      const btnDeletePlayList = getElement(this.templates.btnDeletePlayList)
      btnAddPlayList.addEventListener('click', () => {
        //ajax
        this.hideDropdownAll()
        ModalPlaylist.element?.classList.add('show')
        ModalPlaylist.setIdModalId(this.songId)
        // document.querySelector('.playlists-modal')?.classList.add('show')
      })
      if(this.element){
        dropdown.style.display = 'flex'
        if(this.playListId) {
          dropdown.appendChild(btnDeletePlayList)
          btnDeletePlayList.addEventListener('click', () => {
            HTTPService.removeFromPlaylist(Number(this.playListId),this.songId).then(() => {
              console.log('removed!');
              
              const item = document.querySelectorAll('.tracks__item__number')
              item.forEach(item => {
                if(Number(item.textContent) === this.songId){
                  item.parentElement?.remove()
                }
              })
              console.log(item);
              
              
            })
            // ajax
            this.hideDropdownAll()
    
          })
    
        }
        // if track contains playlist append btn delete else append btn add

        dropdown.appendChild(btnAddPlayList)
        
        if(this.element.children.length > 1){
          this.hideDropdownAll()
        } else {
          this.element?.appendChild(dropdown)
        }
      }
    }
    hideDropdownAll() {
      const dropdowns: NodeListOf<HTMLElement> = document.querySelectorAll('.track__dropdown')
      dropdowns.forEach(dropdown => {
        dropdown.remove()
      })
    }
    getTrackId() {
      return this.songId
    }

}
export {TrackItemDrop}