import { Trade } from 'entries/trade';
import {
  GET_TRADES_REQUEST,
  GET_TRADES_SUCCESS,
  GET_TRADES_ERROR,
  DELETE_TRADES,
} from '../constants/actionTypes';
import delayForResponse from '../helper/delayForResponse';

export type Args = {
  tradeId: string,
  message?: {
    id: number,
    text: string,
    type: string,
    date: string,
  },
  account?: string,
  prevId?: string,
};

export type Results = {
  type: string,
  payload: Args,
};

type GetTradesRequestType = () => { type: string };
type GetTradesSuccessType = (
  payload: Array<Trade>,
) => {
  type: string,
  payload: Array<Trade>,
};
type GetTradesErrorType = (
  payload: string,
) => {
  type: string,
  payload: string,
};
type DeleteTradeType = (payload: string) => Results;

const getTradesRequest: GetTradesRequestType = () => ({
  type: GET_TRADES_REQUEST,
});

const getTradesSuccess: GetTradesSuccessType = (payload) => ({
  type: GET_TRADES_SUCCESS,
  payload,
});

const getTradesError: GetTradesErrorType = (payload) => ({
  type: GET_TRADES_ERROR,
  payload,
});

export const deleteTrade: DeleteTradeType = (payload) => ({
  type: DELETE_TRADES,
  payload: { tradeId: payload },
});

export const getTrades = (url: string) => async (dispatch: any) => {
  dispatch(getTradesRequest());

  await delayForResponse();

  const response = await fetch(url);

  if (!response.ok) return dispatch(getTradesError(response.statusText));

  const result: Array<Trade> = await response.json();

  return dispatch(getTradesSuccess(result));
};

export default getTrades;
