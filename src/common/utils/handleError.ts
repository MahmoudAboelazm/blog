export const handleError = (error: any, message: string) => {
  const err = new error(message);
  err.response.message = [message];
  return err;
};
