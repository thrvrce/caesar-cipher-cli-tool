import { Transform } from 'stream';

const transformStream = new Transform({
  transform(chunk, enc, callback) {
    try {
      const resultString = `*${chunk.toString('utf8')}`;
      console.log(`Into transform method: ${chunk.toString()}`);
      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
});

export default transformStream;