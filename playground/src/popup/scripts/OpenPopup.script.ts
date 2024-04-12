import {
  Script,
  type InitArgsType,
  type ScriptOptsType,
  type WatchArgsType,
} from '@reflexio/core-v1';
import type {IState, ITriggers} from '_redux/types';
import type {IPopupTriggers} from '../popup.config';

export class OpenPopupScript extends Script<
  ITriggers,
  IState,
  'openPopup',
  'init',
  null
> {
  constructor(
    public opts: ScriptOptsType<ITriggers, IState, 'openPopup', null>,
  ) {
    super();
  }

  public init(_args: InitArgsType<IPopupTriggers, 'openPopup', 'init'>) {
    console.log(this.opts.getCurrentState().popup);
    // here we can implement popup queue
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public watch(_args: WatchArgsType<IPopupTriggers, 'openPopup'>) {}
}
