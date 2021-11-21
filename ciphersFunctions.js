const alphabet = Array.from({ length: 26 }, (value, index) => String.fromCharCode(65 + index));
const alphabetLength = alphabet.length;

export const cipherString = (str, cipherFn) => {
  const srcArrOfChars = str.trim().split('');

  const dstArrOfChars = srcArrOfChars.map(char => {
    const charExistsInAlphabet = alphabet.includes(char.toUpperCase())
    if (charExistsInAlphabet) {
      const isCharInUpperCase = char.toUpperCase() === char;
      const cipheredChar = cipherFn(char);
      const cipheredCharWithCase = isCharInUpperCase ? cipheredChar : cipheredChar.toLowerCase();

      return cipheredCharWithCase;
    }
    return char;
  });

  const newStr = dstArrOfChars.join('');
  return newStr;
}

export const caesarCipher = (char, shift, action) => {
  const realShiftValue = action === 'encode' ? shift : -shift;
  const indexInAlphabet= alphabet.indexOf(char.toUpperCase())
  const shiftValueIndex = (indexInAlphabet + realShiftValue) % alphabetLength;
  const newValueIndex = shiftValueIndex < 0 ? alphabetLength + shiftValueIndex : shiftValueIndex;
  const newValueChar = alphabet[newValueIndex];

  return newValueChar;
}

export const rot13Cipher = (char, action) => caesarCipher(char, 8, action);

export const atbashCipher = (char) => {
  const indexInAlphabet= alphabet.indexOf(char.toUpperCase())
  const newValueIndex = alphabetLength - indexInAlphabet -1;
  const newValueChar = alphabet[newValueIndex];

  return newValueChar;
}