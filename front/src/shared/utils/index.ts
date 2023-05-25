import { get_song_colors_by_asset_id as getColorsByAssetID, COLORS as songColors } from './sdk';
import {
  play_song as playSong,
  set_volume as setVolume,
  render_song as renderSong,
  write_wav as writeWAV,
} from './audio';
import {
  radio_play as radioPlay,
  radio_stop as radioStop,
  radio_skip as radioSkip,
  radio_set_crossfade as radioSetCrossfade,
} from './radio';
import { new_resources as newResources, get_all_elements as getAllElements } from './resources';
import {
  get_song_id as getSongID,
  get_song_label as getSongLabel,
  get_song_colors as getSongColors,
  get_song_bpm as getSongBPM,
  get_song_chords as getSongChords,
  get_song_chord_names as getSongChordNames,
  get_song_meter as getSongMeter,
  get_song_tonality as getSongTonality,
  get_song_generation as getSongGeneration,
  get_song_asset_id as getSongAssetID,
  get_song_asset_url as getSongAssetURL,
  render_sheet as renderSheet,
  get_element_label as getElementLabel,
} from './music';
import {
  get_resource_by_id as getResourceByID,
  get_resource_by_asset_id as getResourceByAssetID,
  get_song_rarity_by_asset_id as getSongRarityByAssetID,
  get_mint_type as getMintType,
  get_mint_price as getMintPrice,
  get_mint_quantity as getMintQuantity,
  get_mintable_songs as getMintableSongs,
  get_chart as getChart,
} from './back_node';

export { authenticate, env } from './back_node';
export { types } from './types';
export { stop, play } from './audio';
export { colors } from './music';

export {
  newResources,
  getAllElements,
  getElementLabel,
  playSong,
  radioPlay,
  radioStop,
  radioSkip,
  radioSetCrossfade,
  getSongID,
  getSongLabel,
  getSongColors,
  getSongBPM,
  getSongChords,
  getSongChordNames,
  getSongMeter,
  getSongGeneration,
  getSongTonality,
  getSongAssetID,
  getSongAssetURL,
  getResourceByID,
  getResourceByAssetID,
  renderSheet,
  setVolume,
  renderSong,
  writeWAV,
  getColorsByAssetID,
  getSongRarityByAssetID,
  getMintType,
  getMintPrice,
  getMintQuantity,
  getMintableSongs,
  getChart,
  songColors,
};
