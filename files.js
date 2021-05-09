import fs from 'fs';

const getReadableStreamFromFile = (path) => {
  try {
    let readableStream = fs.createReadStream(path);
    return readableStream;
  } catch(error) {
    process.stderr.write(Buffer.from(`Error with input file. ${error.message}\n`))
    process.stderr.write('Receive process.exit command with code 2.\n')
    process.exit(2);
  }
}

const getWritableableStreamFromFile = (path) => {
  try {
    let writableStream = fs.createWriteStream(path, {flags: 'a+'});
    return writableStream;
  } catch(error) {
    process.stderr.write(Buffer.from(`Error with output file. ${error.message}\n`))
    process.stderr.write('Receive process.exit command with code 2.\n')
    process.exit(2);
  }
}

export {getReadableStreamFromFile, getWritableableStreamFromFile}