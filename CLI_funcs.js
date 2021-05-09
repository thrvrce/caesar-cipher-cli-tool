import minimist from 'minimist';

const normalizeCliArgs = (arg, type) => {
  if (typeof arg !== type) {
    switch(type) {
      case 'string': return '';
      case 'number': return 0;
    }
  }
  return arg;
}

const checkRequiredProperties = ({action, shift})=> {
  const actionisValid = action === 'encode' || action === 'decode' ? true : false;
  const shiftIsValid = !Number.isNaN(shift) && typeof shift === 'number' && isFinite(shift) ? true : false;

  if (!actionisValid || !shiftIsValid) {
    process.stderr.write(Buffer.from(`Error:\n ${actionisValid ? '' : ' Action value is invalid.\n'} ${shiftIsValid ? '' : ' Shift value is invalid.\n'}`));
  }

  return actionisValid && shiftIsValid;
}

const getCLIArgs = ()=> {
  const {a, action, i, input, o, output, s, shift} = minimist((process.argv.slice(2)));
  return {
    action: a || action,
    input:  normalizeCliArgs(i || input, 'string'),
    output: normalizeCliArgs(o || output, 'string'),
    shift:  s || shift,
  }
};

export {getCLIArgs, checkRequiredProperties};