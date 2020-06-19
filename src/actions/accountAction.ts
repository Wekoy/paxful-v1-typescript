import { CHANGE_ACCOUNT } from 'constants/actionTypes';

export type ChangeAccountType = {
  type: string,
};

export const changeAccount = () => ({ type: CHANGE_ACCOUNT });
