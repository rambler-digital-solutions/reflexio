import {Slice} from '@reflexio/core-v1';
import {
  effectiveBite,
  EffectiveState,
  EffectiveTrigger,
  effectiveInitialState,
} from '_redux/effectiveBite';
import type {IState, ITriggers} from '_redux/types';
import {loadSetting} from '_api/settings';
import type {ISettings} from './interfaces/Settings.interface';

export interface ISettingsState {
  loadSettings: EffectiveState<null, ISettings, Error>;
}

export interface ISettingsTriggers {
  loadSettings: EffectiveTrigger<null, ISettings, Error>;
}

const settingsInitialState: ISettingsState = {
  loadSettings: effectiveInitialState(),
};

const loadSettingsBite = effectiveBite<
  ISettingsTriggers,
  ISettingsState,
  'loadSettings',
  ITriggers
>(loadSetting, 'loadSettings');

export const settingsSlice = Slice<
  ISettingsTriggers,
  ISettingsState,
  ITriggers,
  IState
>(
  'settings',
  {
    loadSettings: loadSettingsBite,
  },
  settingsInitialState,
);
