import  {getCLIArgs, checkRequiredProperties} from './CLI_funcs.js';

const CLIargs = getCLIArgs();

if (!checkRequiredProperties(CLIargs)) {
  process.stderr.write('Receive process.exit command with code 1.\n')
  process.exit(1);
}

console.log(CLIargs);