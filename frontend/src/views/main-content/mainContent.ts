// import {Tracks} from "./mainTracks";
// import {PlayList} from "./mainPlaylist";

class MainContent {
    render(): HTMLElement {
        const mainDOM = document.createElement('main')
        mainDOM.classList.add('main')
        return mainDOM
    }
}
export {MainContent}