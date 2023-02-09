import { System } from '../System';

type Modes = 'stable' | 'refreshing' | 'multiple';

export function createProcessorInstance(
  system: System,
  config: any,
  opt: any,
  actionType: string
) {
  const mode: Modes = config.instance;
  switch (mode) {
    case 'stable':
      return stableMode(system, config, opt, actionType);
    case 'refreshing':
      return refreshingMode(system, config, opt, actionType);
    case 'multiple':
      return multipleMode(system, config, opt, actionType);
    default:
      throw Error('Unknown instantiating mode');
  }
}

function multipleMode(system, config, opt, actionType) {
  const processor = config.script;
  const newInstance = new processor(opt);
  const processUid = opt.uid;
  system.upProcess(newInstance, actionType, processUid);

  return newInstance; //.init(actionPayload);
}

function stableMode(system, config, opt, actionType) {
  const processor = config.script;
  const processUid = opt.uid;
  const found = system.findProcess(actionType);
  if (found.length) {
    return found[0];
  }
  const newInstance = new processor(opt);
  system.upProcess(newInstance, actionType, processUid);

  return newInstance; //.init(actionPayload);
}

function refreshingMode(system, config, opt, actionType) {
  const processor = config.script;
  const found = system.findProcess(actionType);
  const processUid = opt.uid;
  if (found) {
    system.downProcess(actionType);
  }
  const newInstance = new processor(opt);
  system.upProcess(newInstance, actionType, processUid);

  return newInstance; //.init(actionPayload);
}
