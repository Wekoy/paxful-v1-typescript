const delayForResponse = async (stallTime = 500) => {
  await new Promise((resolve) => setTimeout(resolve, stallTime));
};

export default delayForResponse;
