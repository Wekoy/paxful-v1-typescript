import React, { FC } from 'react';
import { DataFromServer } from 'entries/dataFromServer';
import useGetInformation from 'api/hooks/information';

import './style.css';

type Props = {
  data: DataFromServer,
};

const DataBlock: FC<Props> = ({ data }) => {
  const {
    disclaimer,
    bpi: {
      USD: { code, rate, description, rate_float: rateFloat },
    },
  } = data;

  return (
    <div>
      <p className="disclaimer">{disclaimer}</p>
      <div className="server-info-row">
        <p>Code</p>
        <p className="">{code}</p>
      </div>
      <div className="server-info-row">
        <p>Rate</p>
        <p className="">{rate}</p>
      </div>
      <div className="server-info-row">
        <p>Description</p>
        <p className="">{description}</p>
      </div>
      <div className="server-info-row">
        <p>Rate Float</p>
        <p className="">{rateFloat}</p>
      </div>
    </div>
  );
};

const FromServer: FC = () => {
  const { data, error } = useGetInformation(
    'https://api.coindesk.com/v1/bpi/currentprice/USD.json',
  );

  if (error)
    return (
      <div className="error">
        Sorry, but something went wrong. Please try later
      </div>
    );

  return (
    <div className="">
      {data ? (
        <DataBlock data={data} />
      ) : (
        <div className="server-info-loader">
          <img
            src="https://new.siemens.com/content/dam/internet/siemens-com/global/market-specific-solutions/cement-industry/sicement-process-newton-v04/app/sicement/images/preloader.gif"
            alt=""
          />
          Wait a minute. We are loading date...
        </div>
      )}
    </div>
  );
};

export default FromServer;
