import React, { FC, useRef, useEffect } from 'react';
import Input from 'components/controls/Input';
import { Store } from 'entries/store';
import { useSelector } from 'react-redux';

import './style.css';

type Props = {
  handleFormSubmit: any,
  handleFieldChange: any,
  message: string,
};

const TradeChatForm: FC<Props> = ({
  handleFormSubmit,
  handleFieldChange,
  message,
}) => {
  const chatBottomRef = useRef<HTMLFormElement>(null);

  const scrollToBottom = () => {
    if (chatBottomRef && chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({
        behavior: 'auto',
      });
    }
  };

  const isSendingMessage = useSelector(
    (state: Store) => state.trades.isSendingMessage,
  );

  useEffect(() => {
    scrollToBottom();
  });
  return (
    <form
      ref={chatBottomRef}
      className="trade-chat__input-wrap"
      onSubmit={handleFormSubmit}
    >
      <Input
        name="message"
        type="text"
        value={message}
        placeholder="Type your message..."
        onInputChange={handleFieldChange}
      />
      <button type="submit" className="trade-chat__submit">
        send
      </button>
      {isSendingMessage ? (
        <div className="message-loader-block">
          <img
            src="https://www.ulysse-nardin.com/pub/static/frontend/Isobar/ulysse_nardin/ru_RU/images/loader-spin.gif"
            alt="message-loader"
          />
        </div>
      ) : null}
    </form>
  );
};

export default TradeChatForm;
