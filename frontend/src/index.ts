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
import { AudioPlayer } from './views/player/audio'
// import { Audio } from "./views/player/audio";
// import axios from 'axios'
import { TemplateTrack } from './types/interfaces/TemplateTrack'
import { PlayListResponceFormat } from './types/interfaces/PlayListResponceFormat'
import { PlayListFormat } from './types/interfaces/PlayListFormat'
import { TemplateTracks } from './types/interfaces/TemplateTracks'
// import { audio as audio } from "../static/The%20Weeknd%20Call%20Out%20My%20Name.mp3";
console.log('Hello World!');

class PlayerInit {
    private root: HTMLElement | null = document.getElementById('root');
    private outerWrapper: HTMLElement = document.createElement('div')
    private innerWrapper: HTMLElement = document.createElement('div')
    private mainContentElement: HTMLElement = new MainContent().render()
    private footer: HTMLElement = document.createElement('footer')
    private asideElement: HTMLElement | null = null

    private btnSearchElement: HTMLElement | null = null
    private btnTracksElement: HTMLElement | null = null
    private btnPlaylistsElement: HTMLElement | null = null
    private btnFavoriteElement: HTMLElement | null = null

    private currentTrack: TemplateTrack | undefined
    private playerAudio: AudioPlayer | null = null


    private user = {
        username: 'Tati-b' + (Math.random() * 1000).toFixed(0),
        password: 'asdf123f',
        firstName: 'Tatyana',
        lastName: 'Baranova'
    }
    private trackAPI: TemplateTrack[] | null = null
    private tracksArray: HTMLElement[] = []
    private myPlayList: PlayListResponceFormat | null = null
    private myPlayLists: PlayListFormat[] = []

    constructor() {


    }

    async init() {

        this.outerWrapper.classList.add('over-wrapper')
        this.innerWrapper.classList.add('content-wrap', 'flex')
        this.footer.classList.add('footer')
        if (this.root) {
            await this.checkUserData()
            await this.createSideBar()
            if (this.btnTracksElement && this.btnTracksElement as HTMLElement) {

                this.showTracks(this.btnTracksElement)
                this.btnTracksElement.addEventListener("click", async () => {
                    await this.loadData(HTTPService.getTracks())
                    this.showTracks(this.btnTracksElement as HTMLElement)
                })
            }
            if (this.trackAPI) {
                this.createPlayer(1, this.trackAPI)
            }
            this.createModalPlayList()
            this.outerWrapper.appendChild(this.innerWrapper)
            this.root.appendChild(this.outerWrapper)
            this.root.appendChild(this.footer)
            const btnsPlayLists = document.querySelectorAll('.aside__tabs-btn-playlist')
            if (btnsPlayLists) {
                btnsPlayLists.forEach(btn => {
                    btn.addEventListener('click', async () => {
                        const playListId = btn.id.split('-')[1].toString()
                        await this.loadData(HTTPService.getCurrentPlaylistTracks(playListId), playListId)
                        this.showTracks(btn as HTMLElement)
                    })
                })
            }


        }

    }
    async checkUserData() {
        if (!HTTPService.getToken()) {
            console.log('Токена нет', HTTPService.getToken());
            await HTTPService.authRegister(this.user).then(async () => {
                console.log('Регистрация прошла успешно');

                await this.loadData(HTTPService.getTracks())
            })

        } else if (HTTPService.getToken()) {
            console.log('Токен есть', HTTPService.getToken());
            await this.loadData(HTTPService.getTracks())
        }

    }
    async loadData(tracks: Promise<TemplateTrack[] | null>, playListId?: string) {
        this.trackAPI = await tracks
        console.log(this.trackAPI);

        if (this.trackAPI) {
            this.tracksArray = []
            this.trackAPI.forEach(track => {
                let trackItem: HTMLElement
                if (playListId) {
                    trackItem = new TrackItem(track.id, track.name, track.artist.name, track.album.name, track.image, track.path, track.createdAt, this.getTrackIsLike(track), track.duration, playListId).render()
                } else {
                    trackItem = new TrackItem(track.id, track.name, track.artist.name, track.album.name, track.image, track.path, track.createdAt, this.getTrackIsLike(track), track.duration).render()
                }
                trackItem.addEventListener('click', (e) => {
                    e.preventDefault();

                    if (e.target === trackItem.querySelector('a[href]')) {
                        if (this.playerAudio && this.playerAudio.sound) {
                            this.playerAudio.sound.stop()
                            this.playerAudio.sound.unload()
                            this.playerAudio.sound = null
                            this.playerAudio = null
                        }
                        if (this.trackAPI) {

                            this.createPlayer(track.id, this.trackAPI, true)
                        }
                    } else if (e.target === trackItem.querySelector('.track__like-btn')) {
                        // console.log(e.target);
                        //ajax like
                        //if player contain track, change player

                    }
                })
                this.tracksArray.push(trackItem)

            })

        } else {
            this.tracksArray = []
            const trackItem = document.createElement('div')
            trackItem.innerHTML = 'Здесь пока нет треков'
            this.tracksArray.push(trackItem)
        }
    }
    async createSideBar() {
        const userInfo = localStorage.getItem('userInfo')
        this.myPlayLists = await HTTPService.getPlaylists()
        console.log(this.myPlayLists);
        if(!this.myPlayLists){
                this.myPlayList = await HTTPService.createPlaylist(`Мой плейлист ${(Math.random() * 1000).toFixed(0)}`)
                this.myPlayLists = await HTTPService.getPlaylists()
        }
        if (this.myPlayLists && this.myPlayLists.length > 0 && userInfo) {
            this.asideElement = new Aside(this.myPlayLists).render()
            this.btnSearchElement = Aside.getBtnSearch()
            this.btnTracksElement = Aside.getBtnTracks()
            this.btnPlaylistsElement = Aside.getBtnPlaylists()
            this.btnFavoriteElement = Aside.getBtnFavorite()
            const userName = JSON.parse(userInfo).username
            const headerElement = new Header(userName).render()
            if (this.btnPlaylistsElement && this.btnTracksElement && this.btnFavoriteElement) {
                this.btnFavoriteElement.addEventListener("click", async () => {
                    console.log(userName);

                    await this.loadData(HTTPService.loadLikeTracks(userName));
                    this.showTracks(this.btnFavoriteElement as HTMLElement)
                }
                )
                this.btnPlaylistsElement.addEventListener('click', async () => {
                    this.myPlayLists = await HTTPService.getPlaylists()
                    this.showPlayLists(this.btnPlaylistsElement as HTMLElement)
                })
                this.btnTracksElement.addEventListener('click', () => this.showTracks(this.btnTracksElement as HTMLElement))
            }


            this.outerWrapper.appendChild(headerElement)
            this.innerWrapper.appendChild(this.asideElement)
        } 
    }
    showPlayLists(btnPlaylistsElement: HTMLElement) {
        const playList = new PlayList()
        const playListSectionElement = playList.render()
        const playListElement = playList.getPlayList()
        const playListsArray: HTMLElement[] = []
        this.myPlayLists.forEach(playlist => {

            playListsArray.push(new PlayListItem(playlist.id, playlist.name, playlist.songs.length).render())
        })
        this.removeActiveClasses()
        this.showMainSectionElement(btnPlaylistsElement, playListSectionElement, playListElement, playListsArray)
    }
    showTracks(btnTracksElement: HTMLElement) {

        const tracks = new Tracks()
        const tracksSectionElement = tracks.render()
        const trackListElement = tracks.getTrackList()

        this.removeActiveClasses()
        this.showMainSectionElement(btnTracksElement, tracksSectionElement, trackListElement, this.tracksArray)
    }
    removeActiveClasses() {
        document.querySelectorAll('section').forEach(item => item.classList.remove('section--active'))
        document.querySelectorAll('.aside__btn-active').forEach(item => item.classList.remove('aside__btn-active'))
    }
    showMainSectionElement(btn: HTMLElement, section: HTMLElement, elem: HTMLElement, array: HTMLElement[]) {
        this.removeActiveClasses()
        if (btn && !btn.classList.contains('aside__btn-active')) {

            btn.classList.add('aside__btn-active')
        }
        array.forEach(item => elem.appendChild(item))
        section.appendChild(elem)
        section.classList.add('section--active')
        this.mainContentElement.appendChild(section)
        this.innerWrapper.appendChild(this.mainContentElement)
    }
    createPlayer(id: number, trackAPI: TemplateTrack[], autoPlay: boolean = false) {
        const localhost: string = 'http://localhost:3000'
        this.trackAPI = trackAPI
        const tracksSRC = this.trackAPI?.map(track => {
            const item: TemplateTracks = {
                id: track.id,
                artist: track.artist.name,
                img: track.image,
                src: localhost + track.path
            }
            return item

        })

        if (this.trackAPI && this.trackAPI.find(track => track.id === id)) {
            this.currentTrack = this.trackAPI.find(track => track.id === id)
        }
        if (this.currentTrack && tracksSRC) {
            this.footer.innerHTML = ''
            const isLike = this.getTrackIsLike(this.currentTrack)
            const playerItem = new Player(this.currentTrack?.id, tracksSRC, this.currentTrack?.name, this.currentTrack?.artist.name, this.currentTrack?.album.name, this.currentTrack?.duration, this.currentTrack?.image, this.currentTrack?.path, isLike).render()
            const btnPlay = Player.getBtnPlay()
            const btnNext = Player.getBtnSkipNext()
            const btnBack = Player.getBtnSkipBack()
            const btnShaffles = Player.getBtnShaffles()
            const btnRepeat = Player.getBtnRepeat()
            const playerVolume = Player.getPlayerValueRange()
            const playerCurrentTime = Player.getPlayerCurrentTime()
            const playerEndTime = Player.getPlayerEndTime()
            const playerTimestep = Player.getPlayerTimestep()
            this.playerAudio = new AudioPlayer(id, tracksSRC, btnPlay, btnBack, btnNext, btnShaffles, btnRepeat, playerVolume, playerCurrentTime, playerEndTime, playerTimestep, autoPlay)
            let thisID: number
            this.footer.appendChild(playerItem)

            if (this.playerAudio && this.trackAPI) {
                btnPlay.addEventListener('click', () => {
                    this.playerAudio?.togglePlayPause()
                })
                btnBack.addEventListener('click', () => {
                    thisID = this.playerAudio?.skipBack() as number
                    if (this.playerAudio && this.playerAudio.sound) {
                        this.playerAudio.sound.stop()
                        this.playerAudio.sound.unload()
                        this.playerAudio.sound = null
                        this.playerAudio = null
                    }
                    if (thisID && this.trackAPI) {
                        this.createPlayer(thisID as number, this.trackAPI, true)
                    }
                });
                btnNext.addEventListener('click', () => {
                    thisID = this.playerAudio?.skipNext() as number
                    if (this.playerAudio && this.playerAudio.sound) {
                        this.playerAudio.sound.stop()
                        this.playerAudio.sound.unload()
                        this.playerAudio.sound = null
                        this.playerAudio = null
                    }
                    if (thisID && this.trackAPI) {
                        this.createPlayer(thisID as number, this.trackAPI, true)
                    }
                });
                btnShaffles.addEventListener('click', () => this.playerAudio?.toggleShuffle());
                btnRepeat.addEventListener('click', () => this.playerAudio?.toggleLoop());

            }
            this.playerAudio.sound?.on('end', () => {
                thisID = this.playerAudio?.skipNext() as number
                if (this.playerAudio && this.playerAudio.sound) {
                    this.playerAudio.sound.stop()
                    this.playerAudio.sound.unload()
                    this.playerAudio.sound = null
                    this.playerAudio = null
                }

                this.createPlayer(thisID as number, trackAPI, true)

            })
        }
    }
    getCurrentUserInfo() {
        const userInfo = localStorage.getItem('userInfo')
        if (userInfo) {
            return JSON.parse(userInfo)
        }
    }
    getTrackIsLike(trackItem: TemplateTrack): boolean {
        const userName = this.getCurrentUserInfo().username
        let isLike: boolean = false

        if (userName) {
            isLike = trackItem.likes.some(like => like.username === userName)
        }
        return isLike
    }
    createModalPlayList() {
        const modalPlaylist = new ModalPlaylist()
        const modalPlaylistElement = modalPlaylist.render()
        const modalPlaylistContent = modalPlaylist.getModalPlayListContent()
        const modalPlayListFooterContent = modalPlaylist.getModalPlayListFooterContent()
        if (this.myPlayLists && this.myPlayLists.length > 0) {
            this.myPlayLists.forEach(playlist => modalPlaylistContent.appendChild(new ModalPlayListItem(playlist.id, playlist.name, playlist.songs.length).render()))
        }
        modalPlaylistElement.appendChild(modalPlaylistContent)
        modalPlaylistElement.appendChild(modalPlayListFooterContent)
        if (this.root) {
            this.root.appendChild(modalPlaylistElement)
        }
    }

}
new PlayerInit().init()
