import { BUYER_TYPE, SELLER_TYPE } from 'constants/account';
import { CHANGE_ACCOUNT } from 'constants/actionTypes';
import { ChangeAccountType } from 'actions/accountAction';

type Action = ChangeAccountType;
const initialState = BUYER_TYPE;

type Reducer = (state: string, action: Action) => string;

const account: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ACCOUNT: {
      const newAccount = state === BUYER_TYPE ? SELLER_TYPE : BUYER_TYPE;
      return newAccount;
    }
    default:
      return state;
  }
};

export default account;
