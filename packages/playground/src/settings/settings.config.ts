import { Slice } from '../../../v1-core/lib';
import {
  effectiveBite,
  EffectiveState,
  EffectiveTrigger,
  effectiveInitialState,
} from 'src/_redux/effectiveBite';
import { IState, ITriggers } from 'src/_redux/types';
import { ISettings } from './interfaces/Settings.interface';
import { loadSetting } from 'src/_api/settings';

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
  settingsInitialState
);
