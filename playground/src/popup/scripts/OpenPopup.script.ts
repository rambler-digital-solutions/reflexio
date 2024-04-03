/* eslint-disable @typescript-eslint/no-empty-function */
import {IState, ITriggers} from 'src/_redux/types';
import {
  InitArgsType,
  ScriptOptsType,
  WatchArgsType,
} from '../../../../core-v1/lib/types';
import {Script} from '../../../../core-v1/lib/Script';
import {IPopupTriggers} from '../popup.config';

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

  public init(args: InitArgsType<IPopupTriggers, 'openPopup', 'init'>) {
    console.log(this.opts.getCurrentState().popup);
    // here we can implement popup queue
  }

  public watch(args: WatchArgsType<IPopupTriggers, 'openPopup'>) {}
}
