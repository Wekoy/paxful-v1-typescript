import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import ChangeUserButton from 'components/blocks/ChangeUserButton';
import Button from 'components/controls/Button';
import FromServer from 'components/blocks/FromServer';
import { Store } from 'entries/store';
import Rating from '../Rating';

import './style.css';
import UserAvatar from '../UserAvatar';

const DialogDetails: FC = () => {
  const currentTrade = useSelector((state: Store) => state.currentTrade.item);
  const {
    name,
    rating,
    avatar,
    isPaid,
    numberOfTrades,
    tradeHash,
  } = currentTrade;

  return (
    <>
      <div className="trades-dialogs__details-hearer">
        You are trading with <span>{name}</span>
        <div className="trades-dialogs__start-time">Started 23 minutes ago</div>
        <Button
          text="Release bitcoins"
          customClass="grin-btn medium"
          onClick={() => {
            console.log('Hello!');
          }}
          htmlType="button"
        />
      </div>
      <ul className="trades-dialogs__details-body">
        <li>
          <UserAvatar imageLink={avatar} />
          <Rating rating={rating} />
        </li>
        <li>
          <div className="trades-dialogs__details-title"># of trades</div>
          <div className="trades-dialogs__details-text">{numberOfTrades}</div>
        </li>
        <li>
          <div className="trades-dialogs__details-title">trade status</div>
          <span className={`trade-status ${isPaid ? 'paid' : null}`}>
            {isPaid ? 'paid' : 'not paid'}
          </span>
        </li>
        <li>
          <div className="trades-dialogs__details-title">trade hash</div>
          <div className="trades-dialogs__details-text">{tradeHash}</div>
        </li>
        <li>
          <div className="trades-dialogs__details-title">amount USD</div>
          <div className="trades-dialogs__details-text cost">25.00</div>
        </li>
        <li>
          <div className="trades-dialogs__details-title">amount BTC</div>
          <div className="trades-dialogs__details-text">0.00234524</div>
        </li>
      </ul>
      <div className="information-from-server">
        <FromServer />
      </div>
      <div className="trades-dialogs__change-user">
        <ChangeUserButton />
      </div>
    </>
  );
};

export default DialogDetails;
