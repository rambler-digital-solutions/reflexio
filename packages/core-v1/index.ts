/* eslint-disable import/no-unused-modules */
/*!
 * Reflexio
 * Copyright (c) 2024 Konstantin Astapov.
 * Licensed under the MIT License (MIT), see
 * https://github.com/rambler-digital-solutions/reflexio
 */
export {Slice} from './lib/Slice';
export {Bite} from './lib/Bite';
export {Script} from './lib/Script';
export {EffectiveScript} from './lib/interfaces/EffectiveScript';
export {useSystem, type System} from './lib/System';
export {getTriggerAndStatus, getActionType} from './lib/utils';
export type {
  UpdateOnType,
  DispatcherType,
  BiteStatusWrap,
  ScriptOptsType,
  InitArgsType,
  WatchArgsType,
} from './lib/types';
