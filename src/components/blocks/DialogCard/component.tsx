import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { BUYER_TYPE } from 'constants/account';
import UserAvatar from '../UserAvatar';
import { Trade } from 'entries/trade';
import { Store } from 'entries/store';

import './style.css';

type Props = {
  item: Trade,
  isActive: string,
};

const DialogCard: FC<Props> = ({ item, isActive }) => {
  let cardClasses = '';
  const {
    isPaid,
    avatar,
    interlocutorAvatar,
    payMethod,
    name,
    newMessage,
  } = item;
  const account = useSelector<Store, string>((state) => state.account);
  const avatarImgLink = account === BUYER_TYPE ? interlocutorAvatar : avatar;
  const shallowCopyNewMessages: { [key: string]: boolean } = newMessage;

  if (isActive) cardClasses += ' active';
  if (shallowCopyNewMessages[account]) cardClasses += ' new-message';

  return (
    <>
      <li className={`trades-card${cardClasses}`}>
        <div className="trades-card__info">
          <div className="trades-card__how-buy">
            {name} <span>is buying</span>
          </div>
          <div className="trades-card__pay-method">{payMethod}</div>
          <div className="trades-card__purchase-rate">
            77 USD (0.00542345 BTC)
          </div>
        </div>
        <div className="trades-card__owner">
          <UserAvatar imageLink={avatarImgLink} />
          <span
            className={`trades-card__operation-status trade-status ${
              isPaid ? 'paid' : null
            }`}
          >
            {isPaid ? 'paid' : 'not paid'}
          </span>
        </div>
      </li>
    </>
  );
};

export default DialogCard;
