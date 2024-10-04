import {Element} from "../../types/abstract/Element";
import {getElement} from "../../utility/getElement";

class LikeBtn extends Element{
    private element: HTMLElement | null = null
    constructor ( private active: boolean) {
        super()
        this.active = active
    }
    template: string = `<button class="track__like-btn"><svg width="22" height="18" viewBox="0 0 22 18"
                      fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M15.5022 8.2786e-06C14.6291 -0.00149138 13.7677 0.200775 12.9865 0.590718C12.2052 0.980661 11.5258 1.54752 11.0022 2.24621C10.293 1.30266 9.30512 0.606001 8.17823 0.254823C7.05134 -0.0963541 5.84256 -0.0842713 4.72291 0.289363C3.60327 0.662997 2.62948 1.37926 1.93932 2.3368C1.24916 3.29434 0.877596 4.44467 0.877197 5.62501C0.877197 12.3621 10.2373 17.6813 10.6357 17.9044C10.7477 17.9671 10.8739 18 11.0022 18C11.1305 18 11.2567 17.9671 11.3687 17.9044C13.0902 16.8961 14.7059 15.7173 16.1914 14.3856C19.4665 11.438 21.1272 8.49047 21.1272 5.62501C21.1255 4.13368 20.5323 2.70393 19.4778 1.6494C18.4233 0.594873 16.9935 0.00169855 15.5022 8.2786e-06V8.2786e-06Z"
                        fill="#FC6D3E" />
                    </svg>
                  </button>`
    render(): HTMLElement {
        const likeBtn = getElement(this.template)
        this.active ? likeBtn.classList.add('like-btn--active') : likeBtn.classList.remove('like-btn--active')
        this.element = likeBtn
        return likeBtn
    }
    getTemplate(): string {
        return this.template
    }
    getElement(): HTMLElement {
        return this.render()
    }
    removeElement(): void {
        this.element = null
    }
    get activeBtn(): boolean {
        return this.active
    }
    set activeBtn(val: boolean) {
        this.active = val
    }
    changeActive() {
        if (this.element as HTMLElement && this.element) {
            this.active ? this.element.classList.add('like-btn--active') : this.element.classList.remove('like-btn--active')
        }
        return this.element as HTMLElement
    }
    public getLikeActive(): boolean {
        return this.active
    }

}
export {LikeBtn}