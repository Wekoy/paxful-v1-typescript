import { createSelector } from 'reselect';
import { Store } from 'entries/store';
import { Trade } from 'entries/trade';
import { NOT_FOUND } from 'constants/index';

const trades = (state: Store, id: string) => ({
  items: state.trades.items,
  id,
});

const getTradeById = createSelector([trades], ({ items, id }) => {
  const trade = items.find((trade: Trade) => trade.id === id);

  if (!trade) {
    return NOT_FOUND;
  }

  return trade;
});

export default getTradeById;
