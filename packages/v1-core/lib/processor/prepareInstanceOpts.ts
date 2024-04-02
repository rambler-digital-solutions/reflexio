import { Drop } from './opts/drop';
import { SetStatus } from './opts/setStatus';
import { Trigger } from './opts/trigger';
import { v4 } from 'uuid';
// import { Save } from './opts/save';
// import { TriggerOnly } from './opts/triggerOnly';
import { Wait } from './opts/wait';
import { Hook } from './opts/hook';
import { Bind } from './opts/bind';

export function prepareOpts(config, store, system, sliceName, injected) {
  const processUid = v4();
  const trigger = Trigger(store, config, system, processUid, sliceName);

  const setStatus = SetStatus(store, config, system, processUid, sliceName);
  //const save = Save(store, config, system, processUid);
  //const triggerOnly = TriggerOnly(store, config, system, processUid);
  const drop = Drop(system, config);
  //const state = store.getState();
  const getCurrentState = store.getState;
  const wait = Wait(store, config, system, processUid);
  const hook = Hook(store, config, system, processUid);
  const bind = Bind(system, config);

  return {
    subscribe: store.subscribe,
    getCurrentTask: system.taksQueue.getCurrentTask,
    dispatch: store.dispatch,
    uid: processUid,
    sliceName: sliceName,
    biteName: config.trigger,
    wait,
    hook,
    trigger,
    setStatus,
    drop,
    getCurrentState,
    injected,
    addOpts: config.config.addOpts,
    bind,
    catchStatus: (status, args) => {
      if (status === args.status && config.trigger === args.trigger) {
        return {
          isCatched: true,
          payload: args.payload,
        };
      }

      return {
        isCatched: false,
      };
    },
    catchEvent: (triggerName, status, args) => {
      if (status === args.status && triggerName === args.trigger) {
        return {
          isCatched: true,
          payload: args.payload,
        };
      }

      return {
        isCatched: false,
      };
    },
  };
}
