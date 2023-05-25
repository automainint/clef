import { action, makeObservable, observable, runInAction } from 'mobx';
import * as Tone from 'tone';

import { Api } from 'api';
import {
  isSong,
  isSongType,
  MintableSongWithInfo,
  OrderedChartList,
  OrderedSongWithLikes,
  Resources,
  Song,
  SongPassport,
  SongWithType,
  User,
} from 'shared/types';
import {
  getSongAssetID,
  getSongAssetURL,
  getSongBPM,
  getSongChordNames,
  getSongChords,
  getSongGeneration,
  getSongID,
  getSongLabel,
  getSongMeter,
  getSongTonality,
  renderSheet,
  renderSong,
  writeWAV,
} from 'shared/utils';
import { getInstruments, getScaleFormat, getTimeFormat } from '../utils';

class SongStore {
  private api = new Api();

  currentSong: Song | null = null;

  selectedToMint: Song | null = null;

  newMintedSong: Song | null = null;

  isMintPending: boolean = false;

  passport: SongPassport | null = null;

  rarity: number = 0;

  discImage: string = '';

  songWAV: string = '';

  mintableSongAssetIDs: string[] = [];

  mintableSongsWithInfo: MintableSongWithInfo[] = [];

  songsWithType: SongWithType[] = [];

  topList: OrderedChartList = [];

  topSongs: OrderedSongWithLikes[] = [];

  likesList: string[] = [];

  likesSongs: OrderedSongWithLikes[] = [];

  mustRefetchTopSongs: boolean = false;

  mustRefetchLikesSongs: boolean = false;

  constructor() {
    makeObservable(this, {
      currentSong: observable,
      selectedToMint: observable,
      newMintedSong: observable,
      isMintPending: observable,
      passport: observable,
      rarity: observable,
      discImage: observable,
      songWAV: observable,
      mintableSongAssetIDs: observable,
      mintableSongsWithInfo: observable,
      songsWithType: observable,
      topList: observable,
      topSongs: observable,
      likesList: observable,
      mustRefetchTopSongs: observable,
      mustRefetchLikesSongs: observable,
      fetchSong: action.bound,
      fetchPassport: action.bound,
      fetchSongRarity: action.bound,
      getMintableSongAssetIDs: action.bound,
      getNextMintableSongsWithInfo: action.bound,
      mint: action.bound,
      renderWAV: action.bound,
      saveSong: action.bound,
      saveDiscImage: action.bound,
      selectToMint: action.bound,
      resetNewMintedSong: action.bound,
      getNextSongsWithType: action.bound,
      getTopList: action.bound,
      getNextTopSongs: action.bound,
      getLikesList: action.bound,
      getNextLikesSongs: action.bound,
      like: action.bound,
      resetTopSongs: action.bound,
      resetLikesSongs: action.bound,
      setMustRefetchTopSongs: action.bound,
      setMustRefetchLikesSongs: action.bound,
    });
  }

  fetchSong = async (assetID: string) => {
    try {
      const data = await this.api.resourcesApi.fetchResourceByAssetID(assetID);
      runInAction(() => {
        if (data === null || isSong(data)) this.currentSong = data;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  fetchPassport = async () => {
    try {
      const id = getSongID(this.currentSong);
      const assetID = getSongAssetID(this.currentSong);
      const label = getSongLabel(this.currentSong);
      const tonality = await getSongTonality(this.currentSong);
      const songBPM = await getSongBPM(this.currentSong);
      const scale = getScaleFormat(await getSongMeter(this.currentSong));
      const generation = await getSongGeneration(this.currentSong);
      const url = getSongAssetURL(this.currentSong);
      const chordNames = await getSongChordNames(this.currentSong);
      const chords = await getSongChords(this.currentSong);

      const sheet = await renderSheet(this.currentSong);
      const time = getTimeFormat(sheet.duration);
      const instruments = getInstruments(sheet);
      runInAction(() => {
        this.passport = {
          id,
          asset_id: assetID,
          label,
          tonality,
          songBPM,
          scale,
          generation,
          url,
          chordNames,
          chords,
          time,
          instruments,
        };
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  fetchSongRarity = async (assetID: string) => {
    try {
      const data = await this.api.resourcesApi.fetchSongRarityByAssetID(assetID);
      runInAction(() => {
        this.rarity = data;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  getTopList = async () => {
    try {
      const data = await this.api.resourcesApi.fetchChart();
      if (data.length === 0) return;
      const orderedData = [{ ...data[0], order: 1 }];
      for (let i = 1; i < data.length; i += 1) {
        if (data[i].likes === orderedData[i - 1].likes) {
          orderedData.push({ ...data[i], order: orderedData[i - 1].order });
        } else {
          orderedData.push({ ...data[i], order: orderedData[i - 1].order + 1 });
        }
      }
      runInAction(() => {
        this.topList = orderedData;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  getLikesList = async (user: User) => {
    try {
      const data = await this.api.userApi.fetchLikes(user);
      runInAction(() => {
        this.likesList = data;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  getNextTopSongs = async (portion: number = 10) => {
    try {
      const lastItem = this.topSongs.length;
      const data = await Promise.all(
        this.topList.slice(lastItem, lastItem + portion).map(async ({ asset_id: assetID, likes, order }) => {
          const song = await this.api.resourcesApi.fetchResourceByAssetID(assetID);
          return { song, likes, order };
        })
      );
      const topSongs: OrderedSongWithLikes[] = data.filter<OrderedSongWithLikes>(
        (item): item is OrderedSongWithLikes => item.song === null || !isSong(item)
      );
      runInAction(() => {
        this.topSongs = [
          ...this.topSongs,
          ...topSongs.filter(
            ({ song: nextSong }) => !this.topSongs.some(({ song }) => getSongAssetID(nextSong) === getSongAssetID(song))
          ),
        ];
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  getNextLikesSongs = async (portion: number = 10) => {
    try {
      const lastItem = this.likesSongs.length;
      const data = await Promise.all(
        this.topList
          .filter(({ asset_id: assetID }) => this.likesList.includes(assetID))
          .slice(lastItem, lastItem + portion)
          .map(async ({ asset_id: assetID, likes, order }) => {
            const song = await this.api.resourcesApi.fetchResourceByAssetID(assetID);
            return { song, likes, order };
          })
      );
      const likesSongs: OrderedSongWithLikes[] = data.filter<OrderedSongWithLikes>(
        (item): item is OrderedSongWithLikes => item.song === null || !isSong(item)
      );
      runInAction(() => {
        this.likesSongs = [
          ...this.likesSongs,
          ...likesSongs.filter(
            ({ song: nextSong }) =>
              !this.likesSongs.some(({ song }) => getSongAssetID(nextSong) === getSongAssetID(song))
          ),
        ];
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  resetTopSongs() {
    this.topSongs = [];
  }

  resetLikesSongs() {
    this.likesSongs = [];
  }

  setMustRefetchTopSongs(mustRefetchChartSongs: boolean) {
    this.mustRefetchTopSongs = mustRefetchChartSongs;
  }

  setMustRefetchLikesSongs(mustRefetchChartSongs: boolean) {
    this.mustRefetchLikesSongs = mustRefetchChartSongs;
  }

  like = async (user: User, assetID: string) => {
    try {
      await this.api.userApi.like(user, assetID);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  getMintableSongAssetIDs = async () => {
    try {
      const data = await this.api.resourcesApi.fetchMintableSongAssetIDs();
      runInAction(() => {
        this.mintableSongAssetIDs = data;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  getNextMintableSongsWithInfo = async (portion: number = 9) => {
    try {
      const mintableSongsWithInfo: MintableSongWithInfo[] = [];
      const lastItem = this.mintableSongsWithInfo.length;
      await Promise.all(
        this.mintableSongAssetIDs.slice(lastItem, lastItem + portion).map(async (assetID) => {
          const song = await this.api.resourcesApi.fetchResourceByAssetID(assetID);
          if (song === null || !isSong(song)) return;
          const type = await this.api.resourcesApi.fetchMintTypeByAssetID(getSongAssetID(song));
          if (!isSongType(type)) return;
          const price = await this.api.resourcesApi.fetchMintPriceByAssetID(getSongAssetID(song));
          const quantity = await this.api.resourcesApi.fetchMintQuantityByAssetID(getSongAssetID(song));
          mintableSongsWithInfo.push({ song, type, price, quantity });
        })
      );
      runInAction(() => {
        this.mintableSongsWithInfo = [
          ...this.mintableSongsWithInfo,
          ...mintableSongsWithInfo.filter(
            ({ song: nextSong }) =>
              !this.mintableSongsWithInfo.some(({ song }) => getSongAssetID(nextSong) === getSongAssetID(song))
          ),
        ];
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  mint = async (user: User) => {
    try {
      if (this.selectedToMint === null) return;
      runInAction(() => {
        this.isMintPending = true;
      });
      const songID = await this.api.userApi.mintSongClone(user, this.selectedToMint);
      const mintedSong = await this.api.resourcesApi.fetchResourceByID(songID);
      runInAction(() => {
        if (mintedSong !== null && isSong(mintedSong)) this.newMintedSong = mintedSong;
        this.selectedToMint = null;
        this.isMintPending = false;
      });
    } catch (error) {
      runInAction(() => {
        this.selectedToMint = null;
        this.isMintPending = false;
      });
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  getNextSongsWithType = async (user: User) => {
    try {
      let data: Resources;
      if (this.songsWithType.length === 0) {
        data = await this.api.userApi.fetchResources(user, { filter: 'song', size: 8 });
      } else {
        data = await this.api.userApi.fetchResources(user, {
          filter: 'song',
          size: 4,
          after: getSongID(this.songsWithType[this.songsWithType.length - 1].song),
        });
      }
      const songsWithType: SongWithType[] = [];
      await Promise.all(
        data.map(async (song) => {
          if (!isSong(song)) return;
          if (this.songsWithType.some(({ song: s }) => getSongID(s) === getSongID(song))) return;
          const type = await this.api.resourcesApi.fetchMintTypeByAssetID(getSongAssetID(song));
          if (!isSongType(type)) return;
          songsWithType.push({ song, type });
        })
      );
      runInAction(() => {
        this.songsWithType = [...this.songsWithType, ...songsWithType];
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  renderWAV = async (song: Song) => {
    const outBytes: number[] = [];
    const buffer = await renderSong(Tone, song);
    writeWAV(buffer, (data: number[]) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const byte of data) outBytes.push(byte);
    });
    const array = new Uint8Array(outBytes);
    const blob = new Blob([array], { type: 'audio/wav' });
    this.songWAV = URL.createObjectURL(blob);
  };

  saveSong(song: Song) {
    this.currentSong = song;
  }

  saveDiscImage(discImage: string) {
    this.discImage = discImage;
  }

  selectToMint(selectedToMint: Song) {
    this.selectedToMint = selectedToMint;
  }

  resetNewMintedSong() {
    this.newMintedSong = null;
  }
}

export { SongStore };
