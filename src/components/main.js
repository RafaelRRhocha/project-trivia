export const n05 = 0.5;
export const n3 = 3;
export const n5 = 5;
export const n10 = 10;
export const n63 = 63;
export const n67 = 67;
export const n1000 = 1000;

export const difficulty = {
  hard: 3,
  medium: 2,
  easy: 1,
};

export const decodeEntity = (formatText) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = formatText;
  return textarea.value;
};
