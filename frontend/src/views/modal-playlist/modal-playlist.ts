// import {parser} from '../../utility/parser'
import { TemplateStr } from "../../types/interfaces/TemplateSrt";
import { getElement } from "../../utility/getElement";

class ModalPlaylist {
  private element: HTMLElement | null = null
    templates: TemplateStr ={
       modal: `<div class="playlists-modal"></div>`,
       modalTitle: `<div class="playlists-modal__title">Добавить в плейлист</div>`,
       modalContent: `<div class="playlists-modal__playlist_content"></div>`,
       modalFooter: `<div class="playlists-modal__footer"></div>`,
       modalBtnClose: `<div class="playlists-modal__close-btn">Отменить</div>`
    } 
    render() {
      const modalDOM = getElement(this.templates.modal)
      const modalTitleDOM = getElement(this.templates.modalTitle)
      // const modalContentDOM = this.getModalPlayListContent()
      // const modalFooterDOM = getElement(this.templates.modalFooter)
      modalDOM.appendChild(modalTitleDOM)
      this.element = modalDOM
      // modalDOM.appendChild(modalContentDOM)
      // modalDOM.appendChild(modalFooterDOM)
      return modalDOM
    } 
    getModalPlayListContent(): HTMLElement {
      return getElement(this.templates.modalContent)
    }
    getModalPlayListFooterContent(): HTMLElement {
      const modalBtnClose = getElement(this.templates.modalBtnClose)
      const modalFooterDOM = getElement(this.templates.modalFooter)
      modalFooterDOM.appendChild(modalBtnClose)
      modalBtnClose.addEventListener('click', () => {
        this.element?.classList.remove('show')
      })
      return modalFooterDOM
    }
  }
export {ModalPlaylist}