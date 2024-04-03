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
    }

    if (instance?.watchAfter) {
      system.afterHandlers.push(() => instance.watchAfter);
    }
  };

  const handleUpdate = (store, action, skipUpdate) => {
    if (skipUpdate) {
      return false;
    }

    const updateConfigs = matchUpdateTrigger(configs, action.type);

    return updateConfigs.reduce((forceStopPropagate, config) => {
      const instances = getInstance(config.config, config.trigger, system);

      return (
        forceStopPropagate ||
        instances.some(
          (instance) =>
            !BeforeUpdate(
              instance,
              store.getState(),
              action,
              reducers,
              sliceName,
            ),
        )
      );
    }, false);
  };

  return (store) => (next) => (action) => {
    const {
      sourceSlice,
      type: actionType,
      payload: actionPayload,
      opts,
    } = action;
    const isBiteHit = matchBiteName(configs, actionType);
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

    const forceStopPropagate = handleUpdate(store, action, opts?.noUpdate);
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
