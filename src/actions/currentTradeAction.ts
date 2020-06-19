import {
  SET_TRADE_REQUEST,
  SET_TRADE_SUCCESS,
  SET_TRADE_ERROR,
} from '../constants/actionTypes';
import { Args } from 'actions/tradesActions';
import { Results } from 'actions/tradesActions'
import { Trade } from 'entries/trade';

type SetTradeRequestType = ({ tradeId, prevId }: Args) => Results;
type SetTradeSuccessType = (trade: Trade) => { type: string, payload: Trade}
type SetTradeErrorType = (
  payload: string,
) => {
  type: string,
  payload: string,
};

const setTradeRequest: SetTradeRequestType = (payload) => ({
  type: SET_TRADE_REQUEST,
  payload,
});

const setTradeSuccess: SetTradeSuccessType = (payload) => ({
  type: SET_TRADE_SUCCESS,
  payload,
});

const setTradeError:SetTradeErrorType = (payload) => ({
  type: SET_TRADE_ERROR,
  payload,
});

const setCurrentTrade = (trade: Trade, prevId: string) => (dispatch: any) => {
  dispatch(setTradeRequest({ tradeId: trade.id, prevId }));

  if (!trade) return dispatch(setTradeError('Missing "trade" variable'));

  return dispatch(setTradeSuccess(trade));
};

export default setCurrentTrade;
