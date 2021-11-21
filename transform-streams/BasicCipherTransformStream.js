import { Transform } from 'stream';
import { cipherString } from '../ciphersFunctions.js';

export class BasicCipherTransformStream extends Transform {
  _transform(chunk, encoding, callback) {
    try {
      let resultString = chunk.toString();
      if (this.cipherFn) {
        resultString = cipherString(chunk.toString(), this.cipherFn);
      }

      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}