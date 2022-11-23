import { WalletStore } from 'features/wallet';
import { DebugStore } from 'features/debug';
import { MixStore } from 'features/mix';
import { ClaimAirdropStore } from 'features/claimAirdrop';
import { SongStore } from 'features/song';

class Store {
  wallet: WalletStore;

  debug: DebugStore;

  mix: MixStore;

  claimAirdrop: ClaimAirdropStore;

  song: SongStore;

  constructor() {
    this.wallet = new WalletStore();
    this.debug = new DebugStore();
    this.mix = new MixStore();
    this.claimAirdrop = new ClaimAirdropStore();
    this.song = new SongStore();
  }
}

export { Store };
