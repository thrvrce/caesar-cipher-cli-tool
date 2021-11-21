import {
  cipherString,
  caesarCipher,
  rot13Cipher,
  atbashCipher,
} from '../ciphersFunctions.js'

describe('ciphersFunctions', () => {
  describe('cipherString', () => {
    it('should not transform non latin characters', () => {
      expect(cipherString('ц', (char) => atbashCipher(char) )).toBe('ц');
      expect(cipherString('a', (char) => atbashCipher(char) )).toBe('z');
    });

    it('should preserve characters\' case', () => {
      expect(cipherString('a', (char) => atbashCipher(char) )).toBe('z');
      expect(cipherString('A', (char) => atbashCipher(char) )).toBe('Z');
    });
  })

  describe('caesarCipher', () => {
    it('should encode', () => {
      expect(caesarCipher('A', 1, 'encode')).toBe('B');
    });

    it('should decode', () => {
      expect(caesarCipher('B', 1, 'decode')).toBe('A');
    });
  })
})