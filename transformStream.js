import { Transform } from 'stream';

export class myTransform extends Transform {
  constructor(opt) {
    super(opt);
    this.transformFunc = opt.transformFunc;
    this.shift = opt.shift
  }

  _transform(chunk, encoding, callback) {
    try {
      const resultString = this.transformFunc(chunk.toString());
      console.log(`Into transform method: ${chunk.toString()}`);
      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}

// const transformStream = new Transform({
//   transform(chunk, enc, callback) {
//     try {
//       const resultString = `*${chunk.toString('utf8')}`;
//       console.log(`Into transform method: ${chunk.toString()}`);
//       callback(null, resultString);
//     } catch (err) {
//       callback(err);
//     }
//   }
// });

// export default transformStream;