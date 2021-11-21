import { BasicCipherTransformStream } from "./BasicCipherTransformStream.js";
import { rot13Cipher } from "../ciphersFunctions.js";

export class Rot13CipherTransformStream extends BasicCipherTransformStream {
  constructor(action) {
    super();
    this.action = action;
  }

  cipherFn = (char) => rot13Cipher(char, this.action);
}