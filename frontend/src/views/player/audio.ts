import { Howl } from 'howler';
import { TemplateTracks } from '../../types/interfaces/TemplateTracks';
const currentVolume: number = 0.5
class AudioPlayer {
    public sound: Howl | null = null;
    private isPlaying: boolean = false;
    private isSeeking: boolean = false;
    private isLooping: boolean = false;
    private isShuffling: boolean = false;
    private playlist: TemplateTracks[] = [];
    private currentTrackIndex: number = 0;
    private svgPlay: HTMLElement;
    private svgPause: HTMLElement;
    private timeInterval: number | null = null;

    constructor(private id: number, private audioSrc: TemplateTracks[], private btnPlay: HTMLElement, private btnSkipBack: HTMLElement, private btnSkipNext: HTMLElement, private btnShaffles: HTMLElement, private btnRepeat: HTMLElement, private volume: HTMLInputElement, private currentTime: HTMLElement, private duration: HTMLElement, private timeStep: HTMLInputElement, private autoPlay?: boolean,) {
        this.id = id;

        this.autoPlay = autoPlay;
        this.playlist = audioSrc;
        this.btnPlay = btnPlay;
        this.btnSkipBack = btnSkipBack;
        this.btnSkipNext = btnSkipNext;
        this.btnShaffles = btnShaffles;
        this.btnRepeat = btnRepeat;
        this.volume = volume;
        this.audioSrc = audioSrc;
        this.currentTrackIndex = this.playlist.findIndex((track: TemplateTracks) => track.id === this.id);
        this.currentTime = currentTime;
        this.duration = duration;
        this.timeStep = timeStep;
        const [svgPause, svgPlay] = this.btnPlay.children;
        this.svgPlay = svgPlay as HTMLElement;
        this.svgPause = svgPause as HTMLElement;
        this.loadTrack(this.currentTrackIndex, this.autoPlay);

        this.initListeners();

    }

    loadTrack(index: number, autoPlay?: boolean): void {
        this.currentTrackIndex = index;
        if (this.sound) {
            this.isPlaying = false;
            this.sound.stop();
            this.sound.unload();
            this.sound = null;
        }
        // const srcTrack = this.playlist.find((track: TemplateTracks) => this.playlist[index] === index)
        const srcTrack = this.playlist[this.currentTrackIndex];
        if (srcTrack) {
            this.sound = new Howl({
                html5: true,
                autoplay: autoPlay || false,
                src: [srcTrack?.src],
                volume: currentVolume,
                onplay: () => this.updateTime(),
                onpause: () => this.isPlaying = false,
                onend: () => this.onTrackEnd(),
            });
            if (autoPlay) {
                this.isPlaying = true;
                this.svgPlay.classList.remove('hidden');
                this.svgPause.classList.add('hidden');
            }
            this.sound.on('seek', () => this.updateTime());

        }

    }
    togglePlayPause(): void {
        if (this.sound) {

            if (this.isPlaying) {
                this.sound.pause();
                this.svgPause.classList.remove('hidden');
                this.svgPlay.classList.add('hidden');
            } else {
                this.sound.play();

                this.svgPlay.classList.remove('hidden');
                this.svgPause.classList.add('hidden');

            }
            this.isPlaying = !this.isPlaying;
        }
    }

    updateVolume(volume: number): void {
        if (this.sound)
            this.sound.volume(volume);
    }

    onTrackEnd(): void {
        if (this.isLooping && this.sound) {
            this.sound.play();
        } else {
            this.skipNext();
        }
    }

    skipBack(): number {
        let id: number = 0
        if (this.sound) {
            this.sound.stop();
            this.sound.unload();
            this.isPlaying = false
            this.sound = null
        }
        this.svgPlay.classList.add('hidden');
        this.svgPause.classList.remove('hidden');
        if (this.currentTrackIndex === 0) {
            // this.loadTrack(this.playlist.length - 1, true);
            id = (this.playlist[this.playlist.length - 1]?.id) as number
        } else {
            id = this.playlist[this.currentTrackIndex - 1]?.id as number
        }
        return id

    }

    skipNext(): number {
        let id: number = 0
        if (this.sound && this.sound.playing()) {
            this.sound.stop();
            this.sound.unload();
            this.isPlaying = false
            this.sound = null
        }
        ;
        if (this.isShuffling) {
            this.shuffleTrack();
        } else if (this.currentTrackIndex === this.playlist.length - 1) {
            // this.loadTrack(0, true);
            id = this.playlist[0]?.id as number
        } else {
            id = this.playlist[this.currentTrackIndex + 1]?.id as number
        }
        return id
        // return this.currentTrackIndex + 1 as number
    }

    toggleLoop(): void {
        this.isLooping = !this.isLooping;
        this.btnRepeat.classList.toggle('active', this.isLooping);
    }

    toggleShuffle(): void {
        this.isShuffling = !this.isShuffling;
        this.btnShaffles.classList.toggle('active', this.isShuffling);
    }

    private shuffleTrack(): void {
        const randomIndex = Math.floor(Math.random() * this.playlist.length);
        this.loadTrack(randomIndex);
    }

    private updateTime(): void {
        if (this.sound) {
            const duration = this.sound.duration();
            this.duration.innerText = `${this.formatTime(duration)}`;

            if (this.timeInterval) {
                clearInterval(this.timeInterval);
            }
            this.timeInterval = window.setInterval(() => {
                if (!this.isPlaying || this.isSeeking) {
                    clearInterval(this.timeInterval!);
                    this.timeInterval = null;
                    return;
                }
                if (this.sound) {
                    const currentTime = this.sound.seek() as number;
                    this.currentTime.innerText = `${this.formatTime(currentTime)}`;
                    this.timeStep.value = (currentTime / duration * 100).toString();

                }

            }, 100);
        }

    }

    // private resetProgress(): void {
    //     const [svgPause, svgPlay] = this.btnPlay.children;
    //     svgPlay.classList.add('hidden');
    //     svgPause.classList.remove('hidden');
    //     this.isPlaying = false;
    //     this.timeStep.value = "0";
    //     this.currentTime.innerText = `0:00}`;
    // }

    private formatTime(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    private initListeners(): void {
        this.volume.addEventListener('input', (event: Event) => {
            const target = event.target as HTMLInputElement;
            this.updateVolume(parseFloat(target.value));
        });

        this.timeStep.addEventListener('input', (event: Event) => {
            this.isSeeking = true;
            const target = event.target as HTMLInputElement;
            if (this.sound) {
                const duration = this.sound.duration();
                const seekTo = (parseFloat(target.value) / 100) * duration;
                this.currentTime.innerText = `${this.formatTime(seekTo)}`;
            }
        });

        this.timeStep.addEventListener('change', (event: Event) => {
            this.isSeeking = false;
            const target = event.target as HTMLInputElement;
            if (this.sound) {
                const duration = this.sound.duration();
                const seekTo = (parseFloat(target.value) / 100) * duration;
                this.sound.seek(seekTo);
            }
        });

    }
}


export { AudioPlayer }
