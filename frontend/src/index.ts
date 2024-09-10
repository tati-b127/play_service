import './css/style.css'

import { Header } from "./views/header/header"
import { ModalPlaylist } from './views/modal-playlist/modal-playlist'
import { ModalPlayListItem } from './views/modal-playlist/modal-playlist-item'
import { MainContent } from "./views/main-content/mainContent"
import { PlayList } from "./views/main-content/mainPlaylist"
import { PlayListItem } from './views/shared/playListItem'
import { Aside } from "./views/aside/aside"
import { Player } from "./views/player/player";
import { Tracks } from "./views/main-content/mainTracks";
import { TrackItem } from "./views/shared/trackItem";
import { HTTPService } from './api-config/config'

console.log('Hello World!');

const user = {
    username: 'Tati-b',
    password: 'asdf123f',
    firstName: 'Tatyana',
    lastName: 'Baranova'
}
if (!localStorage.getItem('token')) {
    console.log('Токена нет', localStorage.getItem('token'));
    HTTPService.authRegister(user)
} else {
    console.log('Токен есть', localStorage.getItem('token'));
}

const root: HTMLElement | null = document.getElementById('root');
const outerWrapper = document.createElement('div')
const innerWrapper = document.createElement('div')
const footer = document.createElement('footer')
outerWrapper.classList.add('over-wrapper')
innerWrapper.classList.add('content-wrap', 'flex')
footer.classList.add('footer')


if (root) {
    const asideElement = new Aside(['Плейлист 1', 'Плейлист 2', 'Еще плейлист']).render()
    const headerElement = new Header('Татьяна Баранова').render()
    const mainContentElement = new MainContent().render()
    const playList = new PlayList()
    const playListSectionElement = playList.render()
    const playListElement = playList.getPlayList()
    const playListsArray = [
        new PlayListItem(1, 'Плейлист 1', 'img/playlists__1440%20(1).jpg', 33).render(),
        new PlayListItem(2, 'Плейлист 2', 'img/playlists__1440%20(1).jpg', 33).render(),
        new PlayListItem(3, 'Плейлист 3', 'img/playlists__1440%20(1).jpg', 33).render(),
        new PlayListItem(4, 'Плейлист 4', 'img/playlists__1440%20(1).jpg', 33).render(),
    ]
    const tracks = new Tracks()
    const tracksSectionElement = tracks.render()
    const trackListElement = tracks.getTrackList()
    const modalPlaylist = new ModalPlaylist()
    const modalPlaylistElement = modalPlaylist.render()
    const modalPlaylistContent = modalPlaylist.getModalPlayListContent()
    const modalPlayListFooterContent = modalPlaylist.getModalPlayListFooterContent()
    const modalPlaylistArray = [
        new ModalPlayListItem('Плейлист 2', 'img/playlists__1440%20(1).jpg', 33, 1).render(),
        new ModalPlayListItem('Плейлист 3', 'img/playlists__1440%20(1).jpg', 3, 2).render(),
        new ModalPlayListItem('Плейлист 4', 'img/playlists__1440%20(1).jpg', 13, 3).render(),
        new ModalPlayListItem('Плейлист 1', 'img/playlists__1440%20(1).jpg', 43, 4).render(),
    ]
    const tracksArray = [
        new TrackItem(1, 'Girl', 'LP', 'BlaBla', 'img/tracks%20(1).jpg', '#', '6 дней назад', false, '21:20').render(),
        new TrackItem(2, 'Track', 'LP', 'BlaBla', 'img/tracks%20(2).jpg', '#', '7 дней назад', false, '01:20').render(),
        new TrackItem(3, 'Track2', 'LP', 'Song', 'img/tracks%20(1).jpg', '#', '5 дней назад', true, '05:20').render(),
        new TrackItem(5, 'Girl', 'LP', 'BlaBla', 'img/tracks%20(1).jpg', '#', '6 дней назад', true, '03:30').render(),
        new TrackItem(6, 'Girl', 'LP', 'BlaBla', 'img/tracks%20(1).jpg', '#', '6 дней назад', true, '01:20').render(),
    ]
    const playerItem = new Player('Title', 'Slack', 'img/tracks%20(1).jpg', true).render()

    if (modalPlaylistElement && modalPlaylistElement as HTMLElement) {
        modalPlaylistArray.forEach(item => modalPlaylistContent.appendChild(item))
        modalPlaylistElement.appendChild(modalPlaylistContent)
        modalPlaylistElement.appendChild(modalPlayListFooterContent)
        root.appendChild(modalPlaylistElement)
    }
    if (headerElement && headerElement as HTMLElement) {
        outerWrapper.appendChild(headerElement)
    }
    if (asideElement && asideElement as HTMLElement) {
        innerWrapper.appendChild(asideElement)
    }
    if (mainContentElement && mainContentElement as HTMLElement) {
        //insert playlists      
        playListsArray.forEach(item => playListElement.appendChild(item))
        playListSectionElement.appendChild(playListElement)
        mainContentElement.appendChild(playListSectionElement)
        //insert tracks
        tracksArray.forEach(item => trackListElement.appendChild(item))
        tracksSectionElement.appendChild(trackListElement)
        mainContentElement.appendChild(tracksSectionElement)
        innerWrapper.appendChild(mainContentElement)
    }
    if (playerItem && playerItem as HTMLElement) {
        footer.appendChild(playerItem)
    }
    outerWrapper.appendChild(innerWrapper)
    root.appendChild(outerWrapper)
    root.appendChild(footer)
}