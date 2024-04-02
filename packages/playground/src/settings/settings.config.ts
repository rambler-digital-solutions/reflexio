import {
  effectiveBite,
  EffectiveState,
  EffectiveTrigger,
  effectiveInitialState,
} from 'src/_redux/effectiveBite';
import {IState, ITriggers} from 'src/_redux/types';
import {loadSetting} from 'src/_api/settings';
import {Slice} from '../../../core-v1/lib';
import {ISettings} from './interfaces/Settings.interface';

export interface ISettingsState {
  loadSettings: EffectiveState<null, ISettings, Error>;
}

export interface ISettingsTriggers {
  loadSettings: EffectiveTrigger<null, ISettings, Error>;
}

export const settingsInitialState: ISettingsState = {
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
