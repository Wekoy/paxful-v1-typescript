import React, { FC, useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Store } from 'entries/store';
import DialogCard from '../DialogCard';

import './style.css';

const DialogsList: FC = () => {
  const trades = useSelector((state: Store) => state.trades.items);
  const currentTrade = useSelector((state: Store) => state.currentTrade.item);
  const [selected, setSelected] = useState<string>();

  useEffect(() => {
    setSelected(currentTrade.id);
  }, [currentTrade]);

  const handleTradeChooseClick = useCallback(
    (itemId: string) => () => {
      setSelected(itemId);
    },
    [],
  );

  const renderItems = trades.map((item) => {
    const { id } = item;

    return (
      <Link key={id} to={`/${id}`} onClick={handleTradeChooseClick(id)}>
        <DialogCard
          item={item}
          key={id}
          isActive={id === selected ? 'active' : ''}
        />
      </Link>
    );
  });

  return (
    <ul>
      <div>{renderItems}</div>
    </ul>
  );
};

export default DialogsList;
