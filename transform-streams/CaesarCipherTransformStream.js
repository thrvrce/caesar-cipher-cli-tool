import { BasicCipherTransformStream } from "./BasicCipherTransformStream.js";
import { caesarCipher } from "../ciphersFunctions.js";

export class CaesarCipherTransformStream extends BasicCipherTransformStream {
  constructor(shift, action) {
    super();
    this.shift = shift;
    this.action = action;
  }

  cipherFn = (char) => caesarCipher(char, this.shift, this.action);
}