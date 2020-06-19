const isObjectEmpty = (obj: any) => {
  if (Object.getOwnPropertyNames(obj).length > 0) return false;
  return true;
};

export default isObjectEmpty;
