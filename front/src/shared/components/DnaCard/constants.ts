import { ResourceType } from 'shared/types';

export const messages: {
  [key in ResourceType]?: {
    title: string;
    desc: string;
  };
} = {
  hybrid: {
    title: 'Your new mix is ready',
    desc: 'The new mix is added to your library',
  },
  song: {
    title: 'You got a brand new Song!',
    desc: 'The song is added to your wallet',
  },
  vibe: {
    title: 'You got a brand new Vibe!',
    desc: 'The element is added to your wallet',
  },
  chord: {
    title: 'You got a brand new Chord!',
    desc: 'The element is added to your wallet',
  },
  beat: {
    title: 'You got a brand new Beat!',
    desc: 'The element is added to your wallet',
  },
} as const;
