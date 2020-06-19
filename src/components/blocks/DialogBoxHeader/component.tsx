import React, { FC, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import setCurrentTrade from 'actions/currentTradeAction';
import { deleteTrade } from 'actions/tradesActions';
import { Store } from 'entries/store';
import { Trade } from 'entries/trade';
import Rating from '../Rating';

import './style.css';

const DialogBoxHeader: FC = () => {
  const { id } = useParams();
  const { push } = useHistory();
  const dispatch = useDispatch();
  const trades = useSelector((state: Store) => state.trades.items);
  // Filter values to exclude the current element,
  // since it doesn't need to be considered when deleting it
  const filteredTrades = trades.filter((item: Trade) => item.id !== id);
  const currentTrade = useSelector((state: Store) => state.currentTrade.item);

  const { name, payMethod, rating } = currentTrade;

  const handleDeleteTrade = useCallback(() => {
    if (filteredTrades.length > 0) {
      dispatch(deleteTrade(id));
      dispatch(setCurrentTrade(filteredTrades[0], currentTrade.id));
      push(`/${filteredTrades[0].id}`);
    } else {
      alert('It`s the last element. You can`t delete it!');
    }
  }, [id, currentTrade.id, dispatch, filteredTrades, push]);

  return (
    <div className="trades-dialogs__header">
      <span
        className="trash-dialog"
        onClick={handleDeleteTrade}
        role="button"
        tabIndex={0}
      >
        <img src={`${process.env.PUBLIC_URL}/img/bin.png`} alt="" />
      </span>
      <div className="trades-dialogs__header-title">{payMethod}</div>
      <div className="trades-dialogs__header-info">
        <span className="trades-dialogs__header-name">{name}</span>
        <Rating rating={rating} />
      </div>
    </div>
  );
};

export default DialogBoxHeader;
