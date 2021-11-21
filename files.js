import fs from 'fs';

const getReadableStreamFromFile = (path) => {
  try {
    const readableStream = fs.createReadStream(path);
    return readableStream;
  } catch(error) {
    process.stderr.write(`Error with input file. ${error.message}\n`)
    process.stderr.write('Receive process.exit command with code 2.\n')
    process.exit(2);
  }
}

const getWritableStreamFromFile = (path) => {
  try {
    const writableStream = fs.createWriteStream(path, {flags: 'a+'});
    return writableStream;
  } catch(error) {
    process.stderr.write(`Error with output file. ${error.message}\n`)
    process.stderr.write('Receive process.exit command with code 2.\n')
    process.exit(2);
  }
}

export {getReadableStreamFromFile, getWritableStreamFromFile}