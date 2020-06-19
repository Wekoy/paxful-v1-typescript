import {
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
  CHANGE_STATUS_ONREAD,
} from '../constants/actionTypes';

import { Args, Results } from 'actions/tradesActions'

import delayForResponse from '../helper/delayForResponse';

type SendMessageRequestType = () => { type: string };
type SendMessageSuccessType = ({ tradeId, message, account }: Args) => Results;
type SendMessageErrorType = (
  payload: string,
) => {
  type: string,
  payload: string,
};
type ChangeMessageStatus = ( tradeId: string, account: string) => Results;

const sendMessageRequest: SendMessageRequestType = () => ({
  type: SEND_MESSAGE_REQUEST,
});

const sendMessageSuccess: SendMessageSuccessType = ({ tradeId, message, account }) => ({
  type: SEND_MESSAGE_SUCCESS,
  payload: { tradeId, message, account },
});

const sendMessageError: SendMessageErrorType = (payload) => ({
  type: SEND_MESSAGE_ERROR,
  payload,
});

export const changeMessageStatusOnRead: ChangeMessageStatus = (tradeId, account) => ({
  type: CHANGE_STATUS_ONREAD,
  payload: { tradeId, account },
});

export const sendMessage = ({ tradeId, message, account }: Args) => async (
  dispatch: any,
) => {
  dispatch(sendMessageRequest());

  await delayForResponse(300);

  if (message && !message.text) {
    return dispatch(
      sendMessageError('Sorry, but something went wrong. Check you message'),
    );
  }
  return dispatch(sendMessageSuccess({ tradeId, message, account }));
};
