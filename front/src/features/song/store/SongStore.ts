import { action, makeObservable, observable, runInAction } from 'mobx';
import * as Tone from 'tone';

import { Api } from 'api';
import { isSong, Song, Turntable } from 'shared/types';
import { getSongID, playSong, setVolume, stop } from 'shared/utils';

class SongStore {
  private api = new Api();

  song: Song | null = null;

  turntable: Turntable = [];

  volume: number = 1.0;

  discImage: string = '';

  constructor() {
    makeObservable(this, {
      song: observable,
      turntable: observable,
      volume: observable,
      discImage: observable,
      fetchSong: action.bound,
      playSong: action.bound,
      stopSong: action.bound,
      setVolume: action.bound,
      saveDiscImage: action.bound,
    });
  }

  fetchSong = async (id: string) => {
    try {
      const data = await this.api.resourcesApi.fetchResourceByID(id);
      runInAction(() => {
        if (data === null || isSong(data)) this.song = data;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  playSong(song: Song) {
    setVolume(this.volume);
    this.turntable = [...this.turntable, { song, status: 'RENDERING' }];
    playSong(Tone, JSON.parse(JSON.stringify(song)), () => {
      runInAction(() => {
        this.turntable = [
          ...this.turntable.filter((item) => getSongID(item.song) !== getSongID(song)),
          { song, status: 'PLAYING' },
        ];
      });
    }).then(() => {
      runInAction(() => {
        this.turntable = this.turntable.filter((item) => getSongID(item.song) !== getSongID(song));
      });
    });
  }

  stopSong(song: Song) {
    stop(Tone);
    this.turntable = this.turntable.filter((item) => getSongID(item.song) !== getSongID(song));
  }

  setVolume(value: number) {
    setVolume(value);
    this.volume = value;
  }

  saveDiscImage(discImage: string) {
    this.discImage = discImage;
    console.log(this.discImage);
  }
}

export { SongStore };
