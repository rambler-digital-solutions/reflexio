import { getActionType } from '../../utils';

export function Bind(system, config) {
  const actionType = getActionType(config.trigger, config.config.initOn);
     
  return (eventName, handlerName, targetName) => {
    const instances = system.findProcess(actionType);
    const fullEventName = getActionType(targetName || config.trigger, eventName);
    instances.forEach( ist => {
        if(ist.updatable) {
            ist.updatable[fullEventName] = handlerName
        }
        else {
            ist.updatable = {
                [fullEventName]: handlerName
            }
        }
    })
  };
}
