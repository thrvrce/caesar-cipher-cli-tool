import fs from 'fs';

import {
  getReadableStreamFromFile,
  getWritableStreamFromFile,
} from '../files.js'

const stderrWrite = jest.spyOn(process.stderr, 'write');
const exit = jest.spyOn(process, "exit").mockImplementation(() => {});

describe('files', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })
  describe('getReadableStreamFromFile', () => {
    it('should return instance of fs.ReadStream ', () => {
      expect(getReadableStreamFromFile('./testFile.txt') instanceof fs.ReadStream ).toBe(true);
    })

    it('should log errors ', () => {
      const fsCRS = jest.spyOn(fs, 'createReadStream').mockImplementationOnce(() => {throw new Error('error')} )
      getReadableStreamFromFile('./testFile.txt')
      expect(stderrWrite).toHaveBeenCalledTimes(2)
      expect(stderrWrite).toHaveBeenCalledWith('Error with input file. error\n')
      expect(stderrWrite).toHaveBeenCalledWith('Receive process.exit command with code 2.\n')
    })
  })
  describe('getWritableStreamFromFile', () => {
    it('should return instance of fs.WriteStream', () => {
      expect(getWritableStreamFromFile('./testFile.txt') instanceof fs.WriteStream).toBe(true);
    })

    it('should log errors ', () => {
      const fsCWS = jest.spyOn(fs, 'createWriteStream').mockImplementationOnce(() => {throw new Error('error')} )
      getWritableStreamFromFile('./testFile.txt')
      expect(stderrWrite).toHaveBeenCalledTimes(2)
      expect(stderrWrite).toHaveBeenCalledWith('Error with output file. error\n')
      expect(stderrWrite).toHaveBeenCalledWith('Receive process.exit command with code 2.\n')
    })
  })
})