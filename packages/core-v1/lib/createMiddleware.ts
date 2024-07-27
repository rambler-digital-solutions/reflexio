import type {Middleware} from 'redux';
import {createProcessorInstance} from './processor/createProcessorInstance';
import {getInstance} from './processor/getProcessorInstance';
import {onInit} from './processor/lifecycle/Init';
import {BeforeUpdate} from './processor/lifecycle/Update';
import {matchBiteName} from './processor/matchBiteName';
import {matchInitTrigger} from './processor/matchInitTrigger';
import {matchUpdateTrigger} from './processor/matchUpdateTrigger';
import {prepareOpts} from './processor/prepareInstanceOpts';
import {useSystem} from './System';
import { AfterEffects } from './processor/lifecycle/AfterEffects';
import { getTriggerAndStatus } from './utils';

export const makeProcMiddleware = (
  configs,
  reducers,
  sliceName,
  injected,
  sliceConfig,
): Middleware => {
  const system = useSystem();

  const handleInit = (store, actionType, actionPayload, skipInit) => {
    const initConfig = matchInitTrigger(configs, actionType);

    if (!initConfig || skipInit) {
      return;
    }

    const opts = prepareOpts(initConfig, store, system, sliceName, injected);
    const instance = createProcessorInstance(
      system,
      initConfig.config,
      opts,
      actionType,
    );

    if (instance) {
      onInit(instance, actionPayload);
      if(instance.afterEffects) {
        system.afterEffects.addAfterEffect(initConfig.config.watchScope, initConfig.trigger)
      }
    }

  };

  const handleUpdate = (store, action, skipUpdate) => {
    if (skipUpdate) {
      return false;
    }

    const updateConfigs = matchUpdateTrigger(configs, action.type);
    let forceStopPropagate = false;

    updateConfigs.forEach((config) => {
      const instances = getInstance(config.config, config.trigger, system);

      instances.forEach((instance) => {
        const propagate = BeforeUpdate(
          instance,
          store.getState(),
          action,
          reducers,
          sliceName,
        );

        if (!propagate) {
          forceStopPropagate = true;
        }
      });
    });

    return forceStopPropagate;
  };

  return (store) => (next) => (action) => {
    const {
      sourceSlice,
      type: actionType,
      payload: actionPayload,
      opts,
    } = action;
    const isBiteHit = matchBiteName(configs, actionType);
    const { trigger, status } = getTriggerAndStatus(actionType);
    const ignore =
      sliceConfig?.ignoreExternal &&
      (sliceConfig.ignoreExternal === 'ignoreAll' ||
        (sourceSlice &&
          sliceConfig.ignoreExternal.length &&
          sliceConfig.ignoreExternal.includes(sourceSlice)));

    if (isBiteHit && ignore) {
      return next(action);
    }

    handleInit(store, actionType, actionPayload, opts?.noInit);

    let  forceStopPropagate = handleUpdate(store, action, opts?.noUpdate);

    if(status === '__AFTEREFFECTS__' && isBiteHit) {
      forceStopPropagate  = true;
      const afInstances = getInstance(configs[trigger], trigger, system);
      if(afInstances) {
        afInstances.forEach( afi => 
          AfterEffects(afi, action, sliceName)
        )
      }
    }
    const processorOpts = system.getProcessorInfo(action.type);

    system.resolveWait(action.type, actionPayload);

    const nexio = (args) => {
      system.taksQueue.setCurrentTask(action);

      return next(args);
    };

    return forceStopPropagate ||
      (isBiteHit && processorOpts && !processorOpts.propagate)
      ? 0
      : nexio(action);
  };
};
