import React, { FC } from 'react';

import './style.css';

type Props = {
  rating: { good: number, bad: number },
};

const Rating: FC<Props> = ({ rating }) => {
  const { good, bad } = rating;

  return (
    <div className="rating">
      <span className="positive">
        {good === 0 ? '' : '+'}
        {good}
      </span>{' '}
      /{' '}
      <span className="negative">
        {bad === 0 ? '' : '-'}
        {bad}
      </span>
    </div>
  );
};

export default Rating;
