import { Middleware } from 'redux';
import { createProcessorInstance } from './processor/createProcessorInstance';
import { getInstance } from './processor/getProcessorInstance';
import { onInit } from './processor/lifecycle/Init';
import { BeforeUpdate } from './processor/lifecycle/Update';
import { matchBiteName } from './processor/matchBiteName';
import { matchInitTrigger } from './processor/matchInitTrigger';
import { matchUpdateTrigger } from './processor/matchUpdateTrigger';
import { prepareOpts } from './processor/prepareInstanceOpts';
import { useSystem } from './System';

export const makeProcMiddleware = (
  configs,
  reducers,
  sliceName
): Middleware => {
  const system = useSystem();

 

  return (store) => (next) => (action) => {
    let forceStopPropagate = false;
    const actionType = action.type;
    const nexio = (args) => {
      system.taksQueue.setCurrentTask(actionType)
      next(args)
    }
    const actionPayload = action.payload || null;
    const skipInit = action.opts && action.opts.noInit;
    const skipUpdate = action.opts && action.opts.noUpdate;
    const initConfig = matchInitTrigger(configs, actionType); /// Возвращает  1 конфиг
    const isBiteHit = matchBiteName(configs, actionType)
    const updateConfigs = matchUpdateTrigger(configs, actionType); //Возвращает массив конфигов
    if (initConfig && !skipInit) {
      const opts = prepareOpts(initConfig, store, system);
      const instance = createProcessorInstance(
        system,
        initConfig.config,
        opts,
        actionType
      );
      if (instance) {
        onInit(instance, actionPayload);
      }
      if(instance.updateAfter) {
        // get list of events form config
        // check if contains then call
        system.afterHandlers.push(() => instance.updateAfter())
      }
    }
    if (updateConfigs.length && !skipUpdate) {
      updateConfigs.forEach((c) => {
        const instances = getInstance(c.config, c.trigger, system);
        instances.forEach((i) => {
          const proppagate = BeforeUpdate(
            i,
            store.getState(),
            actionType,
            actionPayload,
            reducers,
            sliceName
          );
          if (!proppagate) {
            forceStopPropagate = true;
          }
        });
      });
    }
    const processorOpts = system.getProcessorInfo(action.type);

    system.resolveWait(action.type, action.payload);

    return forceStopPropagate || (isBiteHit && processorOpts && (!processorOpts.propagate)) 
      ? 0
      : nexio(action);
  };
};
