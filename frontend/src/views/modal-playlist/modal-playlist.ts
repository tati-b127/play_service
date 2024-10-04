// import {parser} from '../../utility/parser'
import { TemplateStr } from "../../types/interfaces/TemplateSrt";
import { getElement } from "../../utility/getElement";

class ModalPlaylist {
  public static element: HTMLElement | null = null
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
      modalDOM.appendChild(modalTitleDOM)
      ModalPlaylist.element = modalDOM
      return modalDOM
    } 
    getModalPlayListContent(): HTMLElement {
      return getElement(this.templates.modalContent)
    }
    public static getModalContainer() {
      if (this.element) {
        return this.element
      }
    }
    public static setIdModalId(id: number) {
      if(this.element){
        this.element?.setAttribute('id', `modal-trackId-${id}`)
      }
    }
    public static getIdModalId() {
      if(this.element && this.element.getAttribute('id') && this.element?.getAttribute('id') !== '') {
        return Number(this.element?.getAttribute('id')?.split('-')[2])
      }
    }
    getModalPlayListFooterContent(): HTMLElement {
      const modalBtnClose = getElement(this.templates.modalBtnClose)
      const modalFooterDOM = getElement(this.templates.modalFooter)
      modalFooterDOM.appendChild(modalBtnClose)
      modalBtnClose.addEventListener('click', () => {
       ModalPlaylist.element?.classList.remove('show')
      })
      return modalFooterDOM
    }
  }
export {ModalPlaylist}