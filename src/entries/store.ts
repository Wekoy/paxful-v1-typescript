import { Trade } from './trade';

export type Store = {
  trades: {
    items: Array<Trade>,
    isLoading: boolean,
    errors: Array<string>,
    isSendingMessage: boolean,
  },
  account: string,
  currentTrade: {
    item: Trade,
    isLoading: boolean,
    errors: Array<string>,
  },
};
