export const getShortName = (fullName: string) => {
  return fullName
    .split(' ')
    .map((i) => i.at(0))
    .join('');
};
