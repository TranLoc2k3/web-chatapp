export const detectTypeFileFromUrl = (url: string) => {
  const regex = /(?:\.([^.]+))?$/;
  const matches = regex.exec(url);
  return matches ? matches[1] : "";
};
