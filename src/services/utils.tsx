export const areAllPropertiesUndefined = (obj: any) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
      return false;
    }
  }
  return true;
};

export const getRandomInteger = () => {
  const randomFloat = Math.random();
  const randomInteger = Math.floor(randomFloat * (1000000 - 0 + 1)) + 0;
  return randomInteger;
};
