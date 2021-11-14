# Ciphering CLI Tool
Ciphering CLI Tool

CLI tool can be started by command node index.js --config C1
CLI tool accepts 3 options (short alias and full name):
1. -c, --config: required parameter for ciphers Config is a string with pattern {XY(-)}n, where:
  - X is a cipher mark:
    - C is for Caesar cipher (with shift 1)
    - A is for Atbash cipher
    - R is for ROT-8 cipher
  - Y is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
    - 1 is for encoding
    - 0 is for decoding
2. -i, --input: a path to input file
3. -o, --output: a path to output file
