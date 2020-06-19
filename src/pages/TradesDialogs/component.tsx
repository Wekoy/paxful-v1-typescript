import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTrades } from 'actions/tradesActions';
import Hidden from '@material-ui/core/Hidden';
import 'simplebar';
import 'simplebar/dist/simplebar.min.css';
import { Store } from 'entries/store';
import {
  DialogsList,
  DialogBox,
  DialogDetails,
  ScrollBlock,
  TradeWrap,
  MobileHeader,
} from 'components/blocks';
import Loader from 'components/controls/Loader';
import './style.css';

const TradesDialogs: React.FC = () => {
  const isLoading = useSelector((state: Store) => state.trades.isLoading);
  const trades = useSelector((state: Store) => state.trades.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrades(`http://localhost:3000/dialogsItems.json`));
  }, [dispatch]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Hidden lgUp>
        <MobileHeader />
      </Hidden>
      <div className="trades-dialogs-wrap">
        <Hidden mdDown>
          <ScrollBlock className="trades-dialogs__items">
            <DialogsList />
          </ScrollBlock>
        </Hidden>
        <Switch>
          {trades.length && (
            <Route exact path="/">
              <Redirect to={`/${trades[0].id}`} />
            </Route>
          )}
          <Route path="/:id">
            <TradeWrap>
              <ScrollBlock className="trades-dialogs__massage-wrap">
                <DialogBox />
              </ScrollBlock>
              <Hidden mdDown>
                <ScrollBlock className="trades-dialogs__details">
                  <DialogDetails />
                </ScrollBlock>
              </Hidden>
            </TradeWrap>
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default TradesDialogs;
