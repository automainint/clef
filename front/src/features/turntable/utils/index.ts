import { PlayableResource } from 'shared/types';
import { getSongID } from 'shared/utils';

export const getID = (playableResource: PlayableResource) =>
  //  get_song_id should work for both song or element.
  //  However, better to add different function for elements,
  //  or change function name to get_resource_id. - Mitya Selivanov
  getSongID(playableResource);
