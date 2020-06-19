export type DataFromServer = {
  bpi: {
    USD: {
      code: string,
      rate: string,
      description: string,
      rate_float: number,
    },
  },
  disclaimer: string,
};

export type ErrorData = {
  response: {
    data: string,
  },
};
