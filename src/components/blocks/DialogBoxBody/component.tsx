import React, { FC, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { BUYER_TYPE, SELLER_TYPE } from 'constants/account';
import { sendMessage, changeMessageStatusOnRead } from 'actions/messageAction';
import { Store } from 'entries/store';
import { Message as MessageType } from 'entries/trade';
import useInput from 'hooks/useInput';
import TradeChatForm from 'components/forms/TradeChatForm';
import TransformDate from 'helper/transformDate';
import { useParams } from 'react-router-dom';
import Message from '../Message';

import './style.css';

const DialogBoxBody: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const currentTrade = useSelector((state: Store) => state.currentTrade.item);
  const account = useSelector((state: Store) => state.account);
  const errors = useSelector((state: Store) => state.trades.errors);

  const { messages, interlocutorAvatar, avatar } = currentTrade;
  const shallowCopyNewMessages: { [key: string]: boolean } =
    currentTrade.newMessage;

  const [values, handleFieldChange, reset] = useInput({
    message: '',
  });

  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const messageObject = {
        id: +currentTrade.messages.length + 1,
        text: values.message,
        date: TransformDate(new Date()),
        type: account,
      };
      const args = {
        tradeId: id,
        message: messageObject,
        account: account === BUYER_TYPE ? SELLER_TYPE : BUYER_TYPE,
      };

      dispatch(sendMessage(args));
      reset();
    },
    [values, id, account, currentTrade.messages.length, dispatch, reset],
  );

  const eventHandler = useCallback(() => {
    return errors.forEach((error) => {
      toast.error(`${error}`);
    });
  }, [errors]);

  useEffect(() => {
    if (errors) eventHandler();
  }, [eventHandler, errors]);

  useEffect(() => {
    if (shallowCopyNewMessages[account]) {
      dispatch(changeMessageStatusOnRead(currentTrade.id, account));
    }
  }, [account, currentTrade.id, dispatch, shallowCopyNewMessages]);

  return (
    <>
      <div className="chat-wrap">
        {messages.map((message: MessageType) => (
          <Message
            message={message}
            avatar={avatar}
            interlocutorAvatar={interlocutorAvatar}
            key={message.id}
          />
        ))}
      </div>
      <TradeChatForm
        handleFormSubmit={handleFormSubmit}
        handleFieldChange={handleFieldChange}
        message={values.message}
      />
    </>
  );
};

export default DialogBoxBody;
