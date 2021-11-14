import { pipeline } from 'stream';

import { getCLIArgs, checkRequiredProperties } from './CLI_funcs.js';
import { getReadableStreamFromFile, getWritableStreamFromFile } from './files.js';

import { CaesarCipherTransformStream } from './transform-streams/caesarCipherTransformStream.js';
import { Rot13CipherTransformStream } from './transform-streams/Rot13CipherTransformStream.js';
import { AtbashCipherTransformStream } from './transform-streams/AtbashCipherTransformStream.js';

const CLIargs = getCLIArgs();

checkRequiredProperties(CLIargs)

const createTRansformStreamsArrayFromCliConfig = (configString) => {
  const streamConfigs = configString.split('-');
  const streamsArray = streamConfigs.map((config) => {
    const streamType = config[0];
    const streamEncodeParameter = !!Number(config[1]) ? 'encode' : 'decode';
    switch (streamType) {
      case 'C': {
        return new CaesarCipherTransformStream(1, streamEncodeParameter);
      }
      case 'R': {
        return new Rot13CipherTransformStream(streamEncodeParameter);
      }
      case 'A': {
        return new AtbashCipherTransformStream();
      }
    }
  });

  return streamsArray;
}

const readableStream = CLIargs.input ? getReadableStreamFromFile(CLIargs.input) : process.openStdin();
const writableStream = CLIargs.output ? getWritableStreamFromFile(CLIargs.output) : process.stdout;
const transformStreams = createTRansformStreamsArrayFromCliConfig(CLIargs.cipherConfigString);

pipeline(
  readableStream,
  ...transformStreams,
  writableStream,
  (error) => {
    if (error) {
      console.error(error.message)
      process.stderr.write('Receive process.exit command with code 2.\n')
      process.exit(2);
    }
    else {
      console.log('Done!')
    }
  }
)


