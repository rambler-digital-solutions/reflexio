import { getActionType, getTriggerAndStatus } from '../../utils';


export function BeforeUpdate(
  instance,
  state,
  actionType,
  actionPayload,
  reducers,
  sliceName
) {
  const { trigger, status } = getTriggerAndStatus(actionType);

  //const reducer = pickReducer(reducers, trigger, status);
  let propagate = true;
  let keepUpdate = false;
  const stopPropagate = (args?: { keepUpdate: boolean }) => {
    keepUpdate = (args && args.keepUpdate) || false;
    propagate = false;
  };


  if (instance.update) {
    const { trigger, status } = getTriggerAndStatus(actionType);
    const updateArgs = {
      payload: actionPayload,
      trigger,
      status,
      hangOn: stopPropagate,
    };


    if(instance.updatable) {
      const foundKey = Object.keys(instance.updatable).find( u => u === getActionType(updateArgs.trigger, updateArgs.status) )
      if(foundKey) {
        instance[instance.updatable[foundKey]](updateArgs)
      }
      else {
        instance.update(updateArgs);
      }
    }
    else {
      instance.update(updateArgs);
    }
  }

  return propagate;
}
