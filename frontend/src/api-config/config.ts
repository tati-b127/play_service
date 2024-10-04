import axios from "axios";
import { AuthReg } from "../types/interfaces/AuthReg"
// import { UserInfo } from "../types/interfaces/UserInfo"
import { TemplateTrack } from "../types/interfaces/TemplateTrack"
const URL_API = 'http://localhost:3000/api/'
// const TOKEN : string | null = localStorage.getItem('token')
class HTTPService {
    public static token: string | null = localStorage.getItem('token')
    public static tracks: TemplateTrack[] = []
    static getToken(): string | null {
        return this.token
    }
    static authRegister(body: AuthReg) {
        const response = axios(`${URL_API}auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json'
            },
            data: JSON.stringify(body)

        }).then(response => {
            if (response.status === 201 && response.data && response.data.access_token) {
                const userInfo = {
                    username: body.username,
                    password: body.password,
                    firstName: body.firstName,
                    lastName: body.lastName,
                    token: response.data.access_token
                }
                localStorage.setItem('userInfo', JSON.stringify(userInfo))
                localStorage.setItem('token', response.data.access_token)
                this.token = response.data.access_token
            }
        }).catch(error => {
            console.log(error);
        })
        return response
    }
    static getPlaylists() {
        const response = axios(`${URL_API}users/playlists`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.token
            },
        }).then(response => {
            if (response.status === 200 && response.data && response.data.length > 0) {
                return response.data
            }

        }).catch(error => {
            console.log(error);
        })
        return response

    }
    static createPlaylist(name: string) {
        const namePlaylist = { name: name }
        try {
            const response = axios(`${URL_API}playlists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                },
                data: JSON.stringify(namePlaylist)

            }).then(response => {
                if (response.status === 200 && response.data && response.data.length > 0) {
                    return response.data
                }

            }).catch(error => {
                console.log(error);
            })
            console.log(response);

            return response

        } catch (e) {
            console.log(e)
            throw new Error('Плейлист не создан')
        }
    }
    static getCurrentPlaylistTracks(id: string) {
        try {
            const response = axios(`${URL_API}playlists/${id}/songs`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                },

            }).then(response => {
                if (response.status === 200 && response.data && response.data.length > 0) {
                    return response.data
                }

            }).catch(error => {
                console.log(error);
            })
            console.log(response);

            return response

        } catch (e) {
            console.log(e)
            throw new Error('Плейлист не создан')
        }
    }
    static addToPlaylist(idPlayList: number, idTrack: number) {
        try {
            const response = axios(`${URL_API}playlists/${idPlayList}/add/${idTrack}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                }

            }).then(response => {
                if (response.status === 200 && response.data && response.data.length > 0) {
                    return response.data
                }

            }).catch(error => {
                console.log(error);
            })
            console.log(response);

            return response

        } catch (e) {
            console.log(e)
            throw new Error('Плейлист не создан')
        }
    }
    static addLike(idTrack: number) {
        try {
            const response = axios(`${URL_API}songs/${idTrack}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                }

            }).then(response => {
                if (response.status === 200 && response.data && response.data.length > 0) {
                    return response.data
                }

            }).catch(error => {
                console.log(error);
            })
            console.log(response);

            return response

        } catch (e) {
            console.log(e)
            throw new Error('Лайк не добавлен')
        }
    }
    static removeLike(idTrack: number) {
        try {
            const response = axios(`${URL_API}songs/${idTrack}/unlike`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                }

            }).then(response => {
                if (response.status === 200 && response.data && response.data.length > 0) {
                    return response.data
                }

            }).catch(error => {
                console.log(error);
            })
            console.log(response);

            return response

        } catch (e) {
            console.log(e)
            throw new Error('Лайк не добавлен')
        }
    }

    static removeFromPlaylist(idPlayList: number, idTrack: number) {
        try {
            const response = axios(`${URL_API}playlists/${idPlayList}/remove/${idTrack}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                }

            }).then(response => {
                console.log(response);
                if (response.status === 200 && response.data && response.data.length > 0) {
                    
                    return response.data
                }

            }).catch(error => {
                console.log(error);
            })
            console.log(response);

            return response

        } catch (e) {
            console.log(e)
            throw new Error('Плейлист не создан')
        }
    }
    static async getTracks() {
        await this.loadTracks();
        return this.tracks
    }
    static async loadTracks() {
        try {
            await axios(`${URL_API}songs`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.token}`

                }
            })
                .then(response => {
                    if (response.status === 200 && response.data && response.data.length > 0) {
                        this.tracks = response.data
                        // console.log(this.tracks);
                    }

                }).catch(error => {
                    console.log(error);
                })
        } catch {
            throw new Error('Нет токена')
        }
    }
    static async loadLikeTracks(username: string) {
        try {
            const response = axios(`${URL_API}users/${username}/likes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                },

            }).then(response => {
                console.log(response);
                if (response.status === 200 && response.data.songLikes && response.data.songLikes.length > 0) {
                    
                    return response.data.songLikes
                }

            }).catch(error => {
                console.log(error);
            })
            console.log(response);

            return response

        } catch (e) {
            console.log(e)
            throw new Error('Треков нет')
        }
    }

}
export { HTTPService }