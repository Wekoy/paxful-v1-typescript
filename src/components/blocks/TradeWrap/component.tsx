import React, { FC, ReactNode, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import setCurrentTrade from 'actions/currentTradeAction';
import getTradeById from 'selectors';
import isObjectEmpty from 'helper/isObjectEmpty';
import Loader from 'components/controls/Loader';
import { Store } from 'entries/store';
import { NOT_FOUND } from 'constants/index';

type Props = {
  children: ReactNode,
};

const TradeWrap: FC<Props> = ({ children }) => {
  const { id } = useParams();
  const receivedState = useSelector((state: Store) => state);
  const currentTrade = useSelector((state: Store) => state.currentTrade);

  const dispatch = useDispatch();

  const trade = getTradeById(receivedState, id);

  useEffect(() => {
    if (trade !== NOT_FOUND) {
      dispatch(setCurrentTrade(trade, currentTrade.item.id));
    }
  }, [dispatch, trade, currentTrade.item.id]);

  if (trade === NOT_FOUND && receivedState.trades.items.length > 0) {
    return <Redirect to={`/${receivedState.trades.items[0].id}`} />;
  }

  if (isObjectEmpty(currentTrade.item)) return <Loader />;

  return (
    <div className="trade-message-box__info">
      {currentTrade.isLoading && !isObjectEmpty(currentTrade.item) ? (
        <Loader />
      ) : null}
      {children}
    </div>
  );
};
export default TradeWrap;
