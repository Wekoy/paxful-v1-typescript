export type Message = {
  id: string,
  type: string,
  text: string,
  date: string,
};

export type Trade = {
  id: string,
  isPaid: boolean,
  avatar: string,
  payMethod: string,
  name: string,
  startAt: Date,
  rating: {
    good: number,
    bad: number,
  },
  interlocutorAvatar: string,
  numberOfTrades: number,
  tradeHash: string,
  messages: Array<Message>,
  newMessage: {
    SELLER_TYPE: boolean,
    BUYER_TYPE: boolean,
  },
};
