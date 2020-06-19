import {
  GET_TRADES_REQUEST,
  GET_TRADES_SUCCESS,
  GET_TRADES_ERROR,
  DELETE_TRADES,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
  CHANGE_STATUS_ONREAD,
} from '../constants/actionTypes';
import { Results } from 'actions/tradesActions';
import { Trade } from 'entries/trade';

const initialState = {
  items: [],
  isLoading: false,
  errors: [],
  isSendingMessage: false,
};

type Action = Results;
type Reducer = (state: any, action: Action) => { items: Array<Trade>, isLoading: boolean,errors: Array<string>, isSendingMessage: boolean };

const getTrade = (state: any, action: Action) => {
  return state.find((trade: Trade) => trade.id === action.payload.tradeId);
};

const getTradeIndex = (state: any, action: Action) => {
  return state.findIndex((trade: Trade) => trade.id === action.payload.tradeId);
};

const trades: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRADES_REQUEST:
      return { ...state, isLoading: true };
    case GET_TRADES_SUCCESS:
      return { ...state, items: action.payload, isLoading: false };
    case GET_TRADES_ERROR:
      return { ...state, errors: [action.payload], isLoading: false };
    case DELETE_TRADES:
      return {
        ...state,
        items: state.items.filter(
          (trade: Trade) => trade.id !== action.payload.tradeId,
        ),
      };
    case SEND_MESSAGE_REQUEST:
      return {
        ...state,
        isSendingMessage: true,
      };
    case SEND_MESSAGE_SUCCESS: {
      const newTradesArray = [...state.items];
      const trade = getTrade(newTradesArray, action);
      const tradeIndex = getTradeIndex(newTradesArray, action);

      const newTrade = {
        ...trade,
        messages: [...trade.messages, action.payload.message],
        newMessage: {
          ...trade.newMessage,
          [action.payload.account as string]: true,
        },
      };

      newTradesArray.splice(tradeIndex, 1, newTrade);

      return { ...state, items: newTradesArray, isSendingMessage: false };
    }
    case SEND_MESSAGE_ERROR:
      return {
        ...state,
        errors: [action.payload],
        isSendingMessage: false,
      };
    case CHANGE_STATUS_ONREAD: {
      const newTradesArray = [...state.items];
      const tradeOnRead = getTrade(newTradesArray, action);
      const tradeOnReadIndex = getTradeIndex(newTradesArray, action);
      const newTradeAfterOnRead = {
        ...tradeOnRead,
        newMessage: {
          ...tradeOnRead.newMessage,
          [action.payload.account as string]: false,
        },
      };

      newTradesArray.splice(tradeOnReadIndex, 1, newTradeAfterOnRead);

      return { ...state, items: newTradesArray };
    }
    default:
      return state;
  }
};

export default trades;
