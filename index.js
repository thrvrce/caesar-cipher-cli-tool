import {getCLIArgs, checkRequiredProperties} from './CLI_funcs.js';
import {getReadableStreamFromFile, getWritableableStreamFromFile} from './files.js';
import {myTransform} from './transformStream.js';
import { pipeline } from 'stream';

const CLIargs = getCLIArgs();

if (!checkRequiredProperties(CLIargs)) {
  process.stderr.write('Receive process.exit command with code 1.\n')
  process.exit(1);
}

let useStdIn = CLIargs.input === '' ;
let useStdOut = CLIargs.output === '';

console.log(CLIargs, useStdIn, useStdOut);

let readableStream = useStdIn? process.openStdin(): getReadableStreamFromFile(CLIargs.input);
let writableStream = useStdOut ? process.stdout : getWritableableStreamFromFile(CLIargs.output);
let transformStream = new myTransform({transformFunc: (char)=> char.toUpperCase()});

pipeline(
  readableStream,
  transformStream,
  writableStream,
  (error) => {
    if (error) {error.message}
    else {
      console.log('Done!')
    }
  }
)

  // readableStream.pipe(transformStream).pipe(writableStream);
