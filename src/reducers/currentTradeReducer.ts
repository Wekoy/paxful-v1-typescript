import {
  SET_TRADE_REQUEST,
  SET_TRADE_SUCCESS,
  SET_TRADE_ERROR,
} from '../constants/actionTypes';
import { Results } from 'actions/tradesActions';
import { Trade } from 'entries/trade';

const initialState = {
  item: {},
  isLoading: false,
  errors: [],
};

type Action = Results;
type Reducer = (
  state: any,
  action: Action,
) => {
  item: Trade,
  isLoading: boolean,
  errors: Array<string>,
};

const currentTrade: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRADE_REQUEST:
      return {
        ...state,
        isLoading: action.payload.tradeId !== action.payload.prevId && true,
      };
    case SET_TRADE_SUCCESS:
      return {
        ...state,
        item: action.payload,
        isLoading: false,
      };
    case SET_TRADE_ERROR:
      return { ...state, errors: action.payload, isLoading: false };

    default:
      return state;
  }
};

export default currentTrade;
