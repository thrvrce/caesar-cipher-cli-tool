const alphabet = Array.from({ length: 26 }, (value, index) => String.fromCharCode(65 + index));
const alphabetLength = alphabet.length;

export const chipher = (str, shift) => {
  const srcArrOfChars = str.trim().split('');

  const dstArrOfChars = srcArrOfChars.map(char => {
    const indexInAlphabet = alphabet.indexOf(char.toUpperCase())
    if (indexInAlphabet !== -1) {
      const isUpperCase = char.toUpperCase() === char;

      const shiftValueIndex = (indexInAlphabet + shift) % alphabetLength;
      const newValueIndex = shiftValueIndex < 0 ? alphabetLength + shiftValueIndex : shiftValueIndex;
      const newValueChar = isUpperCase ? alphabet[newValueIndex] : alphabet[newValueIndex].toLowerCase();
      return newValueChar;
    }
    return char;
  });

  const newStr = dstArrOfChars.join('');
  return '\n' + newStr + '\n';

}