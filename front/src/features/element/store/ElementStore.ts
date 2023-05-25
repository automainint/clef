import { action, makeObservable, observable, runInAction } from 'mobx';

import { Api } from 'api';
import { ElementResource, ElementType, User } from 'shared/types';
import { getAllElements } from 'shared/utils';

class ElementStore {
  private api = new Api();

  selectedToMint: ElementType | null = null;

  newMintedElement: ElementResource | null = null;

  isMintPending: boolean = false;

  constructor() {
    makeObservable(this, {
      selectedToMint: observable,
      newMintedElement: observable,
      isMintPending: observable,
      mint: action.bound,
      selectToMint: action.bound,
      resetNewMintedElement: action.bound,
    });
  }

  mint = async (user: User) => {
    try {
      if (this.selectedToMint === null) return;
      runInAction(() => {
        this.isMintPending = true;
      });
      // mint element
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
      const elements: ElementResource[] = getAllElements();
      // fetch element
      runInAction(() => {
        [this.newMintedElement] = elements; // save new element
        this.selectedToMint = null;
        this.isMintPending = false;
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  };

  selectToMint(selectedElement: ElementType) {
    this.selectedToMint = selectedElement;
  }

  resetNewMintedElement() {
    this.newMintedElement = null;
  }
}

export { ElementStore };
