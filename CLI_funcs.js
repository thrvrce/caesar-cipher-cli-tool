const checkCipherConfigArgument = (cipherConfigString) => {
  const streamConfigs = cipherConfigString.split('-');
  const checkResult = {
    valid: streamConfigs.length > 0,
    messages: [],
  }

  if (checkResult.valid) {
    checkResult.valid = streamConfigs.every((config, index) => {
      const streamType = config[0];
      const streamTypeAdditionalParameter = config[1];
      if (!['A', 'R', 'C'].includes(streamType)) {
        checkResult.messages.push(`Invalid cipher type at position ${index} `)
        return false;
      }

      if (['R', 'C'].includes(streamType)) {
        if (![1, 0].includes(Number(streamTypeAdditionalParameter))) {
          checkResult.messages.push(`Additional cipher parameter was not specified at position ${index} `)
          return false;
        }
      }

      if (streamType === 'A') {
        if (streamTypeAdditionalParameter) {
          checkResult.messages.push(`Additional cipher parameter was specified received at position ${index} `)
          return false;
        }
      }

      return true;
    });
  }
  return checkResult;
}

const checkRequiredProperties = ({cipherConfigString})=> {
  const { valid: cipherConfigArgumentCheckResult , messages: cipherConfigArgumentCheckMessages} = checkCipherConfigArgument(cipherConfigString);
  if (!cipherConfigArgumentCheckResult) {
    process.stderr.write('Config check has not passed.\n')
    cipherConfigArgumentCheckMessages.forEach((message) => process.stderr.write(message +'\n'))
    process.stderr.write('Receive process.exit command with code 1.\n')
    process.exit(1);
  }

  return cipherConfigArgumentCheckResult;
}

const argumentIsParameter = (argument= '') => (argument.startsWith('-') && argument[1] !== '-' && argument.length === 2) || (argument.startsWith('--') && argument[2] !== '-');

const getCLIArgs = ()=> {
  const cliArgs = process.argv.slice(2);
  let hasDuplicatedArguments= false;
  const parsedArguments = {};
  let cliArgsArrayIndex = 0;

  while (cliArgsArrayIndex < cliArgs.length) {
    const argument  = cliArgs[cliArgsArrayIndex];
    const isParameter = argumentIsParameter(argument);
    const isParameterFullName = isParameter && argument.startsWith('--');

    if (isParameter) {
      const parameterName = isParameterFullName ? argument.slice(2) : argument.slice(1)
      const nextArgument = cliArgs[cliArgsArrayIndex +1];
      const nextCliArgIsValue = !argumentIsParameter(nextArgument);
      hasDuplicatedArguments = parameterName in parsedArguments;

      if (nextCliArgIsValue) {
        parsedArguments[parameterName] = nextArgument;
        cliArgsArrayIndex += 2;
      } else {
        cliArgsArrayIndex += 1;
      }
    } else {
      cliArgsArrayIndex += 1;
    }
  }

  if (hasDuplicatedArguments) {
    process.stderr.write('CLI has diplicated arguments.\n')
    process.stderr.write('Receive process.exit command with code 3.\n')
    process.exit(3);
  }

  const {c, config, i, input, o, output,} = parsedArguments;
  return {
    cipherConfigString: c || config,
    input: i || input,
    output: o || output,
  }
};

export {getCLIArgs, checkRequiredProperties};