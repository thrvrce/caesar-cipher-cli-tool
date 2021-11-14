import { BasicCipherTransformStream } from "./BasicCipherTransformStream.js";
import { atbashCipher } from "../ciphersFunctions.js";

export class AtbashCipherTransformStream extends BasicCipherTransformStream {
  cipherFn = (char) => atbashCipher(char);
}