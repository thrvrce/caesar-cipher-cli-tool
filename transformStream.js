import { Transform } from 'stream';

export class myTransform extends Transform {
  constructor(opt) {
    super(opt);
    this.transformFunc = opt.transformFunc;
    this.shift = opt.shift
  }

  _transform(chunk, encoding, callback) {
    try {
      const resultString = this.transformFunc(chunk.toString(), this.shift);
      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}