import {System} from '../System';

type Modes = 'stable' | 'refreshing' | 'multiple';

export function createProcessorInstance(
  system: System,
  config: any,
  opt: any,
  actionType: string,
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
      throw new Error('Unknown instance mode');
  }
}

function multipleMode(system, config, opt, actionType) {
  const Processor = config.script;
  const newInstance = new Processor(opt);
  const processUid = opt.uid;

  system.upProcess(newInstance, actionType, processUid);

  return newInstance; //.init(actionPayload);
}

function stableMode(system, config, opt, actionType) {
  const Processor = config.script;
  const processUid = opt.uid;
  const found = system.findProcess(actionType);

  if (found.length) {
    return found[0];
  }

  const newInstance = new Processor(opt);

  system.upProcess(newInstance, actionType, processUid);

  return newInstance; //.init(actionPayload);
}

function refreshingMode(system, config, opt, actionType) {
  const Processor = config.script;
  const found = system.findProcess(actionType);
  const processUid = opt.uid;

  if (found) {
    system.downProcess(actionType);
  }

  const newInstance = new Processor(opt);

  system.upProcess(newInstance, actionType, processUid);

  return newInstance; //.init(actionPayload);
}

///on init instance  => add to system configure {trigger => []}
///on drop instance => remove from system's map
// for s of config.config.watchScope,  
// s.
//
/**
 * store.subscribe(() => {
 *    /// call for check => 
 *    const currentTask = system.taskQueue.currentTask
 *    const afterEffectsMap = system.afterEffectsMap
 *    if(match(currentTask, afterEffectsMap)) {
 *      store.dispatch({
 *          type: biteName/__AFTER_EFFECTS__, 
 *          payload: {
 *            taskTrigger: 
 *            taskStatus:
 *            taskPayload:
 *            taskSourceBite:
 *            taskSourceSlice:
 *          }
 *      })
 *    }
 * })
 * 
 * 
 * 
 * 
 */