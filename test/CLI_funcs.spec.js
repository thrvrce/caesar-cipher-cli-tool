import { argumentIsParameter, getCLIArgs, checkRequiredProperties, checkCipherConfigArgument } from '../CLI_funcs.js';

const exit = jest.spyOn(process, "exit").mockImplementation(() => {});
const stderrWrite = jest.spyOn(process.stderr, 'write');

describe('CLI_funcs', () => {
  beforeEach(() => {
    process.argv = [];
    jest.clearAllMocks();
  })
  describe('getCLIArgs', () => {
    it('should return only using parsed arguments from short and full parameters', () => {
      const mockProcessArgvShortName = ['-c','C1-C1-A-R0','-i', './input.txt', '-o', './output.txt', '-r', 'random parameter'];
      const expectedResult = {
        cipherConfigString: mockProcessArgvShortName[1],
        input: mockProcessArgvShortName[3],
        output: mockProcessArgvShortName[5],
      };
      process.argv = [, ,...mockProcessArgvShortName]      ;
      expect(getCLIArgs()).toEqual(expectedResult)

      const mockProcessArgvFullName = ['--config','C1-C1-A-R0','--input', './input.txt', '--output', './output.txt', '--random', 'random parameter'];
      process.argv = [, ,...mockProcessArgvFullName]      ;
      expect(getCLIArgs()).toEqual(expectedResult)
    })

    it('should skip parameters without value', () => {
      const mockProcessArgv = ['-c','C1-C1-A-R0', '-i', '-o', './output.txt', '-r', 'random parameter'];
      const expectedResult = {
        cipherConfigString: mockProcessArgv[1],
        input: undefined,
        output: mockProcessArgv[4],
      };
      process.argv = [, ,...mockProcessArgv];
      expect(getCLIArgs()).toEqual(expectedResult)
    })

    it('should not use values as parameters', () => {
      const mockProcessArgv = ['C1-C1-A-R0', './output.txt', 'random parameter'];
      const expectedResult = {
        cipherConfigString: undefined,
        input: undefined,
        output: undefined,
      };
      process.argv = [, ,...mockProcessArgv];
      expect(getCLIArgs()).toEqual(expectedResult)
    })

    it('should write message if user passed duplicated parameters ', () => {
      const mockProcessArgv = ['-c','C1-C1-A-R0','-c','C1-C1-A-R0','-i', './input.txt', '-o', './output.txt', '-r', 'random parameter'];
      process.argv = [, ,...mockProcessArgv];
      getCLIArgs()
      expect(stderrWrite).toHaveBeenCalledTimes(2)
      expect(stderrWrite).toHaveBeenCalledWith('CLI has diplicated arguments.\n')
    })
  })
  describe('checkRequiredProperties', () => {
    it('should return true if config parameter is valid', () => {
      expect(checkRequiredProperties({cipherConfigString: 'C1-A-R0'})).toBe(true);
    })

    it('should exit process with error message if config parameter is not defined', () => {
      checkRequiredProperties({cipherConfigString: undefined})

      expect(exit).toHaveBeenCalledTimes(1)
      expect(stderrWrite).toHaveBeenCalledTimes(3)
      expect(stderrWrite).toHaveBeenCalledWith('Config check has not passed.\n')
      expect(stderrWrite).toHaveBeenCalledWith(`Config parameter was not passed.\n`)
    })

    it('should exit process with error message if config parameter is not valid', () => {
      checkRequiredProperties({cipherConfigString: 'C-A-R0'})

      expect(exit).toHaveBeenCalledTimes(1)
      expect(stderrWrite).toHaveBeenCalledTimes(3)
      expect(stderrWrite).toHaveBeenCalledWith('Config check has not passed.\n')
      expect(stderrWrite).toHaveBeenCalledWith('Additional cipher parameter was not specified at position 0 \n')
    })
  })

  describe('checkCipherConfigArgument', () => {
    it('should return false if unknown cipher type parameter was passed', () => {
      const {valid} = checkCipherConfigArgument('C1-C1-A-R0-E');
      expect(valid).toBe(false)
    })

    it('should return false if cipher type A has encode\\decode  parameter', () => {
      const {valid} = checkCipherConfigArgument('C1-C1-A-R0-A1');
      expect(valid).toBe(false)
    })
  })

  describe('argumentIsParameter', () => {
    it('should check if passed argument is parameter', () => {
      expect(argumentIsParameter('-c')).toBe(true);
      expect(argumentIsParameter('--config')).toBe(true);
      expect(argumentIsParameter('---config')).toBe(false);
    })
  })
})