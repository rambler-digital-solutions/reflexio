import {
  Script,
  type InitArgsType,
  type ScriptOptsType,
  type WatchArgsType,
} from '@reflexio/core-v1';
import type {IState, ITriggers} from '_redux/types';
import type {INotificationTriggers} from '../notification.config';

const NOTIFICATION_TIMEOUT = 2000;

export class NotificationScript extends Script<
  ITriggers,
  IState,
  'showNotification',
  'init',
  number
> {
  constructor(
    public opts: ScriptOptsType<ITriggers, IState, 'showNotification', number>,
  ) {
    super();
  }

  private timeout: number;

  public init(
    _args: InitArgsType<INotificationTriggers, 'showNotification', 'init'>,
  ) {
    this.timeout = window.setTimeout(() => {
      this.opts.trigger('showNotification', 'close', null);
    }, NOTIFICATION_TIMEOUT);
  }

  public watch(args: WatchArgsType<ITriggers, 'showNotification'>) {
    if (args.status === 'close' && this.timeout) {
      window.clearTimeout(this.timeout);
    }
  }
}
