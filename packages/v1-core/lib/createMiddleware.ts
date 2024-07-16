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
import { getTriggerAndStatus } from './utils';

export const makeProcMiddleware = (
  configs,
  reducers,
  sliceName,
  injected,
  sliceConfig,
): Middleware => {
  const system = useSystem();

 

  return (store) => (next) => (action) => {
    let ignore = false;
    let forceStopPropagate = false;
    const sourceSlice = action.sourceSlice;
    const actionType = action.type;
    const { trigger, status } = getTriggerAndStatus(actionType);
    const isBiteHit = matchBiteName(configs, actionType)
    if(sliceConfig?.ignoreExternal) {
      if(sliceConfig.ignoreExternal  === 'ignoreAll') {
        ignore = true;
      }
      else if(sourceSlice 
          && sliceConfig.ignoreExternal.length 
          && sliceConfig.ignoreExternal.indexOf(sourceSlice) !== -1) {
        ignore = true;
      }
    };
    const actionPayload = action.payload || null;
    const nexio = (args) => {
      system.taksQueue.setCurrentTask(action)
      return next(args)
    }
    if(isBiteHit && ignore) {
      return next(action)
    }
   
    const skipInit = action.opts && action.opts.noInit;
    const skipUpdate = action.opts && action.opts.noUpdate;
    const initConfig = matchInitTrigger(configs, actionType); /// Возвращает  1 конфиг
    const updateConfigs = matchUpdateTrigger(configs, actionType); //Возвращает массив конфигов
    if (initConfig && !skipInit) {
      const opts = prepareOpts(initConfig, store, system, sliceName, injected);
      const instance = createProcessorInstance(
        system,
        initConfig.config,
        opts,
        actionType
      );
      if (instance) {
        onInit(instance, actionPayload);
      }
      if(instance.afterEffects) {
        // get list of events form config
        // check if contains then call
        system.afterHandlers.push(trigger)
      }
    }
    if (updateConfigs.length && !skipUpdate) {
      updateConfigs.forEach((c) => {
        const instances = getInstance(c.config, c.trigger, system);
        instances.forEach((i) => {
          const proppagate = BeforeUpdate(
            i,
            store.getState(),
            action,
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

    return forceStopPropagate || (isBiteHit  && processorOpts && (!processorOpts.propagate)) 
      ? 0
      : nexio(action);
  };
};
